"use client"

import { useState } from "react"
import { MobileBottomBar } from "@/components/ui/mobile-bottom-bar"
import { CreditCard as CreditCardWidget } from "@/components/shared-assets/credit-card/credit-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Lock, Settings, ArrowUpRight, Copy, Check } from "lucide-react"

export default function CartesPage() {
  const [showDetails, setShowDetails] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const cardData = {
    number: "4521 8765 4321 9876",
    holder: "BON KENNEDY",
    expiration: "12/28",
    cvv: "123",
  }

  return (
    <div className="p-6 pb-28 md:pb-6 max-w-2xl mx-auto md:mx-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Mes cartes</h1>
        <p className="text-sm text-muted-foreground">Gérez votre carte virtuelle Corix Finanza</p>
      </div>

      <div className="mb-6 flex justify-center md:justify-start">
        <div className="w-full max-w-sm">
          <CreditCardWidget
            type="gray-dark"
            company="Corix Finanza"
            cardHolder={cardData.holder}
            cardExpiration={cardData.expiration}
            cardNumber={cardData.number}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Badge variant="success">Active</Badge>
        <Badge variant="outline">Virtuelle</Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Button
          variant="outline"
          className="flex flex-col h-auto py-3 gap-1.5"
          onClick={() => setShowDetails((v) => !v)}
        >
          {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span className="text-xs">{showDetails ? "Masquer" : "Voir détails"}</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-3 gap-1.5">
          <Lock className="w-4 h-4" />
          <span className="text-xs">Bloquer</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-3 gap-1.5">
          <Settings className="w-4 h-4" />
          <span className="text-xs">Paramètres</span>
        </Button>
      </div>

      {/* Détails sensibles — affichés seulement au clic */}
      {showDetails && (
        <Card className="border border-border shadow-none mb-6">
          <CardContent className="p-4 space-y-4">
            {[
              { label: "Numéro complet", value: cardData.number, key: "number" },
              { label: "CVV", value: cardData.cvv, key: "cvv" },
              { label: "Expiration", value: cardData.expiration, key: "expiration" },
            ].map((field) => (
              <div key={field.key} className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{field.label}</p>
                  <p className="font-mono text-sm font-medium tracking-wider">{field.value}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(field.value)
                    setCopiedField(field.key)
                    setTimeout(() => setCopiedField(null), 1500)
                  }}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary/60 transition-colors shrink-0"
                  aria-label={`Copier ${field.label}`}
                >
                  {copiedField === field.key ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium">Virtuelle</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Limite mensuelle</span>
            <span className="font-medium">2 000 €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Paiements en ligne</span>
            <Badge variant="success">Activés</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Transactions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {[
              { label: "Courses alimentaires", amount: -85.5, date: "14 janv." },
              { label: "Abonnement Netflix", amount: -12.99, date: "12 janv." },
              { label: "Restaurant", amount: -34.0, date: "10 janv." },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
                <p className="font-semibold text-sm text-red-500 tabular-nums">
                  {t.amount.toLocaleString("fr-FR")} €
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="md:hidden">
        <MobileBottomBar userType="client" unreadNotifications={3} unreadMessages={1} />
      </div>
    </div>
  )
}
