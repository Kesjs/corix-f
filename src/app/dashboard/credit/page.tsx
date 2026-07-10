"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ActionDialog } from "@/components/ui/action-dialog"
import { TrendingUp, Calendar, DollarSign, Info, CheckCircle2, Send } from "lucide-react"

export default function CreditPage() {
  const [amount, setAmount] = useState(500)
  const [duration, setDuration] = useState(6)
  const [requestDialog, setRequestDialog] = useState(false)
  const [scheduleDialog, setScheduleDialog] = useState(false)

  const monthlyPayment = ((amount * 1.05) / duration).toFixed(2)
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
      status: "Actif",
    },
  ]

  return (
    <div className="p-6 pb-28 md:pb-6 max-w-2xl mx-auto md:mx-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Crédit</h1>
        <p className="text-sm text-muted-foreground">Simulez et gérez vos crédits Corix Finanza</p>
      </div>

      <div className="space-y-6">
        {/* Simulation */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Simuler un crédit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Montant</label>
                  <span className="text-lg font-bold text-[#0B1F3A] tabular-nums">{amount} €</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#E8622C]"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100 €</span>
                  <span>5 000 €</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Durée</label>
                  <span className="text-lg font-bold text-[#0B1F3A]">{duration} mois</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="24"
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#E8622C]"
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
                <span className="font-bold text-[#0B1F3A] tabular-nums">{monthlyPayment} €</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Intérêts totaux</span>
                <span className="font-medium text-foreground tabular-nums">{interest} €</span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-medium text-foreground">Total à rembourser</span>
                <span className="font-bold text-[#0B1F3A] text-lg tabular-nums">{totalPayment} €</span>
              </div>
            </div>

            <Button
              className="w-full bg-[#E8622C] hover:bg-[#D4551F] text-white active:scale-95 transition-transform"
              size="lg"
              onClick={() => setRequestDialog(true)}
            >
              Faire une demande
            </Button>
          </CardContent>
        </Card>

        {/* Active Loans */}
        {activeLoans.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-[#0B1F3A] mb-4">Prêts en cours</h2>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <Card key={loan.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-medium text-foreground">{loan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Reste à payer : {loan.remaining.toLocaleString("fr-FR")} €
                        </p>
                      </div>
                      <Badge variant="success">{loan.status}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Prochaine échéance :</span>
                        <span className="font-medium text-foreground">{loan.nextDueDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Montant :</span>
                        <span className="font-bold text-[#0B1F3A] tabular-nums">{loan.nextPayment} €</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full active:scale-95 transition-transform"
                        size="sm"
                        onClick={() => setScheduleDialog(true)}
                      >
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
        <Card className="border-0 shadow-sm bg-[#0B1F3A]/5">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-5 h-5 text-[#0B1F3A]" />
              <CardTitle className="text-base">Comment ça marche ?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Taux fixe de 5% quel que soit le montant et la durée",
              "Décision instantanée basée sur votre historique",
              "Remboursement flexible : prélèvement automatique ou manuel",
              "Pas de frais cachés, aucun frais de dossier",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ActionDialog
        open={requestDialog}
        onOpenChange={setRequestDialog}
        icon={Send}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-500/10"
        title="Demande envoyée"
        description={`Votre demande de crédit de ${amount} € sur ${duration} mois a été transmise. Vous recevrez une réponse instantanée.`}
      />

      <ActionDialog
        open={scheduleDialog}
        onOpenChange={setScheduleDialog}
        icon={Calendar}
        title="Échéancier détaillé"
        description="La vue détaillée de l'échéancier (historique complet des paiements) arrive bientôt."
      />
    </div>
  )
}
