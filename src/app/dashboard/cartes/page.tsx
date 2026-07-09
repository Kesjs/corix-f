"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BankCard } from "@/components/ui/bank-card"
import { Navigation } from "@/components/ui/navigation"
import { Plus, Settings } from "lucide-react"

export default function CartesPage() {
  const [user, setUser] = useState<any>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/auth/login")
        return
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()
      setUser({ ...session.user, profile })
    }
    loadUser()
  }, [])

  const holderName =
    `${user?.profile?.first_name?.toUpperCase() || ""} ${user?.profile?.last_name?.[0]?.toUpperCase() || ""}.`.trim() ||
    "UTILISATEUR"

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">Mes cartes</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <BankCard
            cardNumber="4521 8765 4321 9876"
            holderName={holderName}
            expiryDate="12/28"
            cvv="123"
            balance={2450.0}
    
            isVirtual={true}
            isBlocked={isBlocked}

          />

          <div className="grid grid-cols-1">
            <Button
              variant={isBlocked ? "outline" : "destructive"}
              className="flex items-center gap-2"
              onClick={() => setIsBlocked(!isBlocked)}
            >
              {isBlocked ? "Débloquer la carte" : "Bloquer la carte"}
            </Button>
          </div>

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

          <Button className="w-full" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Demander une nouvelle carte
          </Button>
        </div>
      </main>
    </div>
  )
}
