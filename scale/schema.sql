-- Curious Apes landing page — leads table
-- Run this once in phpMyAdmin (cPanel) or the MySQL CLI, against the database
-- you named in config.php.

CREATE TABLE IF NOT EXISTS `leads` (
  `id`               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `phone`            VARCHAR(20)  NOT NULL,
  `brand`            VARCHAR(120) NOT NULL,
  `website`          VARCHAR(255) NOT NULL,
  `monthly_sales`    VARCHAR(40)  NOT NULL,
  `monthly_ad_spend` VARCHAR(40)  NOT NULL,
  `source`           VARCHAR(60)      NULL,
  `referrer`         VARCHAR(255)     NULL,
  `utm`              JSON             NULL,
  `ip`               VARCHAR(45)      NULL,
  `user_agent`       VARCHAR(255)     NULL,
  `status`           ENUM('new','contacted','qualified','won','lost') NOT NULL DEFAULT 'new',
  `notes`            TEXT             NULL,
  `created_at`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created` (`created_at`),
  KEY `idx_phone`   (`phone`),
  KEY `idx_ip_time` (`ip`, `created_at`),
  KEY `idx_status`  (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- On MySQL 5.6 or older, JSON isn't supported. Use this instead:
-- ALTER TABLE `leads` MODIFY `utm` TEXT NULL;
