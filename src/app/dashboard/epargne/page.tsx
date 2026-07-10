"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { ActionDialog } from "@/components/ui/action-dialog"
import {
  Plus, PiggyBank, TrendingUp, Trash2, Edit2,
  Plane, HeartPulse, Car, Home, GraduationCap, Gift,
} from "lucide-react"

type IconKey = "plane" | "health" | "car" | "home" | "study" | "gift"
type ColorKey = "emerald" | "amber" | "blue" | "purple"

interface Goal {
  id: number
  name: string
  target: number
  current: number
  icon: IconKey
  color: ColorKey
}

const iconMap: Record<IconKey, typeof Plane> = {
  plane: Plane, health: HeartPulse, car: Car, home: Home, study: GraduationCap, gift: Gift,
}

const colorMap: Record<ColorKey, { bar: string; bg: string; text: string }> = {
  emerald: { bar: "bg-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-600" },
  amber: { bar: "bg-amber-500", bg: "bg-amber-500/10", text: "text-amber-600" },
  blue: { bar: "bg-blue-500", bg: "bg-blue-500/10", text: "text-blue-600" },
  purple: { bar: "bg-purple-500", bg: "bg-purple-500/10", text: "text-purple-600" },
}

const iconOptions: { key: IconKey; label: string }[] = [
  { key: "plane", label: "Voyage" },
  { key: "health", label: "Santé" },
  { key: "car", label: "Véhicule" },
  { key: "home", label: "Immobilier" },
  { key: "study", label: "Études" },
  { key: "gift", label: "Autre" },
]

const colorOptions: ColorKey[] = ["emerald", "amber", "blue", "purple"]

interface Deposit {
  id: number
  goalName: string
  amount: number
  date: string
}

