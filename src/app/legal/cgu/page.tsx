import { AuthHeader } from "@/components/auth/auth-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Conditions Générales d&apos;Utilisation</CardTitle>
              <CardDescription>
                Dernière mise à jour : 7 juillet 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">1. Acceptation des conditions</h2>
                <p className="text-muted-foreground">
                  En utilisant les services de Corix Finanza, vous acceptez les présentes Conditions Générales d&apos;Utilisation (CGU). 
                  Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">2. Services bancaires</h2>
                <p className="text-muted-foreground">
                  Corix Finanza fournit des services bancaires digitaux incluant l&apos;ouverture de compte, 
                  les cartes virtuelles, les transferts d&apos;argent, l&apos;épargne et les crédits.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">3. Éligibilité</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Être âgé d&apos;au moins 18 ans</li>
                  <li>Résider dans un pays où nos services sont disponibles</li>
                  <li>Fournir des informations exactes et complètes</li>
                  <li>Accepter notre politique de vérification d&apos;identité</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">4. Sécurité</h2>
                <p className="text-muted-foreground">
                  Vous êtes responsable de la confidentialité de vos identifiants de connexion. 
                  Toute activité sur votre compte est présumée avoir été effectuée par vous.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">5. Frais et commissions</h2>
                <p className="text-muted-foreground">
                  Les frais applicables sont détaillés dans notre grille tarifaire. 
                  Nous nous réservons le droit de modifier nos tarifs avec un préavis de 30 jours.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">6. Limitation de responsabilité</h2>
                <p className="text-muted-foreground">
                  Corix Finanza ne saurait être tenu responsable des pertes résultant 
                  de circonstances imprévisibles ou de force majeure.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">7. Modifications</h2>
                <p className="text-muted-foreground">
                  Nous nous réservons le droit de modifier ces CGU à tout moment. 
                  Les modifications seront effectives dès leur publication sur notre site.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant ces CGU, veuillez nous contacter à :
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