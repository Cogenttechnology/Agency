# Curious Apes — Lead Gen Landing Page

Static page + a small PHP handler. No build step, no framework, no Composer required.
Every form submission is saved to MySQL **and** emailed to info@curiousapes.in.

## Files

```
index.html                 the page, dark theme (HTML + CSS + JS in one file)
index-light.html           the same page, light theme — pick one and rename it index.html
submit.php                 receives the form, saves to DB, sends the email
config.php                 your DB credentials and settings — edit this
schema.sql                 run once to create the leads table
leads.php                  private page to view / export leads
.htaccess                  blocks config.php, enables gzip + caching
assets/logo.png
assets/results/*.png       six Shopify dashboard screenshots
assets/services/*.webp     twelve service screenshots
```

Client logos load from `https://www.curiousapes.in/assets/...` — nothing to copy.

## Two themes

`index.html` is the dark version, `index-light.html` the light one. They are
identical apart from colours, and both post to the same `submit.php`.

Pick one, rename it `index.html`, and delete the other. Or keep both and split
your ad traffic between `/scale/` and `/scale/index-light.html` to see which
converts better.

## Setup — about 15 minutes

### 1. Upload

Put the whole folder in `public_html/scale/`. Live at `https://www.curiousapes.in/scale/`.
Keep the structure intact; all paths are relative, so it works at any URL depth.

Requires **PHP 7.4+** with PDO MySQL — standard on every cPanel host.

### 2. Create the database

cPanel > MySQL Databases: create a database and a user, give the user all
privileges on that database. Note the values — cPanel usually prefixes them,
e.g. `curiousapes_leads` and `curiousapes_lp`.

Then cPanel > phpMyAdmin > select the database > Import > upload `schema.sql`.
(Or paste its contents into the SQL tab and run.)

### 3. Fill in `config.php`

```php
define('DB_NAME', 'curiousapes_leads');
define('DB_USER', 'curiousapes_lp');
define('DB_PASS', 'your-password');

define('MAIL_TO',   'info@curiousapes.in');   // already set
define('MAIL_FROM', 'leads@curiousapes.in');  // create this mailbox in cPanel

define('ADMIN_KEY', 'a-long-random-string');  // used to open leads.php
```

`MAIL_FROM` must be an address on your own domain, otherwise the notification is
treated as spoofed and lands in spam. Create `leads@curiousapes.in` in
cPanel > Email Accounts first.

### 4. Test

Open the page and submit the form with your own number. You should get:

- an email at info@curiousapes.in within a minute
- a new row at `https://www.curiousapes.in/scale/leads.php?key=YOUR_ADMIN_KEY`

If the email doesn't arrive, see Email deliverability below.

## Viewing leads

`https://www.curiousapes.in/scale/leads.php?key=YOUR_ADMIN_KEY`

Newest first, WhatsApp links on the phone numbers, and a status dropdown
(new / contacted / qualified / won / lost) you can update in place.
Export CSV downloads the lot for your CRM or a sheet.

Anyone with that link can see your leads, so treat the key like a password and
change it if it leaks.

## Email deliverability

PHP's built-in `mail()` works on most shared hosting but often lands in spam.
If that happens, switch to SMTP:

```bash
cd public_html/scale
composer require phpmailer/phpmailer
```

Then in `config.php` set `USE_SMTP` to `true` and fill in `SMTP_HOST`, `SMTP_USER`,
`SMTP_PASS`. `submit.php` picks it up automatically — no code changes.

No shell access? Upload PHPMailer manually into a `vendor/` folder. Note that if
you instead point the form at a service like Formspree, you lose the database —
both the DB write and the email live in `submit.php`.

Either way, the lead is still saved to the database even if the email fails, and
vice versa. One failing never loses the lead.

## What gets captured

| Field | Source |
|---|---|
| phone, brand, website, monthly sales, monthly ad spend | the form |
| utm_source / medium / campaign / content / term, fbclid, gclid | the ad URL query string |
| referrer, IP, user agent, timestamp | automatic |

Tag your ad URLs (`?utm_source=meta&utm_campaign=jan-lead-gen`) and every lead
records which campaign produced it — visible in the CSV export.

## Tracking

The page loads GTM container `GTM-KVGDNFH5` and pushes a `lead_submit` event on a
successful submission. In GTM, create a Custom Event trigger on `lead_submit` and
fire your Meta Lead event and GA4 conversion from it. A placeholder comment for
the Meta Pixel sits in `<head>`.

The event fires after the server confirms the save, so failed submissions won't
inflate your conversion numbers.

## Spam protection (already built in)

- Hidden honeypot field — bots fill it, humans can't see it
- Submissions faster than 3 seconds are dropped silently
- Max 5 submissions per IP per hour
- Phone, URL and length validation server-side, not just in the browser
- Prepared statements throughout

## Things you may want to change

- **Stats** — the page says ₹50Cr+ / ₹200Cr+ / 4×. curiousapes.in still says ₹20Cr+ / ₹80Cr+. Worth matching.
- **Canonical URL** — in `<head>` of index.html, currently `/scale/`.
- **noindex** — set on purpose so this page doesn't compete with your main site in search. Remove if you want it indexed.
- **Colours** — the `:root` block at the top of `<style>`. `--cyan`, `--blue`, `--violet` and `--grad` drive every accent.
- **WhatsApp handoff** — after a successful submit the page opens WhatsApp with the lead's details pre-filled. Set `WHATSAPP=''` in the script to turn that off.
- **Client logos** — CSS forces them white (`.logo img` filter). Any logo relying on colour will flatten; swap in a white PNG for those.
- **Adding a result** — duplicate an `<article class="slide">` block and point it at a new image in `assets/results/`. The slider counts slides automatically.
