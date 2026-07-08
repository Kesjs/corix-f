"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BankCard } from "@/components/ui/bank-card"
import { NotificationCenter } from "@/components/ui/notification-center"
import { MobileBottomBar } from "@/components/ui/mobile-bottom-bar"
import { LanguageSelector } from "@/components/ui/language-selector"
import {
  CreditCard, TrendingUp, PiggyBank, Send, Plus, Bell, ChevronDown,
  DollarSign, ArrowUpRight, ArrowDownLeft, Eye, MoreVertical,
  Calendar, Shield, Wallet, Target, Activity, RefreshCw, Globe,
  MessageCircle, Zap, Star, TrendingDown
} from "lucide-react"
import UserSidebar from "./components/sidebar"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [kycCompleted, setKycCompleted] = useState(false) // État KYC
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [stats, setStats] = useState({
    balance: 2450.00,
    monthlyIncome: 3200.00,
    monthlyExpenses: 750.00,
    savings: 950.00,
    creditLimit: 5000.00
  })
  const router = useRouter()
  const supabase = createClient()

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
    
    // Vérifier si le KYC est complété (existence d'un document uploadé)
    const { data: documents } = await supabase
      .from('user_documents')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('document_type', 'identity')
      .eq('status', 'verified')
      .limit(1)
    
    setKycCompleted(Boolean(documents && documents.length > 0))
    
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

  useEffect(() => {
    checkUser()
    loadDashboardData()
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="md:ml-0 sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">C</span>
                </div>
                <div>
                  <h1 className="font-bold text-primary">
                    Bonjour {user?.profile?.first_name || user?.email?.split('@')[0] || 'Utilisateur'}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {stats.balance.toLocaleString()} € disponible
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSelector variant="simple" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={() => setShowNotifications(true)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className={`${isMobile ? 'px-4 py-6 pb-20' : 'ml-64 p-6'}`}>
        {/* Header - Desktop Only */}
        {!isMobile && (
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-primary">Tableau de bord</h1>
              <p className="text-muted-foreground">
                Bonjour, {user?.profile?.first_name || user?.email?.split('@')[0] || 'Utilisateur'} 👋
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector variant="simple" />
              <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              </Button>
              <Button variant="outline" onClick={loadDashboardData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>
          </div>
        )}

        {/* KYC Notification */}
        {!kycCompleted && (
          <Card className="bg-amber-500/10 border border-amber-500/20 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-amber-700 mb-1">Vérification d'identité en attente</h3>
                  <p className="text-sm text-amber-600/80">
                    Complétez votre vérification d'identité (KYC) pour débloquer toutes les fonctionnalités de votre compte.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    Plus tard
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => router.push('/auth/kyc-upload')}
                  >
                    Compléter maintenant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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

            {/* Bank Card */}
            <div className="mb-6">
              <BankCard
                cardNumber="4521 8765 4321 9876"
                holderName={`${user?.profile?.first_name?.toUpperCase() || ''} ${user?.profile?.last_name?.toUpperCase() || ''}`.trim() || 'UTILISATEUR'}
                expiryDate="12/28"
                cvv="123"
                balance={stats.balance}
                cardType="visa"
                cardStyle="premium"
                isVirtual={true}
                variant={isMobile ? "compact" : "full"}
              />
            </div>

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
                    <Badge variant={kycCompleted ? "success" : "warning"}>
                      {kycCompleted ? "Vérifié" : "En attente"}
                    </Badge>
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
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => {
                    if (!kycCompleted) {
                      router.push('/auth/kyc-upload')
                    }
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
            <NotificationCenter 
              variant="dropdown"
              onClose={() => setShowNotifications(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <MobileBottomBar 
        userType="client"
        unreadNotifications={3}
        unreadMessages={1}
      />
    </div>
  )
}