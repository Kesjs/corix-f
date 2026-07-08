-- Script pour créer la table system_settings
-- Exécuter dans l'éditeur SQL de Supabase

-- Créer la table system_settings
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Politique : seul le service role peut modifier
CREATE POLICY "Service role can manage system_settings"
  ON system_settings
  FOR ALL
  USING (auth.role() = 'service_role');

-- Insérer le flag d'initialisation admin
INSERT INTO system_settings (key, value)
VALUES ('admin_initialized', 'false')
ON CONFLICT (key) DO NOTHING;

-- Vérification
SELECT * FROM system_settings WHERE key = 'admin_initialized';
