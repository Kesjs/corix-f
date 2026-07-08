"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { Search, Plus, User, QrCode, Building2 } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function TransfertsPage() {
  const [amount, setAmount] = useState("")
  const [selectedContact, setSelectedContact] = useState<number | null>(null)
  const { t } = useLanguage()

  const recentContacts = [
    { id: 1, name: "Kossi A.", phone: "+221 77 123 45 67", avatar: "K" },
    { id: 2, name: "Marie D.", phone: "+221 78 234 56 78", avatar: "M" },
    { id: 3, name: "Jean-Pierre M.", phone: "+221 76 345 67 89", avatar: "J" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <h1 className="text-xl font-semibold text-primary">Transferts</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={t("placeholder.searchContact")}
              className="pl-10"
            />
          </div>

          {/* Recent Contacts */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">Contacts récents</h2>
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                    selectedContact === contact.id ? "ring-2 ring-accent" : ""
                  }`}
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary">{contact.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* New Beneficiary */}
          <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Nouveau bénéficiaire</p>
                  <p className="text-sm text-muted-foreground">Ajouter un nouveau contact</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Options */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground text-sm">Scanner QR</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground text-sm">Vers banque</p>
              </CardContent>
            </Card>
          </div>

          {/* Amount Input */}
          {selectedContact && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Montant du transfert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Montant (€)</label>
                  <Input
                    type="number"
                    placeholder={t("placeholder.amount")}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-bold text-center h-16"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frais (1%)</span>
                  <span className="font-medium text-foreground">
                    {amount ? (parseFloat(amount) * 0.01).toFixed(2) : "0,00"} €
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-primary">
                    {amount ? (parseFloat(amount) * 1.01).toFixed(2) : "0,00"} €
                  </span>
                </div>
                <Button className="w-full" size="lg" disabled={!amount}>
                  Continuer
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
