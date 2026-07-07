import { AuthHeader } from "@/components/auth/auth-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Politique de Confidentialité</CardTitle>
              <CardDescription>
                Dernière mise à jour : 7 juillet 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">1. Collecte des données</h2>
                <p className="text-muted-foreground">
                  Nous collectons les informations nécessaires pour fournir nos services bancaires :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Informations d&apos;identité (nom, prénom, date de naissance)</li>
                  <li>Coordonnées (adresse, email, téléphone)</li>
                  <li>Informations financières (justificatifs de revenus)</li>
                  <li>Données de transaction (historique des opérations)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">2. Utilisation des données</h2>
                <p className="text-muted-foreground">
                  Vos données sont utilisées pour :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Gérer votre compte bancaire</li>
                  <li>Exécuter vos transactions</li>
                  <li>Respecter nos obligations légales</li>
                  <li>Améliorer nos services</li>
                  <li>Prévenir la fraude</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">3. Partage des données</h2>
                <p className="text-muted-foreground">
                  Nous ne partageons vos données qu&apos;avec :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Nos prestataires techniques nécessaires au fonctionnement de nos services</li>
                  <li>Les autorités réglementaires dans le cadre de nos obligations légales</li>
                  <li>Les partenaires de paiement pour l&apos;exécution des transactions</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">4. Sécurité des données</h2>
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Chiffrement de bout en bout</li>
                  <li>Authentification à deux facteurs</li>
                  <li>Surveillance continue des systèmes</li>
                  <li>Formation de notre personnel à la protection des données</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">5. Conservation des données</h2>
                <p className="text-muted-foreground">
                  Nous conservons vos données aussi longtemps que nécessaire pour :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Fournir nos services bancaires</li>
                  <li>Respecter nos obligations légales (généralement 10 ans pour les données financières)</li>
                  <li>Résoudre les litiges éventuels</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">6. Vos droits</h2>
                <p className="text-muted-foreground">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Droit d&apos;accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l&apos;effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d&apos;opposition</li>
                </ul>
                <p className="text-muted-foreground">
                  Pour exercer vos droits, contactez notre délégué à la protection des données à : 
                  <strong> dpo@corix-finanza.com</strong>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">7. Cookies</h2>
                <p className="text-muted-foreground">
                  Nous utilisons différents types de cookies pour assurer le bon fonctionnement de notre site et améliorer votre expérience utilisateur.
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-foreground mb-2">Types de cookies utilisés :</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>
                      <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, sécurité, préférences de session)
                    </li>
                    <li>
                      <strong>Cookies analytiques :</strong> Nous aident à comprendre comment vous utilisez notre site pour l&apos;améliorer
                    </li>
                    <li>
                      <strong>Cookies de préférences :</strong> Mémorisent vos choix (langue, paramètres d'affichage)
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-foreground mb-2">Gestion des cookies :</h3>
                  <p className="text-muted-foreground">
                    À votre première visite, vous serez invité à accepter ou refuser l&apos;utilisation des cookies non-essentiels via notre bannière de consentement. Vous pouvez à tout moment :
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-2">
                    <li>Modifier vos préférences en supprimant les cookies depuis les paramètres de votre navigateur</li>
                    <li>Refuser les cookies analytiques via notre bannière de consentement</li>
                    <li>Consulter les cookies actifs dans les outils de développement de votre navigateur</li>
                  </ul>
                </div>

                <p className="text-muted-foreground">
                  Les cookies essentiels ne peuvent pas être désactivés car ils sont nécessaires au fonctionnement sécurisé de notre application bancaire.
                  Vous pouvez configurer votre navigateur pour refuser les autres cookies, mais cela pourrait affecter certaines fonctionnalités.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant notre politique de confidentialité :
                  <br />
                  <strong>Corix Finanza - Service Protection des Données</strong>
                  <br />
                  <strong>support@corix-finanza.com</strong>
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}