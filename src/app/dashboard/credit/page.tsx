"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Navigation } from "@/components/ui/navigation"
import { TrendingUp, Calendar, DollarSign, Info, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function CreditPage() {
  const [amount, setAmount] = useState(500)
  const [duration, setDuration] = useState(6)

  const monthlyPayment = (amount * 1.05 / duration).toFixed(2)
  const totalPayment = (amount * 1.05).toFixed(2)
  const interest = (amount * 0.05).toFixed(2)

  const activeLoans = [
    {
      id: 1,
      name: "Crédit consommation",
      amount: 2000,
      remaining: 1200,
      nextPayment: 350,
      nextDueDate: "15 jan. 2024",
      status: "active",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <h1 className="text-xl font-semibold text-primary">Crédit</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Simulation */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Simuler un crédit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Montant</label>
                    <span className="text-lg font-bold text-primary tabular-nums">{amount} €</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100 €</span>
                    <span>5 000 €</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Durée</label>
                    <span className="text-lg font-bold text-primary">{duration} mois</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="24"
                    step="1"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>3 mois</span>
                    <span>24 mois</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taux d'intérêt</span>
                  <span className="font-medium text-foreground">5% fixe</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Mensualité</span>
                  <span className="font-bold text-primary tabular-nums">{monthlyPayment} €</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Intérêts totaux</span>
                  <span className="font-medium text-foreground tabular-nums">{interest} €</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-medium text-foreground">Total à rembourser</span>
                  <span className="font-bold text-primary text-lg tabular-nums">{totalPayment} €</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Faire une demande
              </Button>
            </CardContent>
          </Card>

          {/* Active Loans */}
          {activeLoans.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-4">Prêts en cours</h2>
              <div className="space-y-4">
                {activeLoans.map((loan) => (
                  <Card key={loan.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-medium text-foreground">{loan.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Reste à payer: {loan.remaining.toLocaleString()} €
                          </p>
                        </div>
                        <StatusBadge status="active" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Prochaine échéance:</span>
                          <span className="font-medium text-foreground">{loan.nextDueDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Montant:</span>
                          <span className="font-bold text-primary tabular-nums">{loan.nextPayment} €</span>
                        </div>
                        <Button variant="outline" className="w-full" size="sm">
                          Voir l'échéancier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Credit Info */}
          <Card className="shadow-sm bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Comment ça marche ?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Taux fixe de 5% quel que soit le montant et la durée
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Décision instantanée basée sur votre historique
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Remboursement flexible: prélèvement automatique ou manuel
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Pas de frais cachés, aucun frais de dossier
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
