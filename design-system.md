# Design System - Corix Finanza

Ce fichier définit les règles permanentes pour tout agent IA travaillant sur ce projet. Il est lu automatiquement avant chaque requête.

## Palette de couleurs

| Rôle | Couleur | Code hex | Usage |
|---|---|---|---|
| Fond principal | Blanc cassé | `#FAFAFA` | Fond de toutes les pages |
| Fond secondaire | Gris très clair | `#F0F1F3` | Cartes, sections alternées |
| Marque primaire | Bleu marine profond | `#0F2942` | Logo, headers, textes de titre, boutons secondaires |
| Marque primaire (hover/dark) | Bleu marine foncé | `#0A1D30` | États actifs/hover des éléments bleu marine |
| Accent | Orange vif | `#FF6B35` | CTA principaux, montants, badges actifs, onglet nav actif |
| Accent (hover) | Orange foncé | `#E85A28` | Hover des boutons orange |
| Texte principal | Gris anthracite | `#1A1D1F` | Jamais de noir pur (#000) |
| Texte secondaire | Gris moyen | `#6B7280` | Sous-titres, légendes, placeholders |
| Texte tertiaire / désactivé | Gris clair | `#B0B5BC` | Champs désactivés |
| Succès | Vert doux | `#2E9E5B` | Confirmations, statuts "actif", "remboursé" |
| Alerte | Orange ambre | `#F0A500` | Avertissements, "en attente" |
| Erreur | Rouge doux | `#E5484D` | Erreurs, "refusé", "bloqué" |
| Bordures | Gris très clair | `#E4E6E9` | Séparateurs, contours de cartes |

**Règle de contraste** : aucun texte gris foncé pur sur blanc pur — toujours un léger adoucissement des deux côtés pour éviter la dureté visuelle typique des interfaces low-cost.

## Typographie

- **Police** : Inter (ou Manrope en alternative) — chargée via Google Fonts / self-hosted pour la PWA
- **Hiérarchie** :
  - H1 (titres de page) : 28px / 700 / bleu marine
  - H2 (titres de section) : 20px / 600 / gris anthracite
  - H3 (sous-sections, labels de carte) : 16px / 600
  - Corps de texte : 15px / 400 / gris anthracite
  - Légende / metadata : 13px / 400 / gris moyen
  - Montants (chiffres) : police tabulaire (`font-variant-numeric: tabular-nums`) pour alignement parfait des chiffres dans les listes de transactions

## Iconographie

- **Lucide Icons exclusivement**, style filaire (outline), épaisseur de trait 1.5–2px
- Aucun emoji, aucune icône pleine (filled) sauf pour les statuts critiques (ex. point plein rouge pour "erreur")
- Taille standard : 20px (nav, listes), 24px (headers), 32px (actions rapides dashboard)

## Espacement

- Multiples de 4 uniquement (4, 8, 12, 16, 24, 32, 48px)
- Pas de `p-[13px]` ou de valeurs arbitraires Tailwind

## Rayons

- `rounded` (8px) par défaut
- `rounded-lg` (12px) pour les cartes principales
- `rounded-pill` pour les badges

## Ombres

- Aucun dégradé, aucune ombre forte
- `box-shadow` uniquement pour les focus rings d'accessibilité
- Ombre légère pour cartes : `box-shadow: 0 2px 8px rgba(15,41,66,0.06)`

## Composants réutilisables clés

### Carte (Card)
- Fond blanc, rayon de bordure 16px, ombre légère (`box-shadow: 0 2px 8px rgba(15,41,66,0.06)`)
- Padding interne 16–20px
- Variante "carte bancaire" : rayon 20px, dégradé subtil bleu marine → bleu marine plus clair avec liseré orange, effet de relief léger (pas de glassmorphism excessif)

### Bouton primaire
- Fond orange `#FF6B35`, texte blanc, rayon 12px, hauteur 52px (zone tactile confortable)
- Micro-interaction : légère réduction d'échelle (scale 0.98) au clic

### Bouton secondaire
- Fond transparent, bordure bleu marine 1.5px, texte bleu marine

### Bouton tertiaire / lien
- Texte orange souligné au survol, sans fond

### Input
- Rayon 12px, bordure `#E4E6E9` au repos, bordure orange 1.5px au focus
- Label flottant au-dessus, hauteur 52px
- États : repos, focus, erreur (bordure + texte rouge doux), désactivé (fond gris clair)

### Bottom Navigation Bar (mobile)
- 5 icônes : Accueil, Cartes, Transferts, Épargne, Profil
- Icône + label 11px, icône active en orange avec petit indicateur (point ou fond arrondi orange clair derrière l'icône), icônes inactives en gris moyen
- Hauteur 64px + zone de sécurité iOS, fond blanc avec ombre portée vers le haut très légère

### Header (web/landing/dashboard)
- Logo Corix Finanza à gauche, sélecteur de langue (FR/EN/ES) à droite sous forme de menu déroulant compact
- Menu hamburger uniquement sur landing page / version desktop admin

### Badge de statut
- Pilule arrondie, fond pastel + texte de la couleur pleine correspondante
- Exemple : fond vert très clair + texte vert `#2E9E5B` pour "Actif"
- Statuts types : Actif, En attente, Refusé, Remboursé, Bloqué, Expiré

## Règles responsive (obligatoires sur chaque écran)

Le projet est mobile-first (PWA) mais doit aussi être pleinement utilisable sur grand écran (desktop). Chaque écran généré doit gérer les deux tailles avec Tailwind, sans exception.

**Breakpoints Tailwind utilisés** : `md:` (≥768px) pour la bascule mobile → desktop. Ne pas utiliser `sm:` ou `lg:` sauf besoin précis, pour rester simple et cohérent.

### Navigation
- **Mobile (< 768px)** : barre de navigation fixe en bas de l'écran (5 items max), icônes Tabler + label court
- **Desktop (≥ 768px)** : sidebar verticale fixe à gauche
- **Implémentation** : un seul composant `components/ui/Navigation.tsx` qui rend l'un ou l'autre via classes Tailwind responsive (`hidden md:flex` / `flex md:hidden`), jamais deux composants séparés dupliqués

## Checklist avant de répondre "terminé" sur une tâche UI

- [ ] Une seule couleur d'action (coral/orange) par écran
- [ ] Teal réservé aux statuts de confiance uniquement (jamais comme couleur de marque)
- [ ] Composants existants dans `components/ui/` réutilisés ou étendus, jamais dupliqués
- [ ] Espacement en multiples de 4 uniquement
- [ ] Font-weight 400 ou 500 uniquement (jamais 600/700 sauf titres)
- [ ] Jamais de majuscules forcées (uppercase) sur les boutons ou labels
- [ ] Rayons : rounded (8px) par défaut, rounded-lg (12px) pour cartes principales
- [ ] Aucun dégradé, aucune ombre forte
- [ ] Icônes : Lucide outline uniquement (ti ti-* ou lucide-*), jamais de variante -filled
- [ ] Responsive mobile-first avec breakpoint md: uniquement
- [ ] Navigation unique avec classes responsive
