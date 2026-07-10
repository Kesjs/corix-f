"use client"

import { CreditCard as CreditCardWidget } from "@/components/shared-assets/credit-card/credit-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Lock, Settings, ArrowUpRight, ArrowDownLeft, Send } from "lucide-react"

export default function CartesPage() {
  return (
    <div className="p-6 pb-28 md:pb-6 max-w-2xl mx-auto md:mx-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Mes cartes</h1>
        <p className="text-sm text-muted-foreground">Gérez votre carte virtuelle Corix Finanza</p>
      </div>

      {/* Carte */}
      
<div className="mb-6 flex justify-center md:justify-start">
  <div className="w-full max-w-sm">
    <CreditCardWidget
      type="gray-dark"
      company="Corix Finanza"
      cardHolder="BON KENNEDY"
      cardExpiration="12/28"
      cardNumber="4521 8765 4321 9876"
    />
  </div>
</div>


      {/* Statut */}
      <div className="flex items-center gap-2 mb-6">
        <Badge variant="success">Active</Badge>
        <Badge variant="outline">Virtuelle</Badge>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Button variant="outline" className="flex flex-col h-auto py-3 gap-1.5">
          <Eye className="w-4 h-4" />
          <span className="text-xs">Voir détails</span>
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

      {/* Infos carte */}
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

      {/* Transactions récentes de la carte */}
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
    </div>
  )
}
