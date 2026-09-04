<?php
/**
 * Curious Apes landing page — form handler
 * Receives the lead, stores it in MySQL, emails info@curiousapes.in.
 * Responds with JSON: {"ok":true} or {"ok":false,"error":"..."}
 */

declare(strict_types=1);
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail(string $msg, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Method not allowed', 405);
}

// ── Read input (JSON from fetch, or normal form POST as a fallback) ─────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) { $data = $_POST; }

$get = static function (string $k) use ($data): string {
    return trim((string)($data[$k] ?? ''));
};

// ── Anti-spam ──────────────────────────────────────────────────────────────
if ($get('company') !== '') {            // honeypot field, humans never see it
    echo json_encode(['ok' => true]);    // pretend success, drop silently
    exit;
}
$elapsed = (int)($data['elapsed'] ?? 0);
if ($elapsed > 0 && $elapsed < MIN_FILL_SECONDS) {
    echo json_encode(['ok' => true]);
    exit;
}

// ── Validate ───────────────────────────────────────────────────────────────
$phone = preg_replace('/[^\d+]/', '', $get('phone'));
$brand = $get('brand');
$site  = $get('site');
$sales = $get('sales');
$spend = $get('spend');

$digits = strlen(preg_replace('/\D/', '', $phone));
if ($digits < 10 || $digits > 13) fail('Please enter a valid phone number.');
if ($brand === '' || mb_strlen($brand) > 120) fail('Please enter your brand name.');
if ($site === '') fail('Please enter your website link.');
if (!preg_match('~^https?://~i', $site)) $site = 'https://' . $site;
if (!filter_var($site, FILTER_VALIDATE_URL)) fail('Please enter a valid website URL.');
if ($sales === '' || $spend === '') fail('Please select your monthly sales and ad spend.');

$ip       = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip       = trim(explode(',', $ip)[0]);
$ua       = mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);
$referrer = mb_substr($get('referrer') ?: (string)($_SERVER['HTTP_REFERER'] ?? ''), 0, 255);
$source   = mb_substr($get('source') ?: 'lead-gen-lp', 0, 60);

// UTM parameters, if the ad URL carried them
$utm = [];
foreach (['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid'] as $k) {
    $v = $get($k);
    if ($v !== '') $utm[$k] = mb_substr($v, 0, 180);
}
$utmJson = $utm ? json_encode($utm, JSON_UNESCAPED_SLASHES) : null;

// ── Store ──────────────────────────────────────────────────────────────────
$stored = false;
$pdo = null;
try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]
    );

    // Rate limit per IP
    if ($ip !== '') {
        $st = $pdo->prepare('SELECT COUNT(*) FROM leads WHERE ip = ? AND created_at > (NOW() - INTERVAL 1 HOUR)');
        $st->execute([$ip]);
        if ((int)$st->fetchColumn() >= MAX_PER_IP_PER_HOUR) {
            fail('Too many submissions from this connection. Please call us instead: +91 99828 98842.', 429);
        }
    }

    $st = $pdo->prepare(
        'INSERT INTO leads (phone, brand, website, monthly_sales, monthly_ad_spend, source, referrer, utm, ip, user_agent)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $st->execute([$phone, $brand, $site, $sales, $spend, $source, $referrer, $utmJson, $ip, $ua]);
    $stored = true;
} catch (Throwable $e) {
    // Never lose a lead because the DB is down — the email still goes out.
    error_log('[lead-db] ' . $e->getMessage());
}

// ── Email ──────────────────────────────────────────────────────────────────
$subject = str_replace(['{brand}', '{sales}'], [$brand, $sales], MAIL_SUBJECT);
$when    = date('d M Y, g:i A');

$lines = [
    "New lead from the landing page",
    "",
    "Brand            : $brand",
    "Phone            : $phone",
    "Website          : $site",
    "Monthly sales    : $sales",
    "Monthly ad spend : $spend",
    "",
    "Received         : $when",
    "Source           : $source",
    "Referrer         : " . ($referrer ?: '—'),
    "UTM              : " . ($utmJson ?: '—'),
    "IP               : " . ($ip ?: '—'),
    "",
    "WhatsApp them: https://wa.me/" . preg_replace('/\D/', '', $phone),
];
$text = implode("\n", $lines);

$e = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
$html = '<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#111">'
      . '<h2 style="margin:0 0 14px">New lead — ' . $e($brand) . '</h2>'
      . '<table cellpadding="6" style="border-collapse:collapse;font-size:15px">'
      . '<tr><td style="color:#666">Phone</td><td><b>' . $e($phone) . '</b></td></tr>'
      . '<tr><td style="color:#666">Website</td><td><a href="' . $e($site) . '">' . $e($site) . '</a></td></tr>'
      . '<tr><td style="color:#666">Monthly sales</td><td><b>' . $e($sales) . '</b></td></tr>'
      . '<tr><td style="color:#666">Monthly ad spend</td><td><b>' . $e($spend) . '</b></td></tr>'
      . '<tr><td style="color:#666">Received</td><td>' . $e($when) . '</td></tr>'
      . '<tr><td style="color:#666">Source</td><td>' . $e($source) . '</td></tr>'
      . '<tr><td style="color:#666">Referrer</td><td>' . $e($referrer ?: '—') . '</td></tr>'
      . '<tr><td style="color:#666">UTM</td><td>' . $e($utmJson ?: '—') . '</td></tr>'
      . '</table>'
      . '<p style="margin-top:18px"><a href="https://wa.me/' . preg_replace('/\D/', '', $phone) . '"'
      . ' style="background:#12d6d6;color:#000;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:600">'
      . 'WhatsApp this lead</a></p>'
      . '<p style="color:#888;font-size:13px">' . ($stored ? 'Saved to database.' : 'NOT saved to database — check config.php and the error log.') . '</p>'
      . '</div>';

$sent = false;
if (USE_SMTP && file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = 'UTF-8';
        $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
        $mail->addAddress(MAIL_TO);
        if (MAIL_CC !== '') $mail->addCC(MAIL_CC);
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body    = $html;
        $mail->AltBody = $text;
        $sent = $mail->send();
    } catch (Throwable $ex) {
        error_log('[lead-smtp] ' . $ex->getMessage());
    }
}

if (!$sent) {
    $boundary = 'bx' . bin2hex(random_bytes(8));
    $headers  = 'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . ">\r\n"
              . 'Reply-To: ' . MAIL_FROM . "\r\n"
              . (MAIL_CC !== '' ? 'Cc: ' . MAIL_CC . "\r\n" : '')
              . "MIME-Version: 1.0\r\n"
              . 'Content-Type: multipart/alternative; boundary="' . $boundary . '"' . "\r\n";
    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$text\r\n"
          . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$html\r\n"
          . "--$boundary--";
    $sent = @mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);
    if (!$sent) error_log('[lead-mail] mail() failed for ' . $brand);
}

// ── Respond ────────────────────────────────────────────────────────────────
if (!$stored && !$sent) {
    fail('We could not save your details. Please WhatsApp us on +91 99828 98842.', 500);
}
echo json_encode(['ok' => true, 'stored' => $stored, 'emailed' => $sent]);
