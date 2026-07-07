"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Bell, ChevronDown, CreditCard, Plus, Lock, Unlock, AlertCircle, MoreVertical } from "lucide-react"
import { useState } from "react"

export default function AdminCardsPage() {
  const [selectedCard, setSelectedCard] = useState<any>(null)

  const cards = [
    {
      id: 1,
      user: "Marie Diop",
      last4: "4521",
      type: "virtual",
      status: "active",
      expiry: "12/26",
      issuedDate: "15 déc. 2023",
      dailyLimit: 5000,
      monthlyLimit: 10000,
      blocked: false,
    },
    {
      id: 2,
      user: "Kossi Amouzou",
      last4: "7890",
      type: "virtual",
      status: "active",
      expiry: "03/25",
      issuedDate: "10 déc. 2023",
      dailyLimit: 3000,
      monthlyLimit: 5000,
      blocked: false,
    },
    {
      id: 3,
      user: "Jean-Pierre Martin",
      last4: "1234",
      type: "virtual",
      status: "blocked",
      expiry: "09/25",
      issuedDate: "5 déc. 2023",
      dailyLimit: 2000,
      monthlyLimit: 4000,
      blocked: true,
    },
    {
      id: 4,
      user: "Fatou Ndiaye",
      last4: "5678",
      type: "virtual",
      status: "pending",
      expiry: "06/25",
      issuedDate: "6 jan. 2024",
      dailyLimit: 1000,
      monthlyLimit: 2000,
      blocked: false,
    },
  ]

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
          <a href="/admin/credits" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Crédits</span>
          </a>
          <a href="/admin/cards" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/10 text-accent">
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Cartes</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Gestion des cartes</h1>
            <p className="text-muted-foreground">Émission, blocage et litiges</p>
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
          {/* Cards List */}
          <div className="col-span-1 space-y-3">
            {cards.map((card) => (
              <Card
                key={card.id}
                className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  selectedCard?.id === card.id ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setSelectedCard(card)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{card.user}</p>
                      <p className="text-xs text-muted-foreground">•••• {card.last4}</p>
                    </div>
                    <StatusBadge status={card.status as any} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{card.type}</span>
                    {card.blocked && (
                      <span className="text-xs text-destructive flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Bloquée
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Card Detail */}
          {selectedCard && (
            <div className="col-span-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Carte •••• {selectedCard.last4}</CardTitle>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Card Info */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Informations de la carte</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Titulaire</p>
                        <p className="font-medium">{selectedCard.user}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{selectedCard.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expiration</p>
                        <p className="font-medium">{selectedCard.expiry}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date d'émission</p>
                        <p className="font-medium">{selectedCard.issuedDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Limits */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Limites</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Limite journalière</p>
                        <p className="font-medium tabular-nums">{selectedCard.dailyLimit.toLocaleString()} €</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Limite mensuelle</p>
                        <p className="font-medium tabular-nums">{selectedCard.monthlyLimit.toLocaleString()} €</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={selectedCard.blocked ? "outline" : "destructive"}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {selectedCard.blocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        {selectedCard.blocked ? "Débloquer" : "Bloquer"} la carte
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Signaler litige
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Modifier limites
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Voir transactions
                      </Button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Activité récente</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm">
                        <div>
                          <p className="font-medium text-foreground">Achat Supermarché</p>
                          <p className="text-xs text-muted-foreground">Aujourd'hui, 14:30</p>
                        </div>
                        <p className="font-medium text-destructive tabular-nums">-85,50 €</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm">
                        <div>
                          <p className="font-medium text-foreground">Amazon</p>
                          <p className="text-xs text-muted-foreground">Hier, 09:15</p>
                        </div>
                        <p className="font-medium text-destructive tabular-nums">-45,99 €</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!selectedCard && (
            <div className="col-span-2 flex items-center justify-center">
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Sélectionnez une carte pour voir les détails</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* New Card Button */}
        <div className="mt-6">
          <Button size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Émettre une nouvelle carte
          </Button>
        </div>
      </main>
    </div>
  )
}
