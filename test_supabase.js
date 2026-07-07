// Script de test pour vérifier la connexion Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jxxzsnhmtsoueqjwnrds.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eHpzbmhtdHNvdWVxanducmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDkxOTIsImV4cCI6MjA5ODkyNTE5Mn0.exhmYxHQFRQiIggSy3J11qgxDsKDf1_1zk7tvckc9yU';

console.log('Test de connexion Supabase...');
console.log('URL:', supabaseUrl);
console.log('Clé anonyme:', supabaseKey ? '✓ Définie' : '✗ Non définie');

try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Test 1: Vérifier l'accès à l'API
  console.log('\nTest 1: Accès à l\'API REST...');
  supabase.from('profiles').select('count').then(result => {
    if (result.error) {
      console.log('  Statut: API accessible mais erreur (attendu si table non existante)');
      console.log('  Erreur:', result.error.message);
    } else {
      console.log('  Statut: ✓ API accessible et table profiles existe');
    }
  }).catch(err => {
    console.log('  Statut: ✗ API inaccessible');
    console.log('  Erreur:', err.message);
  });
  
  // Test 2: Vérifier l'authentification
  console.log('\nTest 2: Service d\'authentification...');
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.log('  Statut: ✗ Service auth inaccessible');
      console.log('  Erreur:', error.message);
    } else {
      console.log('  Statut: ✓ Service auth accessible');
      console.log('  Session:', data.session ? 'Active' : 'Aucune session');
    }
  }).catch(err => {
    console.log('  Statut: ✗ Service auth inaccessible');
    console.log('  Erreur:', err.message);
  });
  
  console.log('\nRésumé:');
  console.log('- Si vous voyez "API accessible", la base de données est connectée');
  console.log('- Si vous voyez "table profiles existe", la structure est correcte');
  console.log('- Si vous voyez des erreurs 401/403, vérifiez vos clés API');
  console.log('- Si vous voyez des erreurs 404, exécutez le script SQL fourni');
  
} catch (error) {
  console.error('✗ Erreur de configuration Supabase:', error.message);
  console.log('\nVérifiez que:');
  console.log('1. Votre URL Supabase est correcte');
  console.log('2. Votre clé anonyme est correcte');
  console.log('3. Le projet Supabase est actif');
}