"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard, TrendingUp, PiggyBank, Send, Plus, Bell, ChevronDown,
  DollarSign, ArrowUpRight, ArrowDownLeft, Eye, MoreVertical,
  Calendar, Shield, Wallet, Target, Activity, RefreshCw
} from "lucide-react"
import UserSidebar from "./components/sidebar"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [stats, setStats] = useState({
    balance: 2450.00,
    monthlyIncome: 3200.00,
    monthlyExpenses: 750.00,
    savings: 950.00,
    creditLimit: 5000.00
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
    loadDashboardData()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth/login')
      return
    }
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    setUser({
      ...session.user,
      profile
    })
  }

  const loadDashboardData = async () => {
    setLoading(true)
    
    // Simuler le chargement des données
    setTimeout(() => {
      setTransactions([
        { id: 1, type: 'transfer', description: 'Transfert à Kossi', amount: -50.00, date: '2024-01-15', status: 'completed' },
        { id: 2, type: 'deposit', description: 'Salaire reçu', amount: 3200.00, date: '2024-01-14', status: 'completed' },
        { id: 3, type: 'payment', description: 'Courses alimentaires', amount: -85.50, date: '2024-01-14', status: 'completed' },
        { id: 4, type: 'savings', description: 'Épargne Voyage', amount: -100.00, date: '2024-01-13', status: 'completed' },
        { id: 5, type: 'transfer', description: 'Reçu de Marie', amount: 200.00, date: '2024-01-12', status: 'completed' },
        { id: 6, type: 'payment', description: 'Abonnement Internet', amount: -45.00, date: '2024-01-11', status: 'completed' }
      ])
      setLoading(false)
    }, 1000)
  }

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar user={user} />
      
      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bonjour, {user?.profile?.first_name || user?.email?.split('@')[0] || 'Utilisateur'} 👋
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Button variant="outline" onClick={loadDashboardData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Balance Overview */}
        <Card className="shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Solde disponible</p>
                <p className="text-3xl font-bold text-primary tabular-nums">
                  {stats.balance.toLocaleString()} €
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="success">+12.5% ce mois</Badge>
                  <span className="text-sm text-muted-foreground">vs mois dernier</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Recharger
                </Button>
                <Button variant="default">
                  <Send className="w-4 h-4 mr-2" />
                  Transférer
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownLeft className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Revenus</span>
                </div>
                <p className="text-lg font-bold text-success">+{stats.monthlyIncome.toLocaleString()} €</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-muted-foreground">Dépenses</span>
                </div>
                <p className="text-lg font-bold text-destructive">-{stats.monthlyExpenses.toLocaleString()} €</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Épargne</span>
                </div>
                <p className="text-lg font-bold text-blue-500">{stats.savings.toLocaleString()} €</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">Crédit disponible</span>
                </div>
                <p className="text-lg font-bold text-purple-500">{stats.creditLimit.toLocaleString()} €</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Quick Actions and Cards */}
          <div className="col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Send className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium">Transférer</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Plus className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">Recharger</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <PiggyBank className="w-6 h-6 text-purple-500" />
                    </div>
                    <span className="text-sm font-medium">Épargner</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-amber-500" />
                    </div>
                    <span className="text-sm font-medium">Demander crédit</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Virtual Card */}
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">C</span>
                    </div>
                    <span className="font-medium">Corix Finanza</span>
                  </div>
                  <CreditCard className="w-6 h-6 opacity-80" />
                </div>
                <p className="text-2xl font-mono tracking-wider mb-6">•••• •••• •••• 4521</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-70">Titulaire</p>
                    <p className="text-sm font-medium">
                      {user?.profile?.first_name?.toUpperCase() || user?.email?.split('@')[0]?.toUpperCase() || 'UTILISATEUR'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Expiration</p>
                    <p className="text-sm font-medium">12/26</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">CVV</p>
                    <p className="text-sm font-mono">•••</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Transactions récentes</CardTitle>
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-success/10' : 'bg-destructive/10'
                        }`}>
                          {transaction.type === 'transfer' && (
                            <Send className={`w-5 h-5 ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`} />
                          )}
                          {transaction.type === 'deposit' && (
                            <ArrowDownLeft className="w-5 h-5 text-success" />
                          )}
                          {transaction.type === 'payment' && (
                            <CreditCard className="w-5 h-5 text-destructive" />
                          )}
                          {transaction.type === 'savings' && (
                            <PiggyBank className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className={`font-bold tabular-nums ${
                          transaction.amount > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} €
                        </p>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Goals and Insights */}
          <div className="space-y-6">
            {/* Savings Goals */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Objectifs d'épargne
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Voyage</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: '65%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">650 € / 1 000 €</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Urgences</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: '30%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">300 € / 1 000 €</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Projet immobilier</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '12%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">1 200 € / 10 000 €</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel objectif
                </Button>
              </CardContent>
            </Card>

            {/* Financial Insights */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Vos insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-success mb-1">💪 Excellente habitude</p>
                  <p className="text-xs text-muted-foreground">
                    Vous avez épargné 150€ ce mois-ci, soit 15% de plus que le mois dernier.
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-500 mb-1">📈 Opportunité</p>
                  <p className="text-xs text-muted-foreground">
                    Vous avez encore 3 050€ de crédit disponible pour vos projets.
                  </p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-amber-500 mb-1">⚠️ Attention</p>
                  <p className="text-xs text-muted-foreground">
                    Votre dépense en restauration a augmenté de 25% ce mois-ci.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Statut KYC</span>
                    <Badge variant="success">Vérifié</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2FA activé</span>
                    <Badge variant="success">Actif</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dernière connexion</span>
                    <span className="text-xs text-muted-foreground">Aujourd'hui, 14:30</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Shield className="w-4 h-4 mr-2" />
                  Renforcer la sécurité
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}