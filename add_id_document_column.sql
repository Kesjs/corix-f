-- Script pour ajouter la colonne id_document_url à la table profiles
-- Exécuter dans l'éditeur SQL de Supabase

-- Vérifier si la colonne existe déjà
SELECT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'id_document_url'
) as column_exists;

-- Ajouter la colonne si elle n'existe pas
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id_document_url TEXT;

-- Vérifier la structure après modification
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    character_maximum_length
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'profiles'
ORDER BY 
    ordinal_position;

-- Message de confirmation
SELECT 'Colonne id_document_url ajoutée avec succès à la table profiles' as status;