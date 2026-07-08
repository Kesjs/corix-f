"use client"

import { AuthHeader } from "@/components/auth/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-primary mb-4">Contactez-nous</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Formulaire de contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Envoyez-nous un message</CardTitle>
                  <CardDescription>
                    Nous vous répondrons dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Prénom</label>
                        <Input placeholder={t("placeholder.firstName")} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Nom</label>
                        <Input placeholder={t("placeholder.lastName")} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input type="email" placeholder={t("placeholder.email")} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Sujet</label>
                      <Input placeholder={t("placeholder.subject")} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <textarea 
                        className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent min-h-[150px]"
                        placeholder={t("placeholder.message")}
                      />
                    </div>

                    <Button className="w-full" size="lg">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Informations de contact */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">Support téléphonique</h3>
                          <p className="text-muted-foreground mb-2">
                            Du lundi au vendredi, 8h-20h
                          </p>
                          <a href="tel:+34912345678" className="text-accent font-medium hover:text-accent/80">
                            +34 912 345 678
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">Email</h3>
                          <p className="text-muted-foreground mb-2">
                            Réponse sous 24h
                          </p>
                          <a href="mailto:support@corix-finanza.com" className="text-accent font-medium hover:text-accent/80">
                            support@corix-finanza.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">Siège social</h3>
                          <p className="text-muted-foreground">
                            Corix Finanza<br />
                            Avenida de la Libertad, 123<br />
                            28001 Madrid, Espagne
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">Horaires d&apos;ouverture</h3>
                          <p className="text-muted-foreground">
                            Lundi - Vendredi: 8h - 20h<br />
                            Samedi: 9h - 14h<br />
                            Dimanche: Fermé
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Questions fréquentes</CardTitle>
                    <CardDescription>
                      Consultez notre centre d&apos;aide pour des réponses rapides
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Comment ouvrir un compte ?</h4>
                        <p className="text-sm text-muted-foreground">
                          L&apos;ouverture de compte se fait en ligne en quelques minutes via notre formulaire d&apos;inscription.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Quels documents sont requis ?</h4>
                        <p className="text-sm text-muted-foreground">
                          Pièce d&apos;identité, justificatif de domicile et photo récente.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Quels sont les frais ?</h4>
                        <p className="text-sm text-muted-foreground">
                          Consultez notre grille tarifaire pour tous les détails sur nos frais.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}