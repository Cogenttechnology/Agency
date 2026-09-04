<?php
/**
 * Curious Apes — lead viewer
 * Open: /scale/leads.php?key=YOUR_ADMIN_KEY
 * CSV : /scale/leads.php?key=YOUR_ADMIN_KEY&export=csv
 */
declare(strict_types=1);
require __DIR__ . '/config.php';

if (!hash_equals(ADMIN_KEY, (string)($_GET['key'] ?? ''))) {
    http_response_code(403);
    exit('Forbidden');
}

$pdo = new PDO(
    'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
    DB_USER, DB_PASS,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]
);

// Update status inline
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && isset($_POST['id'], $_POST['status'])) {
    $st = $pdo->prepare('UPDATE leads SET status = ? WHERE id = ?');
    $st->execute([$_POST['status'], (int)$_POST['id']]);
    header('Location: leads.php?key=' . urlencode(ADMIN_KEY));
    exit;
}

$rows = $pdo->query(
    'SELECT id, created_at, brand, phone, website, monthly_sales, monthly_ad_spend, status, utm
     FROM leads ORDER BY created_at DESC LIMIT 1000'
)->fetchAll(PDO::FETCH_ASSOC);

if (($_GET['export'] ?? '') === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="curious-apes-leads-' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['ID','Received','Brand','Phone','Website','Monthly sales','Monthly ad spend','Status','UTM']);
    foreach ($rows as $r) fputcsv($out, $r);
    exit;
}

$total = (int)$pdo->query('SELECT COUNT(*) FROM leads')->fetchColumn();
$today = (int)$pdo->query('SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURDATE()')->fetchColumn();
$e = static fn($s): string => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
?><!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Leads — Curious Apes</title>
<style>
  :root{--bg:#000;--bg2:#0a0c0d;--ink:#fff;--ink2:#a9b1b4;--line:#1b1f21;--cyan:#12d6d6}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--ink);font:15px/1.5 Inter,system-ui,sans-serif;padding:28px}
  .bar{display:flex;align-items:baseline;gap:20px;flex-wrap:wrap;margin-bottom:22px}
  h1{font-size:22px;font-weight:600}
  .n{color:var(--ink2);font-size:14px}
  .n b{color:var(--cyan)}
  a.btn{background:var(--cyan);color:#000;text-decoration:none;font-weight:600;font-size:13px;
    padding:8px 14px;border-radius:6px;margin-left:auto}
  .wrap{overflow-x:auto;border:1px solid var(--line);border-radius:10px;background:var(--bg2)}
  table{border-collapse:collapse;width:100%;min-width:900px;font-size:14px}
  th{text-align:left;font-weight:500;color:var(--ink2);font-size:12px;letter-spacing:.06em;
    text-transform:uppercase;padding:12px 14px;border-bottom:1px solid var(--line);white-space:nowrap}
  td{padding:12px 14px;border-bottom:1px solid var(--line);vertical-align:top}
  tr:last-child td{border-bottom:none}
  td a{color:var(--cyan)}
  .s{font-size:12px;padding:3px 9px;border-radius:20px;border:1px solid var(--line)}
  .s.new{color:var(--cyan);border-color:rgba(18,214,214,.4)}
  select{background:var(--bg);color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:5px 8px;font:inherit;font-size:13px}
  .empty{padding:44px;text-align:center;color:var(--ink2)}
</style></head><body>

<div class="bar">
  <h1>Leads</h1>
  <span class="n"><b><?= $total ?></b> total · <b><?= $today ?></b> today</span>
  <a class="btn" href="?key=<?= urlencode(ADMIN_KEY) ?>&amp;export=csv">Export CSV</a>
</div>

<div class="wrap">
<?php if (!$rows): ?>
  <p class="empty">No leads yet.</p>
<?php else: ?>
<table>
  <thead><tr>
    <th>Received</th><th>Brand</th><th>Phone</th><th>Website</th>
    <th>Sales/mo</th><th>Ad spend/mo</th><th>Status</th>
  </tr></thead>
  <tbody>
  <?php foreach ($rows as $r): ?>
    <tr>
      <td style="white-space:nowrap"><?= $e(date('d M, g:i A', strtotime($r['created_at']))) ?></td>
      <td><?= $e($r['brand']) ?></td>
      <td><a href="https://wa.me/<?= $e(preg_replace('/\D/', '', $r['phone'])) ?>"><?= $e($r['phone']) ?></a></td>
      <td><a href="<?= $e($r['website']) ?>" target="_blank" rel="noopener"><?= $e(preg_replace('~^https?://(www\.)?~', '', $r['website'])) ?></a></td>
      <td><?= $e($r['monthly_sales']) ?></td>
      <td><?= $e($r['monthly_ad_spend']) ?></td>
      <td>
        <form method="post" style="display:inline">
          <input type="hidden" name="id" value="<?= (int)$r['id'] ?>">
          <select name="status" onchange="this.form.submit()">
            <?php foreach (['new','contacted','qualified','won','lost'] as $s): ?>
              <option<?= $r['status'] === $s ? ' selected' : '' ?>><?= $s ?></option>
            <?php endforeach; ?>
          </select>
        </form>
      </td>
    </tr>
  <?php endforeach; ?>
  </tbody>
</table>
<?php endif; ?>
</div>
</body></html>
