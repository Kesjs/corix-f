"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Bell, ChevronDown, Settings, Shield, Users, CreditCard, AlertCircle, Save } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border z-50">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-accent font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg leading-tight">Corix</span>
              <span className="text-muted-foreground text-sm">Admin</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/sysadmin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Vue d'ensemble</span>
          </a>
          <a href="/sysadmin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Utilisateurs</span>
          </a>
          <a href="/sysadmin/kyc" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Validation KYC</span>
          </a>
          <a href="/sysadmin/transactions" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Transactions</span>
          </a>
          <a href="/sysadmin/credits" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Crédits</span>
          </a>
          <a href="/sysadmin/cards" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Cartes</span>
          </a>
          <a href="/sysadmin/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Rapports</span>
          </a>
          <a href="/sysadmin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/10 text-accent">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Paramètres</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Paramètres système</h1>
            <p className="text-muted-foreground">Configuration de la plateforme</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </header>

        <div className="max-w-4xl space-y-6">
          {/* General Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Paramètres généraux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nom de l'application</label>
                <Input defaultValue="Corix Finanza" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email de support</label>
                <Input type="email" defaultValue="support@corixfinanza.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Numéro de support</label>
                <Input defaultValue="+221 33 123 45 67" />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Sécurité</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Authentification à deux facteurs</p>
                  <p className="text-sm text-muted-foreground">Obliger le 2FA pour les admins</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Session timeout</p>
                  <p className="text-sm text-muted-foreground">Déconnexion automatique après inactivité</p>
                </div>
                <select className="px-3 py-2 border border-input rounded-lg bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm">
                  <option>30 minutes</option>
                  <option>1 heure</option>
                  <option>4 heures</option>
                  <option>8 heures</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">IP whitelist</p>
                  <p className="text-sm text-muted-foreground">Restreindre l'accès admin par IP</p>
                </div>
                <div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Utilisateurs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Validation KYC obligatoire</p>
                  <p className="text-sm text-muted-foreground">Exiger KYC avant d'utiliser la plateforme</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Limite de transfert par défaut</p>
                  <p className="text-sm text-muted-foreground">Montant maximum pour les nouveaux utilisateurs</p>
                </div>
                <Input type="number" defaultValue="1000" className="w-32" />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Délai de validation KYC</p>
                  <p className="text-sm text-muted-foreground">Délai maximum pour traiter les dossiers</p>
                </div>
                <select className="px-3 py-2 border border-input rounded-lg bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm">
                  <option>24 heures</option>
                  <option>48 heures</option>
                  <option>72 heures</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Credit Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Crédits</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Taux d'intérêt par défaut</p>
                  <p className="text-sm text-muted-foreground">Taux appliqué aux crédits</p>
                </div>
                <Input type="number" defaultValue="5" className="w-24" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Montant maximum de crédit</p>
                  <p className="text-sm text-muted-foreground">Limite maximum par utilisateur</p>
                </div>
                <Input type="number" defaultValue="5000" className="w-32" />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Durée maximum</p>
                  <p className="text-sm text-muted-foreground">Durée maximale en mois</p>
                </div>
                <Input type="number" defaultValue="24" className="w-24" />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Alertes KYC</p>
                  <p className="text-sm text-muted-foreground">Notifier pour les nouveaux dossiers KYC</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Alertes transactions</p>
                  <p className="text-sm text-muted-foreground">Notifier pour les transactions suspectes</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Alertes crédits</p>
                  <p className="text-sm text-muted-foreground">Notifier pour les demandes de crédit</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg">
              <Save className="w-5 h-5 mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
