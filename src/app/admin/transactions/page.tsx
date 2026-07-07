"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, Search, Filter, Download, Eye, MoreVertical, 
  ArrowUpRight, ArrowDownLeft, Calendar, User, DollarSign,
  CheckCircle, XCircle, Clock, RefreshCw, TrendingUp, TrendingDown
} from "lucide-react"
import AdminSidebar from "../components/sidebar"
import DataTable from "../components/data-table"

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      reference: "TXN-2024-001",
      user: "Marie Diop",
      type: "Transfert",
      amount: 150.00,
      status: "completed",
      date: "2024-01-15 14:30",
      method: "Mobile Money",
      fee: 1.50,
      recipient: "Kossi Amouzou",
      description: "Transfert personnel"
    },
    {
      id: 2,
      reference: "TXN-2024-002",
      user: "Kossi Amouzou",
      type: "Retrait",
      amount: 500.00,
      status: "completed",
      date: "2024-01-15 13:15",
      method: "Carte Visa",
      fee: 5.00,
      recipient: "Guichet automatique",
      description: "Retrait distributeur"
    },
    {
      id: 3,
      reference: "TXN-2024-003",
      user: "Fatou Ndiaye",
      type: "Dépôt",
      amount: 1000.00,
      status: "pending",
      date: "2024-01-15 12:00",
      method: "Virement bancaire",
      fee: 0.00,
      recipient: "Compte épargne",
      description: "Épargne mensuelle"
    },
    {
      id: 4,
      reference: "TXN-2024-004",
      user: "Jean Martin",
      type: "Paiement",
      amount: 85.50,
      status: "completed",
      date: "2024-01-15 11:45",
      method: "Carte Mastercard",
      fee: 0.85,
      recipient: "Super U",
      description: "Courses alimentaires"
    },
    {
      id: 5,
      reference: "TXN-2024-005",
      user: "Amina Traoré",
      type: "Transfert",
      amount: 200.00,
      status: "failed",
      date: "2024-01-15 10:30",
      method: "Mobile Money",
      fee: 2.00,
      recipient: "David Koné",
      description: "Remboursement prêt"
    },
    {
      id: 6,
      reference: "TXN-2024-006",
      user: "David Koné",
      type: "Recharge",
      amount: 50.00,
      status: "completed",
      date: "2024-01-15 09:15",
      method: "Carte",
      fee: 0.50,
      recipient: "Orange Money",
      description: "Recharge téléphone"
    },
    {
      id: 7,
      reference: "TXN-2024-007",
      user: "Abdoulaye Sow",
      type: "Paiement facture",
      amount: 120.00,
      status: "completed",
      date: "2024-01-15 08:45",
      method: "Virement",
      fee: 1.20,
      recipient: "Senelec",
      description: "Facture électricité"
    },
    {
      id: 8,
      reference: "TXN-2024-008",
      user: "Sofia Camara",
      type: "Investissement",
      amount: 1000.00,
      status: "pending",
      date: "2024-01-15 08:00",
      method: "Virement bancaire",
      fee: 10.00,
      recipient: "Fonds commun",
      description: "Placement mensuel"
    }
  ])

  const [selectedTransaction, setSelectedTransaction] = useState<any>(transactions[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === "" || 
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.includes(searchTerm) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    
    const matchesDate = (!dateRange.start || transaction.date >= dateRange.start) &&
                       (!dateRange.end || transaction.date <= dateRange.end)
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'success'
      case 'failed': return 'destructive'
      case 'pending': return 'warning'
      default: return 'secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return CheckCircle
      case 'failed': return XCircle
      case 'pending': return Clock
      default: return Clock
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Transfert': return ArrowUpRight
      case 'Retrait': return ArrowDownLeft
      case 'Dépôt': return TrendingUp
      case 'Paiement': return CreditCard
      case 'Recharge': return TrendingUp
      case 'Paiement facture': return CreditCard
      case 'Investissement': return TrendingUp
      default: return CreditCard
    }
  }

  const getTotalStats = () => {
    const completed = transactions.filter(t => t.status === 'completed')
    const totalAmount = completed.reduce((sum, t) => sum + t.amount, 0)
    const totalFees = completed.reduce((sum, t) => sum + t.fee, 0)
    const totalTransactions = completed.length
    
    return { totalAmount, totalFees, totalTransactions }
  }

  const stats = getTotalStats()

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Transactions</h1>
            <p className="text-muted-foreground">Suivi et gestion des opérations financières</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres avancés
            </Button>
            <Button variant="default">
              <Download className="w-4 h-4 mr-2" />
              Exporter CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Volume total</p>
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    {stats.totalAmount.toLocaleString()} €
                  </p>
                  <p className="text-sm text-success mt-2">+12.5% ce mois</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Transactions réussies</p>
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    {stats.totalTransactions}
                  </p>
                  <p className="text-sm text-success mt-2">Taux de succès: 94.3%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Frais générés</p>
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    {stats.totalFees.toLocaleString()} €
                  </p>
                  <p className="text-sm text-success mt-2">+8.2% ce mois</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Filters and Transactions List */}
          <div className="col-span-1 space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Statut</p>
                  <div className="space-y-2">
                    {['all', 'completed', 'pending', 'failed'].map((status) => (
                      <Button
                        key={status}
                        variant={filterStatus === status ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setFilterStatus(status)}
                      >
                        {status === 'all' ? 'Tous' : 
                         status === 'completed' ? 'Terminées' :
                         status === 'pending' ? 'En attente' : 'Échouées'}
                        <Badge variant="secondary" className="ml-auto">
                          {transactions.filter(t => status === 'all' ? true : t.status === status).length}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Date</p>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      placeholder="Date début"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <Input
                      type="date"
                      placeholder="Date fin"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredTransactions.map((transaction) => {
                const TypeIcon = getTypeIcon(transaction.type)
                const StatusIcon = getStatusIcon(transaction.status)
                return (
                  <Card
                    key={transaction.id}
                    className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                      selectedTransaction?.id === transaction.id ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === 'Transfert' ? 'bg-blue-500/10' :
                            transaction.type === 'Retrait' ? 'bg-red-500/10' :
                            'bg-green-500/10'
                          }`}>
                            <TypeIcon className={`w-4 h-4 ${
                              transaction.type === 'Transfert' ? 'text-blue-500' :
                              transaction.type === 'Retrait' ? 'text-red-500' :
                              'text-green-500'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{transaction.type}</p>
                            <p className="text-xs text-muted-foreground">{transaction.reference}</p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(transaction.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {transaction.status === 'completed' ? 'Terminée' :
                           transaction.status === 'pending' ? 'En attente' : 'Échouée'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {transaction.amount.toLocaleString()} €
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {transaction.date.split(' ')[0]}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Transaction Detail */}
          {selectedTransaction && (
            <div className="col-span-3">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedTransaction.reference}</CardTitle>
                    <CardDescription>{selectedTransaction.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(selectedTransaction.status)} className="text-lg px-4 py-2">
                      {selectedTransaction.status === 'completed' ? 'Terminée' :
                       selectedTransaction.status === 'pending' ? 'En attente' : 'Échouée'}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Transaction Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Informations transaction</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Montant</span>
                          <span className="font-bold text-primary text-lg">
                            {selectedTransaction.amount.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frais</span>
                          <span className="font-medium">{selectedTransaction.fee.toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total</span>
                          <span className="font-bold">
                            {(selectedTransaction.amount + selectedTransaction.fee).toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Méthode</span>
                          <span className="font-medium">{selectedTransaction.method}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-medium">{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* User and Recipient Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Parties</h3>
                      <div className="space-y-4">
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium">Émetteur</p>
                              <p className="text-sm text-muted-foreground">{selectedTransaction.user}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">Bénéficiaire</p>
                              <p className="text-sm text-muted-foreground">{selectedTransaction.recipient}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Chronologie</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <div className="flex-1">
                          <p className="font-medium">Transaction initiée</p>
                          <p className="text-sm text-muted-foreground">{selectedTransaction.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          selectedTransaction.status === 'completed' ? 'bg-success' :
                          selectedTransaction.status === 'failed' ? 'bg-destructive' : 'bg-warning'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">
                            {selectedTransaction.status === 'completed' ? 'Transaction approuvée' :
                             selectedTransaction.status === 'failed' ? 'Transaction rejetée' :
                             'Transaction en traitement'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedTransaction.status === 'completed' ? 'Approuvée par le système' :
                             selectedTransaction.status === 'failed' ? 'Échec de vérification' :
                             'En attente de validation'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button variant="default" className="flex-1">
                      <Eye className="w-5 h-5 mr-2" />
                      Voir les détails complets
                    </Button>
                    <Button variant="outline">
                      <Download className="w-5 h-5 mr-2" />
                      Télécharger le reçu
                    </Button>
                    {selectedTransaction.status === 'pending' && (
                      <>
                        <Button className="bg-success hover:bg-success/90">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Approuver
                        </Button>
                        <Button variant="destructive">
                          <XCircle className="w-5 h-5 mr-2" />
                          Rejeter
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}