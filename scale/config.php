<?php
/**
 * Curious Apes landing page — configuration
 * Edit the values below, then upload. Nothing else needs changing.
 */

// ── Database (create the DB + user in cPanel, then paste here) ──────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'curiousapes_leads');
define('DB_USER', 'curiousapes_lp');
define('DB_PASS', 'CHANGE_ME');

// ── Where the notification email goes ───────────────────────────────────────
define('MAIL_TO',      'info@curiousapes.in');
define('MAIL_CC',      '');                            // optional second address
define('MAIL_FROM',    'leads@curiousapes.in');        // must be on your domain, or mail lands in spam
define('MAIL_FROM_NAME','Curious Apes Landing Page');
define('MAIL_SUBJECT', 'New lead: {brand} — {sales}/month');

// ── SMTP (optional but recommended) ─────────────────────────────────────────
// PHP's built-in mail() often lands in spam on shared hosting. If you have
// PHPMailer available (composer require phpmailer/phpmailer), set this to true
// and fill in the credentials — submit.php will use SMTP instead.
define('USE_SMTP',   false);
define('SMTP_HOST',  'smtp.hostinger.com');   // your mail host
define('SMTP_PORT',  587);
define('SMTP_USER',  'leads@curiousapes.in');
define('SMTP_PASS',  'CHANGE_ME');
define('SMTP_SECURE','tls');                   // 'tls' for 587, 'ssl' for 465

// ── Admin page ──────────────────────────────────────────────────────────────
// Open leads.php?key=YOUR_KEY to view and export leads. Use a long random string.
define('ADMIN_KEY', 'CHANGE_ME_TO_SOMETHING_LONG_AND_RANDOM');

// ── Anti-spam ───────────────────────────────────────────────────────────────
define('MAX_PER_IP_PER_HOUR', 5);
define('MIN_FILL_SECONDS', 3);   // forms submitted faster than this are bots
