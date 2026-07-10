"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard as CreditCardWidget } from "@/components/shared-assets/credit-card/credit-card"
import { NotificationCenter } from "@/components/ui/notification-center"
import { MobileBottomBar } from "@/components/ui/mobile-bottom-bar"
import { LanguageSelector } from "@/components/ui/language-selector"
import {
  CreditCard, TrendingUp, PiggyBank, Send, Plus, Bell,
  ArrowUpRight, ArrowDownLeft, Eye, Shield, Target, Activity, RefreshCw,
} from "lucide-react"
import UserSidebar from "./components/sidebar"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [kycCompleted, setKycCompleted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [stats, setStats] = useState({
    balance: 2450.0,
    monthlyIncome: 3200.0,
    monthlyExpenses: 750.0,
    savings: 950.0,
    creditLimit: 5000.0,
  })
  const router = useRouter()
  const supabase = createClient()

  const checkUser = async () => {
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

    const { data: documents } = await supabase
      .from("user_documents")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("document_type", "identity")
      .eq("status", "verified")
      .limit(1)

    setKycCompleted(Boolean(documents && documents.length > 0))
    setUser({ ...session.user, profile })
  }

  const loadDashboardData = async () => {
    setLoading(true)
    setTimeout(() => {
      setTransactions([
        { id: 1, type: "transfer", description: "Transfert à Kossi", amount: -50.0, date: "15 janv.", status: "completed" },
        { id: 2, type: "deposit", description: "Salaire reçu", amount: 3200.0, date: "14 janv.", status: "completed" },
        { id: 3, type: "payment", description: "Courses alimentaires", amount: -85.5, date: "14 janv.", status: "completed" },
        { id: 4, type: "savings", description: "Épargne Voyage", amount: -100.0, date: "13 janv.", status: "completed" },
        { id: 5, type: "transfer", description: "Reçu de Marie", amount: 200.0, date: "12 janv.", status: "completed" },
      ])
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    checkUser()
    loadDashboardData()
  }, [])

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0B1F3A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    )
  }

  const firstName = user?.profile?.first_name || user?.email?.split("@")[0] || "Utilisateur"

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <UserSidebar user={user} />

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20 bg-[#F5F7FA]/95 backdrop-blur-md border-b border-border">
        <div className="pl-16 pr-4 py-3 flex items-center justify-between">
          <div className="min-w-0">
            <h1 className="font-semibold text-[#0B1F3A] text-base leading-tight truncate">
              Bonjour {firstName}
            </h1>
            <p className="text-xs text-muted-foreground">
              Bienvenue sur votre espace
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSelector variant="simple" />
            <button
              onClick={() => setShowNotifications(true)}
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center"
            >
              <Bell className="w-4 h-4 text-[#0B1F3A]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E8622C] rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-5 pb-28 md:ml-64 md:px-8 md:py-6 md:pb-6 max-w-6xl">
        {/* Header - Desktop only */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3A]">Tableau de bord</h1>
            <p className="text-muted-foreground">Bonjour, {firstName} </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector variant="simple" />
            <Button variant="outline" size="icon" className="relative" onClick={() => setShowNotifications(true)}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E8622C] rounded-full" />
            </Button>
            <Button variant="outline" onClick={loadDashboardData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
          </div>
        </div>

        {/* KYC Banner */}
        {!kycCompleted && (
          <Card className="border-0 shadow-sm mb-4 md:mb-6 bg-amber-50">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 shrink-0 bg-amber-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-amber-800 text-sm mb-0.5">Vérification d'identité en attente</h3>
                  <p className="text-xs text-amber-700/80 leading-relaxed">
                    Complétez votre KYC pour débloquer toutes les fonctionnalités.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-white">Plus tard</Button>
                <Button
                  size="sm"
                  className="flex-1 md:flex-none bg-[#E8622C] hover:bg-[#D4551F] text-white"
                  onClick={() => router.push("/auth/kyc-upload")}
                >
                  Compléter
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Balance Hero — compact */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#132C52] p-4 md:p-5 mb-4 md:mb-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] text-white/60 mb-0.5">Solde disponible</p>
              <p className="text-2xl md:text-3xl font-bold text-white tabular-nums tracking-tight">
                {stats.balance.toLocaleString("fr-FR")} €
              </p>
            </div>
            <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">+12,5%</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              onClick={() => {}}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Recharger
            </Button>
            <Button
              size="sm"
              className="bg-[#E8622C] hover:bg-[#D4551F] text-white border-0"
              onClick={() => router.push("/dashboard/transferts")}
            >
              <Send className="w-4 h-4 mr-1.5" />
              Transférer
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 md:mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs text-muted-foreground">Revenus</span>
              </div>
              <p className="text-base font-bold text-emerald-600 tabular-nums">
                +{stats.monthlyIncome.toLocaleString("fr-FR")} €
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs text-muted-foreground">Dépenses</span>
              </div>
              <p className="text-base font-bold text-red-500 tabular-nums">
                -{stats.monthlyExpenses.toLocaleString("fr-FR")} €
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <PiggyBank className="w-3.5 h-3.5 text-[#0F766E]" />
                <span className="text-xs text-muted-foreground">Épargne</span>
              </div>
              <p className="text-base font-bold text-[#0F766E] tabular-nums">
                {stats.savings.toLocaleString("fr-FR")} €
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <CreditCard className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs text-muted-foreground">Crédit dispo.</span>
              </div>
              <p className="text-base font-bold text-purple-500 tabular-nums">
                {stats.creditLimit.toLocaleString("fr-FR")} €
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bank Card */}
        <div className="mb-4 md:mb-6 flex justify-center">
          <div className="w-full max-w-sm md:[transform:rotate(-1.5deg)] md:hover:[transform:rotate(0deg)] transition-transform duration-300 drop-shadow-xl">
            <CreditCardWidget
              type="gray-dark"
              company="Corix Finanza"
              cardHolder={`${user?.profile?.first_name?.toUpperCase() || ""} ${user?.profile?.last_name?.toUpperCase() || ""}`.trim() || "UTILISATEUR"}
              cardExpiration="12/28"
              cardNumber="4521 8765 4321 9876"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm mb-4 md:mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {[
                { icon: Send, label: "Transférer", color: "text-blue-500", bg: "bg-blue-500/10" },
                { icon: Plus, label: "Recharger", color: "text-emerald-600", bg: "bg-emerald-500/10" },
                { icon: PiggyBank, label: "Épargner", color: "text-[#0F766E]", bg: "bg-[#0F766E]/10" },
                { icon: CreditCard, label: "Crédit", color: "text-[#E8622C]", bg: "bg-[#E8622C]/10" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl border border-border hover:border-[#0B1F3A]/20 hover:bg-secondary/40 transition-colors"
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${action.bg}`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <span className="text-[11px] md:text-sm font-medium text-center leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            {/* Recent Transactions */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base md:text-lg">Transactions récentes</CardTitle>
                <Button variant="ghost" size="sm" className="text-[#0B1F3A]">Voir tout</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-2.5 px-1 hover:bg-secondary/40 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${
                            transaction.amount > 0 ? "bg-emerald-500/10" : "bg-red-500/10"
                          }`}
                        >
                          {transaction.type === "transfer" && (
                            <Send className={`w-4 h-4 ${transaction.amount > 0 ? "text-emerald-600" : "text-red-500"}`} />
                          )}
                          {transaction.type === "deposit" && <ArrowDownLeft className="w-4 h-4 text-emerald-600" />}
                          {transaction.type === "payment" && <CreditCard className="w-4 h-4 text-red-500" />}
                          {transaction.type === "savings" && <PiggyBank className="w-4 h-4 text-[#0F766E]" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <p
                        className={`font-semibold text-sm tabular-nums shrink-0 ml-2 ${
                          transaction.amount > 0 ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount.toLocaleString("fr-FR")} €
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-6">
            {/* Savings Goals */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Objectifs d'épargne
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Voyage", pct: 65, current: 650, target: 1000, color: "bg-emerald-500" },
                  { label: "Urgences", pct: 30, current: 300, target: 1000, color: "bg-amber-500" },
                  { label: "Projet immobilier", pct: 12, current: 1200, target: 10000, color: "bg-blue-500" },
                ].map((goal) => (
                  <div key={goal.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{goal.label}</span>
                      <span className="font-medium">{goal.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full ${goal.color} rounded-full`} style={{ width: `${goal.pct}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                      {goal.current.toLocaleString("fr-FR")} € / {goal.target.toLocaleString("fr-FR")} €
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel objectif
                </Button>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Vos insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-emerald-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-emerald-700 mb-1">Excellente habitude</p>
                  <p className="text-xs text-emerald-700/70">
                    Vous avez épargné 150 € ce mois-ci, soit 15 % de plus que le mois dernier.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-blue-700 mb-1">📈 Opportunité</p>
                  <p className="text-xs text-blue-700/70">
                    Il vous reste 3 050 € de crédit disponible pour vos projets.
                  </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-amber-700 mb-1">⚠️ Attention</p>
                  <p className="text-xs text-amber-700/70">
                    Vos dépenses en restauration ont augmenté de 25 % ce mois-ci.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>Statut KYC</span>
                    <Badge variant={kycCompleted ? "success" : "warning"}>
                      {kycCompleted ? "Vérifié" : "En attente"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>2FA activé</span>
                    <Badge variant="success">Actif</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Dernière connexion</span>
                    <span className="text-xs text-muted-foreground">Aujourd'hui, 14:30</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    if (!kycCompleted) router.push("/auth/kyc-upload")
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {kycCompleted ? "Renforcer la sécurité" : "Compléter le KYC"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Notifications Overlay */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden">
          <div className="absolute inset-4 top-20">
            <NotificationCenter variant="dropdown" onClose={() => setShowNotifications(false)} />
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <div className="md:hidden">
        <MobileBottomBar userType="client" unreadNotifications={3} unreadMessages={1} />
      </div>
    </div>
  )
}
