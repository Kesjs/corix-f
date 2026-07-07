"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Navigation } from "@/components/ui/navigation"
import { CreditCard, Plus, Eye, EyeOff, Lock, Unlock, Settings } from "lucide-react"
import { useState } from "react"

export default function CartesPage() {
  const [showNumber, setShowNumber] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">Mes cartes</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Card Display */}
          <Card className="bg-primary text-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent font-bold text-sm">C</span>
                  </div>
                  <span className="font-medium">Corix Finanza</span>
                </div>
                <StatusBadge status="active" className="bg-white/10 text-white border-white/20" />
              </div>
              <p className="text-2xl font-mono tracking-wider mb-6">
                {showNumber ? "4521 1234 5678 9012" : "•••• •••• •••• 4521"}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-70">Titulaire</p>
                  <p className="text-sm font-medium">BERNADETTE D.</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">Expiration</p>
                  <p className="text-sm font-medium">12/26</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowNumber(!showNumber)}
            >
              {showNumber ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {showNumber ? "Masquer" : "Afficher"} le numéro
            </Button>
            <Button
              variant={isBlocked ? "outline" : "destructive"}
              className="flex items-center gap-2"
              onClick={() => setIsBlocked(!isBlocked)}
            >
              {isBlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              {isBlocked ? "Débloquer" : "Bloquer"} la carte
            </Button>
          </div>

          {/* Card Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Paramètres de la carte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Paiements en ligne</p>
                  <p className="text-sm text-muted-foreground">Autoriser les achats sur internet</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Paiements à l'étranger</p>
                  <p className="text-sm text-muted-foreground">Autoriser les transactions hors zone</p>
                </div>
                <div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Plafond mensuel</p>
                  <p className="text-sm text-muted-foreground">5 000 € / mois</p>
                </div>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions on Card */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">Dernières transactions</h2>
            <div className="space-y-3">
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Supermarché Casino</p>
                      <p className="text-xs text-muted-foreground">Aujourd'hui, 14:30</p>
                    </div>
                    <p className="font-medium text-destructive tabular-nums">-85,50 €</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Amazon</p>
                      <p className="text-xs text-muted-foreground">Hier, 09:15</p>
                    </div>
                    <p className="font-medium text-destructive tabular-nums">-45,99 €</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Station Total</p>
                      <p className="text-xs text-muted-foreground">2 jan., 10:00</p>
                    </div>
                    <p className="font-medium text-destructive tabular-nums">-65,00 €</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Request New Card */}
          <Button className="w-full" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Demander une nouvelle carte
          </Button>
        </div>
      </main>
    </div>
  )
}
