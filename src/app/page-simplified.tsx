"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { 
  ChevronDown, CheckCircle2, AlertCircle,
  Clock, XCircle, DollarSign, BanknoteIcon, FileText,
  Smartphone, Globe, Eye, Zap
} from "lucide-react"
import { useEffect, useState } from "react"

export default function InnovativeLandingPage() {
  const [activeProblemIndex, setActiveProblemIndex] = useState<number | null>(null)

  const problems = [
    {
      title: "Frais bancaires opaques",
      description: "Des frais cachés qui grignotent votre épargne sans que vous ne compreniez pourquoi.",
      icon: <DollarSign className="w-6 h-6 text-destructive" />,
      stat: "3-5% en moyenne"
    },
    {
      title: "Temps d'attente interminables",
      description: "3-5 jours pour un transfert, des semaines pour un crédit. Le temps, c'est de l'argent perdu.",
      icon: <Clock className="w-6 h-6 text-destructive" />,
      stat: "Jusqu'à 5 jours d'attente"
    },
    {
      title: "Exclusion digitale",
      description: "Pas d'accès aux services bancaires sans smartphone récent ou connexion internet stable.",
      icon: <XCircle className="w-6 h-6 text-destructive" />,
      stat: "65% exclus"
    },
    {
      title: "Paperasserie excessive",
      description: "Des dossiers de 10 pages, des justificatifs impossibles à obtenir pour les travailleurs informels.",
      icon: <FileText className="w-6 h-6 text-destructive" />,
      stat: "10+ documents requis"
    },
    {
      title: "Transferts trop coûteux",
      description: "Envoyer de l'argent à sa famille coûte une fortune avec les canaux traditionnels.",
      icon: <BanknoteIcon className="w-6 h-6 text-destructive" />,
      stat: "7-10% de frais"
    },
    {
      title: "Manque de transparence",
      description: "Vous ne savez jamais exactement combien vous allez payer ni quand votre argent arrivera.",
      icon: <Eye className="w-6 h-6 text-destructive" />,
      stat: "0 visibilité"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#wall" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                Les problèmes
              </a>
              <a href="#solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Nos solutions
              </a>
              <a href="#impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Votre impact
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <Button variant="outline" size="sm">Se connecter</Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Ouvrir un compte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary block mb-2">La banque traditionnelle est compliquée,</span>
              <span className="text-accent">nous simplifions tout.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Frais cachés, temps d&apos;attente, exclusion digitale... Ces briques du système 
              traditionnel vous empêchent d&apos;avancer.
            </p>

            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">65%</div>
                <div className="text-sm text-muted-foreground">de la population exclue</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5</div>
                <div className="text-sm text-muted-foreground">jours d&apos;attente moyens</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">7%</div>
                <div className="text-sm text-muted-foreground">de frais sur les transferts</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Voir chaque problème
                <ChevronDown className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                Découvrir nos solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Wall Section */}
      <section id="wall" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <h2 className="text-3xl font-bold text-foreground">Le mur des problèmes</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passez votre souris sur chaque brique pour voir comment elle se fissure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="brick-card animate-brick-appear"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveProblemIndex(index)}
                onMouseLeave={() => setActiveProblemIndex(null)}
              >
                <div className="relative p-6 rounded-xl border-2 border-border bg-card shadow-lg hover:shadow-xl hover:border-accent hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
                  {/* Effet de fissure */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
                        {problem.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg mb-1">{problem.title}</h3>
                        <p className="text-destructive font-bold text-sm">{problem.stat}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  {/* Indicateur de solution */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
                <h2 className="text-3xl font-bold text-foreground">Comment nous brisons le mur</h2>
              </div>
              <p className="text-muted-foreground">
                Chaque problème a sa solution chez Corix Finanza
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Transparence radicale",
                  description: "1% de frais, point final. Tout est affiché en temps réel dans votre app.",
                  icon: <Eye className="w-6 h-6 text-accent" />,
                  stat: "-70% de frais vs moyenne"
                },
                {
                  title: "Vitesse instantanée",
                  description: "Transferts en quelques secondes, crédit approuvé en 24h maximum.",
                  icon: <Zap className="w-6 h-6 text-accent" />,
                  stat: "24h/24, 7j/7"
                },
                {
                  title: "Accessibilité mobile-first",
                  description: "App légère qui fonctionne même avec une connexion limitée.",
                  icon: <Smartphone className="w-6 h-6 text-accent" />,
                  stat: "100% mobile"
                }
              ].map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:border-accent transition-all duration-500 hover:shadow-xl animate-slide-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      {solution.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">{solution.title}</h3>
                        <span className="font-bold text-accent">{solution.stat}</span>
                      </div>
                      <p className="text-muted-foreground">{solution.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à briser les barrières ?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
            Rejoignez les 50,000+ personnes qui ont déjà abandonné le système bancaire traditionnel
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Ouvrir mon compte gratuitement
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Voir la démo en vidéo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-sm text-muted-foreground">
                Simplifions ensemble votre vie financière en Espagne.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Notre approche</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Transparence</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Accessibilité</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Innovation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Pour qui ?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Entrepreneurs</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Diaspora</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Étudiants</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Presse</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Carrières</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Corix Finanza. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}