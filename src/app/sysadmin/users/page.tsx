"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Users, Search, Filter, Download, Eye, MoreVertical, Mail, Phone, 
  Calendar, MapPin, Briefcase, Shield, CheckCircle, XCircle, 
  UserCheck, UserX, RefreshCw, ChevronDown, Bell
} from "lucide-react"
import AdminSidebar from "../components/sidebar"
import DataTable from "../components/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const supabase = createClient()

  const fetchUsers = async () => {
    setLoading(true)
    
    // Simuler des données depuis l'API
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: "Marie Diop",
          email: "marie@example.com",
          phone: "+221 77 123 45 67",
          status: "active",
          kycStatus: "verified",
          balance: 2450,
          joinDate: "15 déc. 2023",
          lastLogin: "6 jan. 2024",
          address: "123 Rue de la République, Dakar",
          profession: "Commerçante",
          documentType: "Carte d'identité",
          documentNumber: "AB123456",
          accountType: "Premium",
          riskLevel: "Faible"
        },
        {
          id: 2,
          name: "Kossi Amouzou",
          email: "kossi@example.com",
          phone: "+221 78 234 56 78",
          status: "active",
          kycStatus: "verified",
          balance: 5200,
          joinDate: "10 déc. 2023",
          lastLogin: "5 jan. 2024",
          address: "456 Avenue de l'Indépendance, Lomé",
          profession: "Entrepreneur",
          documentType: "Passeport",
          documentNumber: "P789012",
          accountType: "Business",
          riskLevel: "Moyen"
        },
        {
          id: 3,
          name: "Fatou Ndiaye",
          email: "fatou@example.com",
          phone: "+221 77 456 78 90",
          status: "pending",
          kycStatus: "pending",
          balance: 0,
          joinDate: "6 jan. 2024",
          lastLogin: "Jamais",
          address: "Non renseignée",
          profession: "Non renseignée",
          documentType: "Carte d'identité",
          documentNumber: "CD789012",
          accountType: "Standard",
          riskLevel: "Élevé"
        },
        {
          id: 4,
          name: "Jean-Pierre Martin",
          email: "jean@example.com",
          phone: "+221 76 345 67 89",
          status: "active",
          kycStatus: "verified",
          balance: 1200,
          joinDate: "5 déc. 2023",
          lastLogin: "4 jan. 2024",
          address: "789 Boulevard du Mali, Bamako",
          profession: "Retraité",
          documentType: "Permis de conduire",
          documentNumber: "PC345678",
          accountType: "Senior",
          riskLevel: "Faible"
        },
        {
          id: 5,
          name: "Amina Traoré",
          email: "amina@example.com",
          phone: "+221 70 987 65 43",
          status: "suspended",
          kycStatus: "verified",
          balance: 800,
          joinDate: "3 déc. 2023",
          lastLogin: "2 jan. 2024",
          address: "321 Avenue Kwame Nkrumah, Abidjan",
          profession: "Enseignante",
          documentType: "Titre de séjour",
          documentNumber: "TS901234",
          accountType: "Standard",
          riskLevel: "Moyen"
        },
        {
          id: 6,
          name: "David Koné",
          email: "david@example.com",
          phone: "+221 77 111 22 33",
          status: "active",
          kycStatus: "verified",
          balance: 3500,
          joinDate: "20 nov. 2023",
          lastLogin: "6 jan. 2024",
          address: "654 Rue du Commerce, Ouagadougou",
          profession: "Ingénieur",
          documentType: "Carte d'identité",
          documentNumber: "EF567890",
          accountType: "Premium",
          riskLevel: "Faible"
        }
      ]
      
      setUsers(mockUsers)
      if (mockUsers.length > 0) {
        setSelectedUser(mockUsers[0])
      }
      setLoading(false)
    }, 1500)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && user.status === "active"
    if (activeTab === "pending") return matchesSearch && user.status === "pending"
    if (activeTab === "suspended") return matchesSearch && user.status === "suspended"
    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'success'
      case 'pending': return 'warning'
      case 'suspended': return 'destructive'
      default: return 'secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Actif'
      case 'pending': return 'En attente'
      case 'suspended': return 'Suspendu'
      default: return status
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'Faible': return 'success'
      case 'Moyen': return 'warning'
      case 'Élevé': return 'destructive'
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
            <h1 className="text-2xl font-bold text-primary">Gestion des utilisateurs</h1>
            <p className="text-muted-foreground">Gérer les comptes et les accès utilisateurs</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" onClick={fetchUsers} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button variant="default">
              <Users className="w-4 h-4 mr-2" />
              Nouvel utilisateur
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Users List */}
          <div className="col-span-1 space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="active">Actifs</TabsTrigger>
                    <TabsTrigger value="pending">En attente</TabsTrigger>
                    <TabsTrigger value="suspended">Suspendus</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Statistiques</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-primary">{users.length}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="bg-success/10 rounded-lg p-3">
                      <p className="text-2xl font-bold text-success">
                        {users.filter(u => u.status === 'active').length}
                      </p>
                      <p className="text-xs text-muted-foreground">Actifs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i} className="shadow-sm animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-secondary rounded mb-2" />
                      <div className="h-3 bg-secondary rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredUsers.length === 0 ? (
                <Card className="shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
                  </CardContent>
                </Card>
              ) : (
                filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                      selectedUser?.id === user.id ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant={getStatusColor(user.status)}>
                          {getStatusText(user.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{user.balance.toLocaleString()} €</span>
                        <Badge variant={getRiskColor(user.riskLevel)} className="text-xs">
                          {user.riskLevel}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* User Detail */}
          {selectedUser && (
            <div className="col-span-3">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary text-lg">{selectedUser.name.charAt(0)}</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedUser.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(selectedUser.status)}>
                          {getStatusText(selectedUser.status)}
                        </Badge>
                        <Badge variant="outline">{selectedUser.accountType}</Badge>
                        <Badge variant={getRiskColor(selectedUser.riskLevel)}>
                          Risque: {selectedUser.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir transactions
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="info">
                    <TabsList>
                      <TabsTrigger value="info">Informations</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                      <TabsTrigger value="activity">Activité</TabsTrigger>
                      <TabsTrigger value="settings">Paramètres</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info" className="space-y-6">
                      {/* Account Info */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Informations du compte
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">
                              <Mail className="w-3 h-3 inline mr-1" />
                              Email
                            </p>
                            <p className="font-medium">{selectedUser.email}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              <Phone className="w-3 h-3 inline mr-1" />
                              Téléphone
                            </p>
                            <p className="font-medium">{selectedUser.phone}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              Date d'inscription
                            </p>
                            <p className="font-medium">{selectedUser.joinDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              Dernière connexion
                            </p>
                            <p className="font-medium">{selectedUser.lastLogin}</p>
                          </div>
                        </div>
                      </div>

                      {/* Personal Info */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <UserCheck className="w-5 h-5" />
                          Informations personnelles
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="md:col-span-2">
                            <p className="text-muted-foreground mb-1">
                              <MapPin className="w-3 h-3 inline mr-1" />
                              Adresse
                            </p>
                            <p className="font-medium">{selectedUser.address}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              <Briefcase className="w-3 h-3 inline mr-1" />
                              Profession
                            </p>
                            <p className="font-medium">{selectedUser.profession}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              <Shield className="w-3 h-3 inline mr-1" />
                              Solde
                            </p>
                            <p className="font-bold text-primary tabular-nums">{selectedUser.balance.toLocaleString()} €</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Actions rapides</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir historique
                          </Button>
                          <Button variant="outline" size="sm">
                            <Bell className="w-4 h-4 mr-2" />
                            Envoyer notification
                          </Button>
                          {selectedUser.status === 'active' ? (
                            <Button variant="destructive" size="sm">
                              <UserX className="w-4 h-4 mr-2" />
                              Suspendre
                            </Button>
                          ) : (
                            <Button className="bg-success hover:bg-success/90" size="sm">
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activer
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <MoreVertical className="w-4 h-4 mr-2" />
                            Plus d'options
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4">
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-foreground">Pièce d'identité</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedUser.documentType} • {selectedUser.documentNumber}
                            </p>
                          </div>
                          {selectedUser.kycStatus === 'verified' ? (
                            <Badge variant="success">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Vérifié
                            </Badge>
                          ) : (
                            <Badge variant="warning">
                              <XCircle className="w-3 h-3 mr-1" />
                              En attente
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" size="sm">
                            Voir le document
                          </Button>
                          <Button variant="default" size="sm">
                            Vérifier KYC
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}