-- Script SQL pour ajouter les colonnes manquantes à la table profiles
-- La table et les politiques existent déjà

-- 1. Vérifier les colonnes actuelles
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'profiles'
ORDER BY 
    ordinal_position;

-- 2. Ajouter les colonnes manquantes (sans erreur si elles existent)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profession TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id_type TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_code TEXT;

-- 3. Vérifier si la colonne phone existe (elle pourrait avoir un autre nom)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'phone'
    ) THEN
        ALTER TABLE profiles ADD COLUMN phone TEXT;
    END IF;
END $$;

-- 4. Vérifier les colonnes après modification
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'profiles'
ORDER BY 
    ordinal_position;

-- 5. Message de confirmation
SELECT 'Table profiles mise à jour avec succès' as status;

-- 2. Vérifier les colonnes actuelles
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'profiles'
ORDER BY 
    ordinal_position;

-- 3. Vérifier les politiques RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM 
    pg_policies
WHERE 
    tablename = 'profiles'
ORDER BY 
    policyname;