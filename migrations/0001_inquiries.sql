-- Run once in the dedicated hingetra-inquiries D1 database, never another site's DB.
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  product TEXT NOT NULL,
  source_path TEXT NOT NULL,
  fields_json TEXT NOT NULL,
  attachments_json TEXT NOT NULL DEFAULT '[]',
  request_hash TEXT NOT NULL,
  follow_up_status TEXT NOT NULL DEFAULT 'new'
    CHECK (follow_up_status IN ('new', 'contacted', 'quoted', 'closed')),
  notification_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (notification_status IN ('pending', 'accepted', 'failed')),
  notification_id TEXT,
  notification_error TEXT
);
CREATE INDEX IF NOT EXISTS inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS inquiries_notification ON inquiries(notification_status, created_at);

-- Short-lived hashed abuse counters. No raw IP addresses are stored.
CREATE TABLE IF NOT EXISTS inquiry_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS inquiry_limits_expiry ON inquiry_limits(expires_at);
