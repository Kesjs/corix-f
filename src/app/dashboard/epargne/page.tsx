"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { Plus, PiggyBank, Target, Calendar, TrendingUp, Trash2, Edit2 } from "lucide-react"

export default function EpargnePage() {
  const savingsGoals = [
    {
      id: 1,
      name: "Voyage",
      target: 1000,
      current: 650,
      icon: "✈️",
      color: "success",
    },
    {
      id: 2,
      name: "Urgences",
      target: 1000,
      current: 300,
      icon: "🏥",
      color: "warning",
    },
    {
      id: 3,
      name: "Voiture",
      target: 5000,
      current: 1200,
      icon: "🚗",
      color: "primary",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">Épargne</h1>
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Total Savings */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total épargné</p>
                  <p className="text-3xl font-bold text-primary tabular-nums">2 150,00 €</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Goals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary">Mes objectifs</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouvel objectif
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {savingsGoals.map((goal) => {
                const percentage = Math.round((goal.current / goal.target) * 100)
                return (
                  <Card key={goal.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl">
                            {goal.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base">{goal.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {percentage}% atteint
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${goal.color} rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {goal.current.toLocaleString()} €
                        </span>
                        <span className="font-medium text-foreground">
                          {goal.target.toLocaleString()} €
                        </span>
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter des fonds
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Savings Tips */}
          <Card className="shadow-sm bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Conseil du jour</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Activez le virement automatique pour atteindre vos objectifs plus rapidement. 
                Même 50€ par mois peut faire une grande différence !
              </p>
            </CardContent>
          </Card>

          {/* Recent Deposits */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">Derniers dépôts</h2>
            <div className="space-y-3">
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <PiggyBank className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Voyage</p>
                        <p className="text-xs text-muted-foreground">Aujourd'hui, 10:00</p>
                      </div>
                    </div>
                    <p className="font-medium text-success tabular-nums">+100,00 €</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <PiggyBank className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Urgences</p>
                        <p className="text-xs text-muted-foreground">Hier, 14:30</p>
                      </div>
                    </div>
                    <p className="font-medium text-success tabular-nums">+50,00 €</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
