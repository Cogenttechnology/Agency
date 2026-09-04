-- Leads table for the /scale landing page (Curious Apes lead-gen LP)
-- Run once in Supabase SQL editor.

CREATE TABLE IF NOT EXISTS public.leads (
    id                uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    phone             text DEFAULT ''::text NOT NULL,
    brand             text DEFAULT ''::text NOT NULL,
    website           text DEFAULT ''::text NOT NULL,
    monthly_sales     text DEFAULT ''::text NOT NULL,
    monthly_ad_spend  text DEFAULT ''::text NOT NULL,
    source            text DEFAULT 'lead-gen-lp'::text NOT NULL,
    referrer          text DEFAULT ''::text NOT NULL,
    utm               jsonb,
    ip                text DEFAULT ''::text NOT NULL,
    user_agent        text DEFAULT ''::text NOT NULL,
    status            text DEFAULT 'new'::text NOT NULL,
    notes             text DEFAULT ''::text NOT NULL,
    created_at        timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status  ON public.leads (status);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY leads_public_insert ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY leads_admin_read ON public.leads
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY leads_admin_update ON public.leads
  FOR UPDATE TO authenticated, anon USING (true) WITH CHECK (true);

CREATE POLICY leads_admin_delete ON public.leads
  FOR DELETE TO authenticated, anon USING (true);
