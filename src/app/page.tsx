"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { LanguageSelector } from "@/components/ui/language-selector"
import { 
  Shield, Zap, Eye, Users, CreditCard, Send, PiggyBank, 
  ChevronDown, CheckCircle2, Lock, Globe, Smartphone,
  Wallet, Menu, X
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border py-3 md:bg-white/95 md:backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a 
                href="#hero" 
                className="text-sm font-medium text-foreground hover:text-accent transition-colors py-2 px-1"
                style={{ touchAction: "manipulation" }}
              >
                {t("nav.home")}
              </a>
              <a 
                href="#apropos" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-1"
                style={{ touchAction: "manipulation" }}
              >
                {t("nav.about")}
              </a>
              
              {/* Dropdown Services */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-1"
                  style={{ touchAction: "manipulation" }}
                >
                  {t("nav.services")}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <a 
                      href="#produits" 
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      style={{ touchAction: "manipulation" }}
                    >
                      {t("nav.products")}
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      style={{ touchAction: "manipulation" }}
                    >
                      {t("nav.loans")}
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      style={{ touchAction: "manipulation" }}
                    >
                      {t("nav.savings")}
                    </a>
                  </div>
                </div>
              </div>
              
              <a 
                href="#support" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-1"
                style={{ touchAction: "manipulation" }}
              >
                {t("nav.support")}
              </a>
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              {/* Sélecteur de langue compact pour la navbar */}
              <div className="hidden sm:block">
                <LanguageSelector variant="header" />
              </div>

              <div className="hidden md:flex items-center gap-3">
                <Link href="/auth/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="py-2 px-4"
                    style={{ touchAction: "manipulation" }}
                  >
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button 
                    size="sm" 
                    className="bg-accent hover:bg-accent/90 py-2 px-4"
                    style={{ touchAction: "manipulation" }}
                  >
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>

              {/* Bouton Menu Mobile */}
              <button
                className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2 -mr-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? t("menu.close") : t("menu.open")}
                style={{ touchAction: "manipulation" }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Menu Mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <nav className="flex flex-col gap-2">
                {/* Sélecteur de langue dans le menu mobile */}
                <div className="py-2 px-2">
                  <LanguageSelector variant="simple" />
                </div>
                
                <a 
                  href="#hero" 
                  className="text-base font-medium text-foreground hover:text-accent transition-colors py-3 px-2 rounded-lg hover:bg-secondary/50"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ touchAction: "manipulation" }}
                >
                  {t("nav.home")}
                </a>
                <a 
                  href="#apropos" 
                  className="text-base text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary/50"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ touchAction: "manipulation" }}
                >
                  {t("nav.about")}
                </a>
                
                {/* Services dropdown mobile */}
                <div className="relative">
                  <button 
                    className="flex items-center justify-between w-full text-base text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary/50"
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    style={{ touchAction: "manipulation" }}
                  >
                    <span>{t("nav.services")}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesDropdownOpen && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-border ml-2">
                      <a 
                        href="#produits" 
                        className="block text-sm text-muted-foreground hover:text-foreground py-2 px-2 rounded hover:bg-secondary/50"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ touchAction: "manipulation" }}
                      >
                        {t("nav.products")}
                      </a>
                      <a 
                        href="#" 
                        className="block text-sm text-muted-foreground hover:text-foreground py-2 px-2 rounded hover:bg-secondary/50"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ touchAction: "manipulation" }}
                      >
                        {t("nav.loans")}
                      </a>
                      <a 
                        href="#" 
                        className="block text-sm text-muted-foreground hover:text-foreground py-2 px-2 rounded hover:bg-secondary/50"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ touchAction: "manipulation" }}
                      >
                        {t("nav.savings")}
                      </a>
                    </div>
                  )}
                </div>
                
                <a 
                  href="#support" 
                  className="text-base text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary/50"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ touchAction: "manipulation" }}
                >
                  {t("nav.support")}
                </a>
                
                <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-border">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full py-3 text-base"
                      style={{ touchAction: "manipulation" }}
                    >
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 py-3 text-base"
                      style={{ touchAction: "manipulation" }}
                    >
                      {t("nav.register")}
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section avec image de fond */}
      <section id="hero" className="pt-20 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://media.cdnws.com/_i/31111/RAW-32687/130/88/ambiance-gautier-office-zoom-chene-du-bocage-accueil-3.jpeg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/auth/register">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white shadow-lg py-3 px-6 min-h-[44px]"
                  style={{ touchAction: "manipulation" }}
                >
                  {t("hero.register")}
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/20 text-white border-white/50 hover:bg-white/30 shadow-sm py-3 px-6 min-h-[44px]"
                  style={{ touchAction: "manipulation" }}
                >
                  {t("hero.login")}
                </Button>
              </Link>
            </div>

            {/* Statistiques rapides */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-white/80">{t("stats.clients")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">1%</div>
                <div className="text-sm text-white/80">{t("stats.fees")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">24h/24</div>
                <div className="text-sm text-white/80">{t("stats.available")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous Section */}
      <section id="apropos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">{t("about.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("about.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("about.paragraph1")}
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  {t("about.paragraph2")}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2022</div>
                    <div className="text-sm text-muted-foreground">{t("about.year")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">8</div>
                    <div className="text-sm text-muted-foreground">{t("about.countries")}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/30 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("team.ourTeam")}</h3>
                      <p className="text-sm text-muted-foreground">{t("team.expertsDesc")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("team.commitment")}</h3>
                      <p className="text-sm text-muted-foreground">{t("team.securityDesc")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("team.vision")}</h3>
                      <p className="text-sm text-muted-foreground">{t("team.transformDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promesses Section */}
      <section id="promesses" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("promises.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("promises.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{t("promises.security")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("promises.securityDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{t("promises.speed")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("promises.speedDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{t("promises.transparency")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("promises.transparencyDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{t("promises.accessibility")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("promises.accessibilityDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Produits Section */}
      <section id="produits" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("products.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("products.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-4">{t("products.digitalAccount")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("products.digitalDesc")}
              </p>
              <div className="text-sm text-accent font-medium">→ {t("products.openAccount")}</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Send className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-4">{t("products.transfers")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("products.transfersDesc")}
              </p>
              <div className="text-sm text-accent font-medium">→ {t("products.sendMoney")}</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <PiggyBank className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-4">{t("products.savings")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("products.savingsDesc")}
              </p>
              <div className="text-sm text-accent font-medium">→ {t("products.discover")}</div>
            </div>
          </div>

          {/* Features additionnelles */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Lock className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground">{t("feature.banking")}</span>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground">{t("feature.countries")}</span>
            </div>
            <div className="flex items-center gap-4">
              <Smartphone className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground">{t("feature.mobile")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Preuve Sociale Section */}
      <section id="preuve" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("testimonials.title")}</h2>
            <p className="text-muted-foreground">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-border shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={i} className="w-5 h-5 text-success" />
                ))}
              </div>
              <p className="text-foreground italic mb-6">
                &ldquo;{t("testimonial.1.quote")}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">MK</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Mariam Keita</p>
                  <p className="text-sm text-muted-foreground">{t("testimonial.1.author")}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={i} className="w-5 h-5 text-success" />
                ))}
              </div>
              <p className="text-foreground italic mb-6">
                &ldquo;{t("testimonial.2.quote")}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">AD</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Amadou Diallo</p>
                  <p className="text-sm text-muted-foreground">{t("testimonial.2.author")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-sm text-muted-foreground">{t("stats.rating")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">{t("stats.satisfied")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10M €</div>
              <div className="text-sm text-muted-foreground">{t("stats.transferred")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
            {t("cta.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                {t("cta.register")}
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/40 hover:bg-white/20 shadow-sm">
                <Wallet className="mr-2 w-5 h-5" />
                {t("cta.login")}
              </Button>
            </Link>
          </div>

          {/* Avantages rapides */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("advantage.quick")}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("advantage.noFees")}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("advantage.support")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("support.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("support.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{t("support.email")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("support.emailResponse")}
              </p>
              <a href="mailto:support@corix-finanza.com" className="text-accent font-medium hover:text-accent/80">
                support@corix-finanza.com
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{t("support.helpCenter")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("support.faq")}
              </p>
              <a href="#" className="text-accent font-medium hover:text-accent/80">
                {t("support.visitHelp")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <Logo showText={true} />
            
            <div className="flex items-center gap-6">
              <Link href="/legal/cgu" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.cgu")}
              </Link>
              <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.contact")}
              </Link>
            </div>
            
            <div className="relative z-50">
              <LanguageSelector variant="dropdown" />
            </div>
          </div>
          
          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}