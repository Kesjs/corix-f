"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Bell, ChevronDown, TrendingUp, AlertCircle, Check, X } from "lucide-react"
import { useState } from "react"

export default function AdminCreditsPage() {
  const [selectedCredit, setSelectedCredit] = useState<any>(null)

  const creditRequests = [
    {
      id: 1,
      name: "Kossi Amouzou",
      amount: 2000,
      duration: 12,
      monthlyPayment: 175,
      score: "good",
      date: "5 jan. 2024",
      status: "pending",
      purpose: "Expansion entreprise",
      income: 5000,
    },
    {
      id: 2,
      name: "Marie Diop",
      amount: 500,
      duration: 6,
      monthlyPayment: 87.5,
      score: "medium",
      date: "4 jan. 2024",
      status: "pending",
      purpose: "Achat matériel",
      income: 1500,
    },
    {
      id: 3,
      name: "Jean-Pierre Martin",
      amount: 3000,
      duration: 24,
      monthlyPayment: 131.25,
      score: "low",
      date: "3 jan. 2024",
      status: "pending",
      purpose: "Travaux maison",
      income: 2000,
    },
  ]

  const getScoreColor = (score: string) => {
    switch (score) {
      case "good": return "bg-success/10 text-success"
      case "medium": return "bg-warning/10 text-warning"
      case "low": return "bg-destructive/10 text-destructive"
      default: return "bg-secondary text-secondary-foreground"
    }
  }

  const getScoreLabel = (score: string) => {
    switch (score) {
      case "good": return "Faible risque"
      case "medium": return "Risque modéré"
      case "low": return "Risque élevé"
      default: return "Non évalué"
    }
  }

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
          <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Vue d'ensemble</span>
          </a>
          <a href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Utilisateurs</span>
          </a>
          <a href="/admin/kyc" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Validation KYC</span>
          </a>
          <a href="/admin/transactions" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Transactions</span>
          </a>
          <a href="/admin/credits" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/10 text-accent">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Crédits</span>
            <span className="ml-auto bg-accent text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Gestion des crédits</h1>
            <p className="text-muted-foreground">Demandes en cours et scoring</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-input rounded-lg bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            </div>
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
          {/* Credit List */}
          <div className="col-span-1 space-y-3">
            {creditRequests.map((request) => (
              <Card
                key={request.id}
                className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  selectedCredit?.id === request.id ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setSelectedCredit(request)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{request.name}</p>
                      <p className="text-lg font-bold text-primary tabular-nums">{request.amount.toLocaleString()} €</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getScoreColor(request.score)}`}>
                      {getScoreLabel(request.score)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{request.duration} mois</span>
                    <StatusBadge status="pending" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Credit Detail */}
          {selectedCredit && (
            <div className="col-span-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Demande de crédit - {selectedCredit.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Credit Details */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Détails du crédit</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Montant demandé</p>
                        <p className="font-bold text-primary text-lg tabular-nums">{selectedCredit.amount.toLocaleString()} €</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Durée</p>
                        <p className="font-medium">{selectedCredit.duration} mois</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mensualité</p>
                        <p className="font-medium tabular-nums">{selectedCredit.monthlyPayment} €</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total à rembourser</p>
                        <p className="font-medium tabular-nums">{(selectedCredit.amount * 1.05).toLocaleString()} €</p>
                      </div>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Objet du crédit</h3>
                    <p className="text-sm text-muted-foreground">{selectedCredit.purpose}</p>
                  </div>

                  {/* Financial Info */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Situation financière</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Revenus mensuels</p>
                        <p className="font-medium tabular-nums">{selectedCredit.income.toLocaleString()} €</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ratio d'endettement</p>
                        <p className="font-medium tabular-nums">{((selectedCredit.monthlyPayment / selectedCredit.income) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Scoring */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Évaluation du risque</h3>
                    <div className="flex items-center gap-4">
                      <div className={`flex-1 p-4 rounded-xl ${getScoreColor(selectedCredit.score)}`}>
                        <p className="font-medium">{getScoreLabel(selectedCredit.score)}</p>
                        <p className="text-xs opacity-80 mt-1">Score automatique</p>
                      </div>
                      <div className="flex-1 p-4 bg-secondary/50 rounded-xl">
                        <p className="font-medium text-foreground">Recommandation IA</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedCredit.score === "good" && "Approuver - Profil solide"}
                          {selectedCredit.score === "medium" && "Analyse manuelle recommandée"}
                          {selectedCredit.score === "low" && "Refuser - Risque élevé"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Justification */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Justification de la décision (obligatoire)</label>
                    <textarea
                      placeholder="Expliquez votre décision..."
                      className="w-full h-24 px-4 py-3 border border-input rounded-xl bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="flex-1" size="lg">
                      <Check className="w-5 h-5 mr-2" />
                      Approuver
                    </Button>
                    <Button variant="outline" className="flex-1" size="lg">
                      <X className="w-5 h-5 mr-2" />
                      Refuser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!selectedCredit && (
            <div className="col-span-2 flex items-center justify-center">
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Sélectionnez une demande pour voir les détails</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
