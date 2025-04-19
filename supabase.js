import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nniaqlwuvnizuptiluzo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uaWFxbHd1dm5penVwdGlsdXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTM0MTQsImV4cCI6MjA2MDIyOTQxNH0.siH8puSMml-nA_qS1TVj70J5eLH_nazO2C1Es6YESXg"
);
