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
                  Nous utilisons des cookies pour améliorer votre expérience utilisateur et assurer la sécurité de votre session.
                  Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait affecter certaines fonctionnalités.
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