export default function EpargnePage() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: "Voyage", target: 1000, current: 650, icon: "plane", color: "emerald" },
    { id: 2, name: "Urgences", target: 1000, current: 300, icon: "health", color: "amber" },
    { id: 3, name: "Voiture", target: 5000, current: 1200, icon: "car", color: "blue" },
  ])

  const [deposits, setDeposits] = useState<Deposit[]>([
    { id: 1, goalName: "Voyage", amount: 100, date: "Aujourd'hui, 10:00" },
    { id: 2, goalName: "Urgences", amount: 50, date: "Hier, 14:30" },
  ])

  // Dialogs
  const [newGoalDialog, setNewGoalDialog] = useState(false)
  const [editGoalId, setEditGoalId] = useState<number | null>(null)
  const [fundsGoalId, setFundsGoalId] = useState<number | null>(null)
  const [deleteGoalId, setDeleteGoalId] = useState<number | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Form fields (partagés new/edit)
  const [formName, setFormName] = useState("")
  const [formTarget, setFormTarget] = useState("")
  const [formIcon, setFormIcon] = useState<IconKey>("plane")
  const [formColor, setFormColor] = useState<ColorKey>("emerald")
  const [fundsAmount, setFundsAmount] = useState("")

  const totalSaved = goals.reduce((sum, g) => sum + g.current, 0)

  const resetForm = () => {
    setFormName("")
    setFormTarget("")
    setFormIcon("plane")
    setFormColor("emerald")
  }

  const openNewGoalDialog = () => {
    resetForm()
    setNewGoalDialog(true)
  }

  const openEditDialog = (goal: Goal) => {
    setFormName(goal.name)
    setFormTarget(String(goal.target))
    setFormIcon(goal.icon)
    setFormColor(goal.color)
    setEditGoalId(goal.id)
  }

  const handleCreateGoal = () => {
    if (!formName.trim() || !formTarget || Number(formTarget) <= 0) return
    setGoals((prev) => [
      ...prev,
      { id: Date.now(), name: formName.trim(), target: Number(formTarget), current: 0, icon: formIcon, color: formColor },
    ])
    setSuccessMessage(`Objectif "${formName.trim()}" créé avec succès.`)
  }

  const handleEditGoal = () => {
    if (!formName.trim() || !formTarget || Number(formTarget) <= 0 || editGoalId === null) return
    setGoals((prev) =>
      prev.map((g) =>
        g.id === editGoalId
          ? { ...g, name: formName.trim(), target: Number(formTarget), icon: formIcon, color: formColor }
          : g
      )
    )
    setEditGoalId(null)
  }

  const handleAddFunds = () => {
    const value = Number(fundsAmount)
    if (!value || value <= 0 || fundsGoalId === null) return
    const goal = goals.find((g) => g.id === fundsGoalId)
    if (!goal) return

    setGoals((prev) =>
      prev.map((g) => (g.id === fundsGoalId ? { ...g, current: g.current + value } : g))
    )
    setDeposits((prev) => [
      { id: Date.now(), goalName: goal.name, amount: value, date: "À l'instant" },
      ...prev,
    ])
    setFundsAmount("")
    setSuccessMessage(`${value.toLocaleString("fr-FR")} € ajoutés à "${goal.name}".`)
  }

  const handleDeleteGoal = () => {
    if (deleteGoalId === null) return
    setGoals((prev) => prev.filter((g) => g.id !== deleteGoalId))
    setDeleteGoalId(null)
  }

  const currentEditGoal = goals.find((g) => g.id === editGoalId) || null
  const currentFundsGoal = goals.find((g) => g.id === fundsGoalId) || null
  const currentDeleteGoal = goals.find((g) => g.id === deleteGoalId) || null

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">Épargne</h1>
          <Button variant="ghost" size="icon" onClick={openNewGoalDialog}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Total Savings */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total épargné</p>
                  <p className="text-3xl font-bold text-primary tabular-nums">
                    {totalSaved.toLocaleString("fr-FR")} €
                  </p>
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
              <Button size="sm" onClick={openNewGoalDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvel objectif
              </Button>
            </div>

            {goals.length === 0 ? (
              <Card className="shadow-sm">
                <CardContent className="p-6 text-center text-sm text-muted-foreground">
                  Aucun objectif pour le moment. Créez-en un pour commencer à épargner.
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {goals.map((goal) => {
                  const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100))
                  const colors = colorMap[goal.color]
                  const GoalIcon = iconMap[goal.icon]
                  return (
                    <Card key={goal.id} className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors.bg}`}>
                              <GoalIcon className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div>
                              <CardTitle className="text-base">{goal.name}</CardTitle>
                              <p className="text-xs text-muted-foreground">{percentage}% atteint</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEditDialog(goal)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => setDeleteGoalId(goal.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors.bar} rounded-full transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {goal.current.toLocaleString("fr-FR")} €
                          </span>
                          <span className="font-medium text-foreground">
                            {goal.target.toLocaleString("fr-FR")} €
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          size="sm"
                          onClick={() => {
                            setFundsAmount("")
                            setFundsGoalId(goal.id)
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter des fonds
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
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
            {deposits.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun dépôt pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {deposits.map((deposit) => (
                  <Card key={deposit.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                            <PiggyBank className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{deposit.goalName}</p>
                            <p className="text-xs text-muted-foreground">{deposit.date}</p>
                          </div>
                        </div>
                        <p className="font-medium text-success tabular-nums">
                          +{deposit.amount.toLocaleString("fr-FR")} €
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Dialog: Nouvel objectif */}
      <ActionDialog
        open={newGoalDialog}
        onOpenChange={setNewGoalDialog}
        icon={Plus}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-500/10"
        title="Nouvel objectif"
        confirmLabel="Créer"
        confirmDisabled={!formName.trim() || !formTarget || Number(formTarget) <= 0}
        onConfirm={handleCreateGoal}
        showCancel
      >
        <GoalForm
          name={formName} setName={setFormName}
          target={formTarget} setTarget={setFormTarget}
          icon={formIcon} setIcon={setFormIcon}
          color={formColor} setColor={setFormColor}
        />
      </ActionDialog>

      {/* Dialog: Modifier objectif */}
      <ActionDialog
        open={editGoalId !== null}
        onOpenChange={(o) => !o && setEditGoalId(null)}
        icon={Edit2}
        title={`Modifier "${currentEditGoal?.name || ""}"`}
        confirmLabel="Enregistrer"
        confirmDisabled={!formName.trim() || !formTarget || Number(formTarget) <= 0}
        onConfirm={handleEditGoal}
        showCancel
      >
        <GoalForm
          name={formName} setName={setFormName}
          target={formTarget} setTarget={setFormTarget}
          icon={formIcon} setIcon={setFormIcon}
          color={formColor} setColor={setFormColor}
        />
      </ActionDialog>

      {/* Dialog: Ajouter des fonds */}
      <ActionDialog
        open={fundsGoalId !== null}
        onOpenChange={(o) => !o && setFundsGoalId(null)}
        icon={PiggyBank}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-500/10"
        title={`Ajouter des fonds — ${currentFundsGoal?.name || ""}`}
        confirmLabel="Ajouter"
        confirmDisabled={!fundsAmount || Number(fundsAmount) <= 0}
        onConfirm={handleAddFunds}
        showCancel
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Montant à ajouter</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={fundsAmount}
              onChange={(e) => setFundsAmount(e.target.value)}
              placeholder="0"
              className="w-full h-11 px-3 pr-8 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E8622C]/30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
          </div>
        </div>
      </ActionDialog>

      {/* Dialog: Suppression */}
      <ActionDialog
        open={deleteGoalId !== null}
        onOpenChange={(o) => !o && setDeleteGoalId(null)}
        icon={Trash2}
        iconColor="text-red-600"
        iconBg="bg-red-500/10"
        title="Supprimer cet objectif ?"
        description={`"${currentDeleteGoal?.name || ""}" sera définitivement supprimé, avec les ${currentDeleteGoal?.current.toLocaleString("fr-FR") || 0} € associés.`}
        confirmLabel="Supprimer"
        confirmVariant="destructive"
        onConfirm={handleDeleteGoal}
        showCancel
      />

      {/* Dialog: Succès */}
      <ActionDialog
        open={successMessage !== null}
        onOpenChange={(o) => !o && setSuccessMessage(null)}
        icon={PiggyBank}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-500/10"
        title="Succès"
        description={successMessage || ""}
      />
    </div>
  )
}

// Sous-composant : formulaire partagé création/édition d'objectif
function GoalForm({
  name, setName, target, setTarget, icon, setIcon, color, setColor,
}: {
  name: string; setName: (v: string) => void
  target: string; setTarget: (v: string) => void
  icon: IconKey; setIcon: (v: IconKey) => void
  color: ColorKey; setColor: (v: ColorKey) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Nom de l'objectif</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Voyage au Japon"
          className="w-full h-11 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E8622C]/30"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Montant cible</label>
        <div className="relative">
          <input
            type="number"
            min="1"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="1000"
            className="w-full h-11 px-3 pr-8 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E8622C]/30"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Icône</label>
        <div className="grid grid-cols-6 gap-2">
          {iconOptions.map((opt) => {
            const OptIcon = iconMap[opt.key]
            const selected = icon === opt.key
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setIcon(opt.key)}
                className={`h-11 rounded-xl border flex items-center justify-center transition-colors ${
                  selected ? "border-[#E8622C] bg-[#E8622C]/10" : "border-border hover:bg-secondary/40"
                }`}
                aria-label={opt.label}
              >
                <OptIcon className={`w-4 h-4 ${selected ? "text-[#E8622C]" : "text-muted-foreground"}`} />
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Couleur</label>
        <div className="flex gap-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full ${colorMap[c].bar} ${
                color === c ? "ring-2 ring-offset-2 ring-[#0B1F3A]" : ""
              }`}
              aria-label={c}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
