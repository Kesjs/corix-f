# Configuration Supabase pour Corix Finanza

## Étapes de configuration

### 1. Créer un compte Supabase
- Allez sur [supabase.com](https://supabase.com) et créez un compte
- Créez un nouveau projet

### 2. Configurer l'authentification
Dans votre projet Supabase :
1. Allez dans **Authentication** → **Providers**
2. Activez **Email Provider**
3. Configurez les options selon vos besoins

### 3. Récupérer les clés API
1. Allez dans **Project Settings** → **API**
2. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Mettre à jour le fichier .env.local
Remplacez les valeurs dans `c:\corix-finanza\.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme_ici
```

### 5. Configurer les redirect URLs
Dans Supabase Dashboard → Authentication → URL Configuration :
- **Site URL** : `http://localhost:3000`
- **Redirect URLs** : 
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/auth/update-password`

### 6. Créer la table des utilisateurs (optionnel)
Si vous voulez stocker des informations supplémentaires :

```sql
-- Créer une table pour les profils utilisateurs
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Activer RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Créer des politiques
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Fonctionnalités implémentées

### Système d'authentification
- ✅ Connexion avec email/mot de passe
- ✅ Inscription avec données utilisateur
- ✅ Réinitialisation de mot de passe
- ✅ Protection des routes avec middleware
- ✅ Gestion de session côté client et serveur

### Pages d'authentification
- `/auth/login` - Page de connexion
- `/auth/register` - Page d'inscription  
- `/auth/forgot-password` - Réinitialisation de mot de passe
- `/auth/update-password` - Mise à jour du mot de passe après réinitialisation
- `/auth/pending` - Page de vérification d'email

### Routes protégées
- `/dashboard` - Tableau de bord principal
- `/dashboard/cartes` - Gestion des cartes
- `/dashboard/transferts` - Transferts d'argent
- `/dashboard/epargne` - Épargne et investissements
- `/dashboard/profil` - Profil utilisateur

### Sécurité
- ✅ Middleware Next.js pour la protection des routes
- ✅ Authentification côté serveur
- ✅ Redirection automatique selon l'état d'authentification
- ✅ Gestion des tokens avec Supabase SSR

## Démarrage rapide

1. **Installer les dépendances** :
```bash
npm install
```

2. **Configurer Supabase** (voir ci-dessus)

3. **Démarrer le serveur de développement** :
```bash
npm run dev
```

4. **Accéder à l'application** :
- Page d'accueil : http://localhost:3000
- Connexion : http://localhost:3000/auth/login
- Inscription : http://localhost:3000/auth/register

## Notes importantes

- Les utilisateurs doivent vérifier leur email après l'inscription
- Le système utilise Supabase Auth avec gestion de session SSR
- Le design suit le système de design existant de Corix Finanza
- Toutes les pages sont responsive et adaptées aux appareils mobiles