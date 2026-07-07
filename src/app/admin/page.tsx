"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, CreditCard, TrendingUp, AlertCircle, Search, Bell, ChevronDown, 
  DollarSign, Shield, FileText, Lock, Home, Briefcase, Mail, Phone,
  Eye, MoreVertical, Download, Filter, RefreshCw, CheckCircle, XCircle,
  BarChart3, PieChart, Activity, Calendar, Clock, UserCheck, UserX
} from "lucide-react"
import AdminSidebar from "./components/sidebar"
import StatCard from "./components/stat-card"
import DataTable from "./components/data-table"
import ChartCard from "./components/chart-card"

interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'pending' | 'inactive'
  joinDate: string
  kycStatus: 'verified' | 'pending'
}

interface KYC {
  id: number
  name: string
  type: string
  submitted: string
  status: 'review' | 'pending'
}

interface Transaction {
  id: number
  user: string
  type: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingKYC: 0,
    totalTransactions: 0,
    transactionVolume: 0,
    activeLoans: 0,
    totalRevenue: 0
  })
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [pendingKYCs, setPendingKYCs] = useState<KYC[]>([])
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    
    // Simuler des données pour l'exemple
    setTimeout(() => {
      setStats({
        totalUsers: 12456,
        activeUsers: 8923,
        pendingKYC: 23,
        totalTransactions: 89432,
        transactionVolume: 1250000,
        activeLoans: 156,
        totalRevenue: 450000
      })

      setRecentUsers([
        { id: 1, name: "Marie Diop", email: "marie@example.com", status: "active", joinDate: "2024-01-15", kycStatus: "verified" },
        { id: 2, name: "Kossi Amouzou", email: "kossi@example.com", status: "active", joinDate: "2024-01-14", kycStatus: "verified" },
        { id: 3, name: "Fatou Ndiaye", email: "fatou@example.com", status: "pending", joinDate: "2024-01-13", kycStatus: "pending" },
        { id: 4, name: "Jean Martin", email: "jean@example.com", status: "active", joinDate: "2024-01-12", kycStatus: "verified" },
        { id: 5, name: "Amina Traoré", email: "amina@example.com", status: "inactive", joinDate: "2024-01-11", kycStatus: "verified" }
      ])

      setPendingKYCs([
        { id: 1, name: "Abdoulaye Sow", type: "Carte d&apos;identité", submitted: "2024-01-15", status: "review" },
        { id: 2, name: "Sofia Camara", type: "Passeport", submitted: "2024-01-14", status: "review" },
        { id: 3, name: "David Koné", type: "Permis de conduire", submitted: "2024-01-14", status: "pending" },
        { id: 4, name: "Chantal Bah", type: "Titre de séjour", submitted: "2024-01-13", status: "review" }
      ])

      setRecentTransactions([
        { id: 1, user: "Marie Diop", type: "Transfert", amount: 150, status: "completed", date: "2024-01-15 14:30" },
        { id: 2, user: "Kossi Amouzou", type: "Retrait", amount: 500, status: "completed", date: "2024-01-15 13:15" },
        { id: 3, user: "Fatou Ndiaye", type: "Dépôt", amount: 1000, status: "pending", date: "2024-01-15 12:00" },
        { id: 4, user: "Jean Martin", type: "Paiement", amount: 85, status: "completed", date: "2024-01-15 11:45" },
        { id: 5, user: "Amina Traoré", type: "Transfert", amount: 200, status: "failed", date: "2024-01-15 10:30" }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'success'
      case 'pending': return 'warning'
      case 'inactive': return 'secondary'
      case 'completed': return 'success'
      case 'failed': return 'destructive'
      case 'review': return 'warning'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Tableau de bord Admin</h1>
            <p className="text-muted-foreground">Vue d&apos;ensemble de l&apos;activité bancaire</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-input rounded-lg bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none w-64"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Button variant="outline" onClick={fetchDashboardData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <div className="flex items-center gap-3 px-4 py-2 border rounded-lg">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="font-bold text-accent">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin</span>
                <span className="text-xs text-muted-foreground">Super Admin</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Utilisateurs totaux"
            value={stats.totalUsers.toLocaleString()}
            change="+12.5%"
            positive={true}
            icon={Users}
            iconColor="text-blue-500"
          />
          <StatCard
            title="Transactions (30j)"
            value={`${(stats.transactionVolume / 1000000).toFixed(1)}M €`}
            change="+8.3%"
            positive={true}
            icon={CreditCard}
            iconColor="text-green-500"
          />
          <StatCard
            title="KYC en attente"
            value={stats.pendingKYC.toString()}
            change="-5"
            positive={true}
            icon={AlertCircle}
            iconColor="text-amber-500"
          />
          <StatCard
            title="Crédits actifs"
            value={stats.activeLoans.toString()}
            change="+3"
            positive={false}
            icon={TrendingUp}
            iconColor="text-purple-500"
          />
        </div>

        {/* Charts and Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <ChartCard
              title="Revenus mensuels"
              description="Évolution des revenus sur les 12 derniers mois"
              type="line"
              data={[
                { month: 'Jan', revenue: 320000 },
                { month: 'Fév', revenue: 350000 },
                { month: 'Mar', revenue: 380000 },
                { month: 'Avr', revenue: 400000 },
                { month: 'Mai', revenue: 420000 },
                { month: 'Jun', revenue: 450000 },
                { month: 'Jul', revenue: 430000 },
                { month: 'Aoû', revenue: 460000 },
                { month: 'Sep', revenue: 480000 },
                { month: 'Oct', revenue: 500000 },
                { month: 'Nov', revenue: 520000 },
                { month: 'Déc', revenue: 550000 }
              ]}
            />
          </div>

          {/* User Activity */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activité utilisateurs
              </CardTitle>
              <CardDescription>Statistiques de la journée</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nouveaux utilisateurs</span>
                  <span className="font-bold text-primary">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Connexions actives</span>
                  <span className="font-bold text-primary">{stats.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transactions réussies</span>
                  <span className="font-bold text-primary">1,245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Taux de succès</span>
                  <span className="font-bold text-success">98.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users and KYC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Users */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Utilisateurs récents</CardTitle>
                <CardDescription>Dernières inscriptions</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Voir tout
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status === 'active' ? 'Actif' : 
                         user.status === 'pending' ? 'En attente' : 'Inactif'}
                      </Badge>
                      {user.kycStatus === 'verified' ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending KYC */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">KYC en attente</CardTitle>
                <CardDescription>Documents à vérifier</CardDescription>
              </div>
              <Badge variant="destructive">{pendingKYCs.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingKYCs.map((kyc) => (
                  <div key={kyc.id} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{kyc.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{kyc.type}</span>
                          <span>•</span>
                          <span>Soumis le {kyc.submitted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Voir
                      </Button>
                      <Button size="sm" variant="default">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approuver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Transactions récentes</CardTitle>
              <CardDescription>Dernières opérations bancaires</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'user', label: 'Utilisateur' },
                { key: 'type', label: 'Type' },
                { key: 'amount', label: 'Montant' },
                { key: 'status', label: 'Statut' },
                { key: 'date', label: 'Date' },
                { key: 'actions', label: 'Actions' }
              ]}
              data={recentTransactions.map(transaction => ({
                ...transaction,
                amount: `${transaction.amount.toLocaleString()} €`,
                actions: (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </div>
                )
              }))}
            />
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-l-4 border-l-success">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Système bancaire</p>
                <p className="text-sm text-muted-foreground">Tous les services fonctionnent</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-l-4 border-l-success">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Sécurité</p>
                <p className="text-sm text-muted-foreground">Aucune menace détectée</p>
              </div>
              <Shield className="w-5 h-5 text-success" />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-l-4 border-l-warning">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Maintenance</p>
                <p className="text-sm text-muted-foreground">Prévue ce soir 02:00-04:00</p>
              </div>
              <Clock className="w-5 h-5 text-warning" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}