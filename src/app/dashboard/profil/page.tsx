"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { User, Mail, MapPin, Briefcase, Bell, Shield, LogOut, ChevronRight, Globe } from "lucide-react"
import Link from "next/link"

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <h1 className="text-xl font-semibold text-primary">Mon profil</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">B</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-primary">Bernadette Diop</h2>
                  <p className="text-sm text-muted-foreground">bernadette@example.com</p>
                  <p className="text-sm text-muted-foreground">+221 77 123 45 67</p>
                </div>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nom complet</label>
                <Input defaultValue="Bernadette Diop" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" defaultValue="bernadette@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Téléphone</label>
                <Input defaultValue="+221 77 123 45 67" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Adresse</label>
                <Input defaultValue="123 Rue de la République, Dakar" />
              </div>
              <Button className="w-full">Enregistrer</Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">Paramètres</h2>
            
            <Card className="shadow-sm">
              <CardContent className="p-0">
                <Link href="/dashboard/profil/notifications" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Notifications</p>
                      <p className="text-sm text-muted-foreground">Gérer vos préférences</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-0">
                <Link href="/dashboard/profil/securite" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Sécurité</p>
                      <p className="text-sm text-muted-foreground">Mot de passe, 2FA</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-0">
                <Link href="/dashboard/profil/langue" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Langue</p>
                      <p className="text-sm text-muted-foreground">Français</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">Support</h2>
            
            <Card className="shadow-sm">
              <CardContent className="p-0">
                <Link href="/dashboard/profil/aide" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Centre d'aide</p>
                      <p className="text-sm text-muted-foreground">FAQ et tutoriels</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-0">
                <Link href="/dashboard/profil/contact" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Nous contacter</p>
                      <p className="text-sm text-muted-foreground">Chat et email</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Logout */}
          <Button variant="destructive" className="w-full" size="lg">
            <LogOut className="w-5 h-5 mr-2" />
            Se déconnecter
          </Button>

          {/* Version Info */}
          <p className="text-center text-xs text-muted-foreground">
            Corix Finanza v1.0.0
          </p>
        </div>
      </main>
    </div>
  )
}
