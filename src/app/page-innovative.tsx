"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { 
  Shield, Zap, Eye, Users, CreditCard, Send, PiggyBank, 
  TrendingUp, ChevronDown, CheckCircle2, AlertCircle,
  Lock, Clock, XCircle, DollarSign, BanknoteIcon, FileText,
  Smartphone, Globe
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Composant Brick pour l'effet "Problem Wall"
interface BrickProps {
  index: number
  problem: {
    title: string
    description: string
    icon: React.ReactNode
    stat?: string
  }
  isVisible: boolean
  onHover: () => void
}

function Brick({ index, problem, isVisible, onHover }: BrickProps) {
  return (
    <div
      className={`
        relative p-6 rounded-xl border-2 transition-all duration-500
        ${isVisible 
          ? 'opacity-100 translate-y-0 border-border bg-card shadow-lg' 
          : 'opacity-0 translate-y-10 border-transparent'
        }
        hover:shadow-xl hover:border-accent hover:scale-[1.02] cursor-pointer
        group
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
        animation: isVisible ? `brickAppear 0.6s ease-out ${index * 100}ms both` : 'none'
      }}
      onMouseEnter={onHover}
      onClick={onHover}
    >
      {/* Effet de fissure qui apparaît au hover */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Lignes de fissure */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
            {problem.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg mb-1">{problem.title}</h3>
            {problem.stat && (
              <p className="text-destructive font-bold text-sm">{problem.stat}</p>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {problem.description}
        </p>
      </div>

      {/* Indicateur de solution (apparaît au hover) */}
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
    </div>
  )
}

// Composant Solution Reveal
interface SolutionRevealProps {
  activeProblemIndex: number | null
}

function SolutionReveal({ activeProblemIndex }: SolutionRevealProps) {
  const solutions = [
    {
      title: "Frais transparents à 1%",
      description: "Contre 3-5% ailleurs. Tous nos frais sont affichés clairement, sans surprise.",
      icon: <Eye className="w-5 h-5 text-accent" />
    },
    {
      title: "Transferts instantanés",
      description: "24h/24, 7j/7. Plus d'attente de 3-5 jours ouvrables.",
      icon: <Zap className="w-5 h-5 text-accent" />
    },
    {
      title: "Ouverture de compte en 5min",
      description: "Une pièce d'identité suffit. Pas de paperasse, pas d'attente en agence.",
      icon: <Clock className="w-5 h-5 text-accent" />
    },
    {
      title: "Accès mobile-first",
      description: "100% digital. Gérez tout depuis votre smartphone, même sans connexion internet constante.",
      icon: <Smartphone className="w-5 h-5 text-accent" />
    },
    {
      title: "Support en langue locale",
      description: "Français, Wolof, Dioula, Mooré... Parlez-nous dans votre langue.",
      icon: <Globe className="w-5 h-5 text-accent" />
    }
  ]

  if (activeProblemIndex === null) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">Notre solution</h3>
            <p className="text-sm text-muted-foreground">Comment Corix résout ce problème</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="bg-white/90 rounded-lg p-4 border border-border hover:border-accent transition-all duration-300"
              style={{
                animation: `slideInUp 0.5s ease-out ${index * 100}ms both`
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                {solution.icon}
                <h4 className="font-semibold text-foreground">{solution.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{solution.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="bg-accent hover:bg-accent/90">
            Voir toutes nos solutions
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Composant Counter animé
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0)
  const duration = 2000 // ms
  const steps = 60
  const increment = target / steps

  useEffect(() => {
    let current = 0
    const timer = setInterval(() => {
      current += increment
      setCount(Math.min(Math.floor(current), target))
      if (current >= target) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target, increment])

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}%
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export default function InnovativeLandingPage() {
  const [activeProblemIndex, setActiveProblemIndex] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const wallRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animation d'apparition des briques
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const bricks = document.querySelectorAll('.brick')
    bricks.forEach(brick => observer.observe(brick))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Header animé */}
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-border shadow-sm py-3' 
          : 'bg-transparent py-5'
        }
      `}>
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
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                FR
                <ChevronDown className="w-4 h-4" />
              </button>

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

      {/* Hero Section avec problème principal */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Titre avec animation de typewriter */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary block mb-2">La banque du futur,</span>
              <span className="text-accent typewriter-text">c&apos;est aujourd&apos;hui.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Frais cachés, temps d&apos;attente, exclusion digitale... Ces briques du système 
              traditionnel vous empêchent d&apos;avancer.
            </p>

            {/* Statistiques animées */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <AnimatedCounter target={65} label="de la population exclue" />
              <AnimatedCounter target={5} label="jours d&apos;attente moyens" />
              <AnimatedCounter target={7} label="de frais sur les transferts" />
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

        {/* Fond avec motifs de briques */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width=&quot;100&quot; height=&quot;50&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Crect x=&quot;0&quot; y=&quot;0&quot; width=&quot;100&quot; height=&quot;50&quot; fill=&quot;none&quot; stroke=&quot;%230F2942&quot; stroke-width=&quot;2&quot;/%3E%3C/svg%3E&apos;)] repeat"></div>
        </div>
      </section>

      {/* Problem Wall Section */}
      <section id="wall" className="py-20 bg-secondary/50" ref={wallRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <h2 className="text-3xl font-bold text-foreground">Le mur des problèmes</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passez votre souris sur chaque brique pour voir comment elle se fissure et révèle notre solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="brick"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Brick
                  index={index}
                  problem={problem}
                  isVisible={true}
                  onHover={() => setActiveProblemIndex(index)}
                />
              </div>
            ))}
          </div>

          {/* Indicateur de scroll */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <span className="animate-bounce">↓</span>
              <span>Continuez pour voir les solutions émerger</span>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Emergence Section */}
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

            {/* Solutions en cascade */}
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
                  className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:border-accent transition-all duration-500 hover:shadow-xl"
                  style={{
                    animation: `slideInRight 0.6s ease-out ${index * 200}ms both`
                  }}
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

        {/* Animation de transition */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
      </section>

      {/* CTA Final Section */}
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

          {/* Compteur d'ouvertures en temps réel */}
          <div className="mt-12">
            <div className="inline-flex items-center gap-2 text-white/60 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>3 comptes ouverts dans les dernières 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Reveal Overlay */}
      <SolutionReveal activeProblemIndex={activeProblemIndex} />

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

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Corix Finanza. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                FR
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles d'animation inline */}
      <style jsx global>{`
        @keyframes brickAppear {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typewriter-text {
          overflow: hidden;
          border-right: 3px solid #FF6B35;
          white-space: nowrap;
          margin: 0 auto;
          letter-spacing: .15em;
          animation: 
            typing 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #FF6B35; }
        }

        /* Animation des briques au scroll */
        .brick {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .brick.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
