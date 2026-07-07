const fs = require('fs');
const path = require('path');

// Fonction pour corriger les apostrophes dans les fichiers
function fixApostrophesInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Remplacer les apostrophes simples problématiques dans les strings JSX
  // Note: ceci est une solution simple, pourrait être plus sophistiquée
  let fixedContent = content;
  
  // Remplacer les apostrophes dans les chaînes JSX (entre guillemets doubles)
  fixedContent = fixedContent.replace(/"([^"]*?)'([^"]*?)"/g, (match, before, after) => {
    return `"${before}&apos;${after}"`;
  });
  
  // Remplacer les apostrophes dans les chaînes JSX (entre accolades simples)
  fixedContent = fixedContent.replace(/'([^']*?)'([^']*?)'/g, (match, before, after) => {
    // Ne pas remplacer dans les imports ou autres
    if (match.includes('import') || match.includes('export') || match.includes('from') || 
        match.includes('type') || match.includes('interface') || match.includes('case')) {
      return match;
    }
    return `'${before}&apos;${after}'`;
  });
  
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed apostrophes in ${filePath}`);
    return true;
  }
  return false;
}

// Fonction pour remplacer 'any' par des types spécifiques
function fixAnyTypesInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Remplacer les déclarations any[] courantes
  let fixedContent = content
    .replace(/useState<any\[\]>\(\[\]\)/g, 'useState<Array<unknown>>([])')
    .replace(/useState<any\[\]>\(\)/g, 'useState<Array<unknown>>()')
    .replace(/useState<Array<any>>/g, 'useState<Array<unknown>>')
    .replace(/any\[\]/g, 'unknown[]')
    .replace(/: any\[/g, ': unknown[')
    .replace(/const (\w+): any =/g, 'const $1: unknown =')
    .replace(/(\w+): any,/g, '$1: unknown,')
    .replace(/(\w+): any\)/g, '$1: unknown)')
    .replace(/Promise<any>/g, 'Promise<unknown>');
  
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed any types in ${filePath}`);
    return true;
  }
  return false;
}

// Traiter tous les fichiers TypeScript/TSX
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      // Ignorer node_modules et .next
      if (file.name !== 'node_modules' && file.name !== '.next' && 
          file.name !== '.git' && !file.name.startsWith('.')) {
        processDirectory(fullPath);
      }
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      fixApostrophesInFile(fullPath);
      fixAnyTypesInFile(fullPath);
    }
  }
}

// Point d'entrée
const projectRoot = __dirname;
processDirectory(projectRoot);

console.log('Lint fixes applied.');