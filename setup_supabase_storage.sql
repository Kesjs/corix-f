-- =====================================================
-- Configuration du stockage Supabase pour les documents d'identité
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- =====================================================

-- 1. Créer le bucket 'documents' pour stocker les pièces d'identité
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,  -- Bucket public pour accéder aux fichiers
  5242880,  -- 5MB en octets
  ARRAY['image/jpeg', 'image/png', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Politique RLS pour permettre l'upload aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'documents');

-- 3. Politique RLS pour permettre la lecture publique
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'documents');

-- 4. Politique RLS pour permettre aux utilisateurs de supprimer leurs propres fichiers
CREATE POLICY "Allow users to delete own files" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- Vérification
-- =====================================================

-- Vérifier que le bucket a été créé
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id = 'documents';

-- Vérifier les politiques
SELECT policyname, cmd, roles, qual 
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';

-- =====================================================
-- Si le bucket existe déjà, vérifier ses paramètres
-- =====================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'documents') THEN
    RAISE NOTICE 'Le bucket documents existe déjà';
    
    -- Mettre à jour les paramètres si nécessaire
    UPDATE storage.buckets 
    SET 
      public = true,
      file_size_limit = 5242880,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'application/pdf']
    WHERE id = 'documents';
    
    RAISE NOTICE 'Paramètres du bucket mis à jour';
  ELSE
    RAISE NOTICE 'Le bucket documents a été créé';
  END IF;
END $$;