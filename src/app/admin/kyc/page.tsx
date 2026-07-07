"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  FileText, Search, Filter, CheckCircle, XCircle, Eye, 
  AlertCircle, Clock, User, Shield, Download, MoreVertical,
  Calendar, Globe, Home, Car, CreditCard, RefreshCw
} from "lucide-react"
import AdminSidebar from "../components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminKYCPage() {
  const [kycRequests, setKYCRequests] = useState([
    {
      id: 1,
      user: "Abdoulaye Sow",
      email: "abdoulaye@example.com",
      documentType: "Carte d'identité",
      documentNumber: "AB123456",
      submitted: "2024-01-15 14:30",
      status: "review",
      userId: 101,
      address: "123 Rue de la Paix, Dakar",
      phone: "+221 77 123 45 67",
      profession: "Commerçant",
      riskScore: 25,
      documentUrl: "/documents/id-101-front.jpg"
    },
    {
      id: 2,
      user: "Sofia Camara",
      email: "sofia@example.com",
      documentType: "Passeport",
      documentNumber: "P789012",
      submitted: "2024-01-14 09:15",
      status: "review",
      userId: 102,
      address: "456 Avenue de l'Indépendance, Conakry",
      phone: "+221 78 234 56 78",
      profession: "Médecin",
      riskScore: 18,
      documentUrl: "/documents/passport-102.jpg"
    },
    {
      id: 3,
      user: "David Koné",
      email: "david@example.com",
      documentType: "Permis de conduire",
      documentNumber: "PC345678",
      submitted: "2024-01-14 16:45",
      status: "pending",
      userId: 103,
      address: "789 Boulevard du Mali, Bamako",
      phone: "+221 76 345 67 89",
      profession: "Ingénieur",
      riskScore: 42,
      documentUrl: "/documents/license-103.jpg"
    },
    {
      id: 4,
      user: "Chantal Bah",
      email: "chantal@example.com",
      documentType: "Titre de séjour",
      documentNumber: "TS901234",
      submitted: "2024-01-13 11:20",
      status: "review",
      userId: 104,
      address: "321 Rue du Commerce, Abidjan",
      phone: "+221 70 987 65 43",
      profession: "Enseignante",
      riskScore: 35,
      documentUrl: "/documents/residence-104.pdf"
    },
    {
      id: 5,
      user: "Mohamed Diallo",
      email: "mohamed@example.com",
      documentType: "Carte d'identité",
      documentNumber: "CD567890",
      submitted: "2024-01-12 08:30",
      status: "approved",
      userId: 105,
      address: "654 Avenue Kwame Nkrumah, Ouagadougou",
      phone: "+221 77 111 22 33",
      profession: "Agriculteur",
      riskScore: 15,
      documentUrl: "/documents/id-105-front.jpg"
    },
    {
      id: 6,
      user: "Aissatou Ndiaye",
      email: "aissatou@example.com",
      documentType: "Passeport",
      documentNumber: "P234567",
      submitted: "2024-01-11 13:45",
      status: "rejected",
      userId: 106,
      address: "987 Rue de la République, Lomé",
      phone: "+221 78 876 54 32",
      profession: "Avocate",
      riskScore: 58,
      documentUrl: "/documents/passport-106.jpg",
      rejectionReason: "Document illisible"
    }
  ])

  const [selectedRequest, setSelectedRequest] = useState<any>(kycRequests[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredRequests = kycRequests.filter(request => {
    const matchesSearch = searchTerm === "" || 
      request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.documentNumber.includes(searchTerm)
    
    if (filterStatus === "all") return matchesSearch
    return matchesSearch && request.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'success'
      case 'rejected': return 'destructive'
      case 'review': return 'warning'
      case 'pending': return 'secondary'
      default: return 'secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'approved': return 'Approuvé'
      case 'rejected': return 'Rejeté'
      case 'review': return 'En revue'
      case 'pending': return 'En attente'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved': return CheckCircle
      case 'rejected': return XCircle
      case 'review': return AlertCircle
      case 'pending': return Clock
      default: return Clock
    }
  }

  const handleApprove = (id: number) => {
    setKYCRequests(requests => 
      requests.map(req => 
        req.id === id ? { ...req, status: 'approved' } : req
      )
    )
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: 'approved' })
    }
  }

  const handleReject = (id: number, reason: string) => {
    setKYCRequests(requests => 
      requests.map(req => 
        req.id === id ? { ...req, status: 'rejected', rejectionReason: reason } : req
      )
    )
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: 'rejected', rejectionReason: reason })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Validation KYC</h1>
            <p className="text-muted-foreground">Vérification des documents d'identité</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher KYC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <Badge variant="destructive" className="text-lg px-4 py-2">
              {kycRequests.filter(r => r.status === 'review' || r.status === 'pending').length} en attente
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* KYC List */}
          <div className="col-span-1 space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filtres par statut</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" value={filterStatus} onValueChange={setFilterStatus}>
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="review">En revue</TabsTrigger>
                    <TabsTrigger value="pending">En attente</TabsTrigger>
                    <TabsTrigger value="approved">Approuvés</TabsTrigger>
                    <TabsTrigger value="rejected">Rejetés</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total demandes</span>
                    <span className="font-bold text-primary">{kycRequests.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">À vérifier</span>
                    <span className="font-bold text-warning">
                      {kycRequests.filter(r => r.status === 'review' || r.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Approuvés</span>
                    <span className="font-bold text-success">
                      {kycRequests.filter(r => r.status === 'approved').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rejetés</span>
                    <span className="font-bold text-destructive">
                      {kycRequests.filter(r => r.status === 'rejected').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requests List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status)
                return (
                  <Card
                    key={request.id}
                    className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                      selectedRequest?.id === request.id ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">{request.user}</p>
                          <p className="text-xs text-muted-foreground">{request.email}</p>
                        </div>
                        <Badge variant={getStatusColor(request.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusText(request.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          {request.documentType === "Carte d'identité" && <CreditCard className="w-3 h-3" />}
                          {request.documentType === 'Passeport' && <Globe className="w-3 h-3" />}
                          {request.documentType === 'Permis de conduire' && <Car className="w-3 h-3" />}
                          {request.documentType === 'Titre de séjour' && <Home className="w-3 h-3" />}
                          <span className="text-muted-foreground">{request.documentType}</span>
                        </div>
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          Score: {request.riskScore}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* KYC Detail */}
          {selectedRequest && (
            <div className="col-span-3">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedRequest.user}</CardTitle>
                      <CardDescription>
                        {selectedRequest.documentType} • {selectedRequest.documentNumber}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(selectedRequest.status)} className="text-lg px-4 py-2">
                      {(() => {
                        const StatusIcon = getStatusIcon(selectedRequest.status)
                        return <StatusIcon className="w-4 h-4 mr-2" />
                      })()}
                      {getStatusText(selectedRequest.status)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Document Preview */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Document
                      </h3>
                      <div className="border-2 border-dashed border-input rounded-lg h-64 flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="font-medium text-foreground">{selectedRequest.documentType}</p>
                        <p className="text-sm text-muted-foreground">{selectedRequest.documentNumber}</p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir le document
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* User Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Informations utilisateur
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{selectedRequest.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Téléphone</p>
                          <p className="font-medium">{selectedRequest.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Adresse</p>
                          <p className="font-medium">{selectedRequest.address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profession</p>
                          <p className="font-medium">{selectedRequest.profession}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Soumis le</p>
                          <p className="font-medium">{selectedRequest.submitted}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Évaluation des risques
                    </h3>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Score de risque</span>
                        <Badge variant={
                          selectedRequest.riskScore < 20 ? 'success' :
                          selectedRequest.riskScore < 40 ? 'warning' : 'destructive'
                        }>
                          {selectedRequest.riskScore}/100
                        </Badge>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            selectedRequest.riskScore < 20 ? 'bg-success' :
                            selectedRequest.riskScore < 40 ? 'bg-warning' : 'bg-destructive'
                          }`}
                          style={{ width: `${selectedRequest.riskScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {selectedRequest.riskScore < 20 ? 'Risque faible - Vérification recommandée' :
                         selectedRequest.riskScore < 40 ? 'Risque moyen - Vérification approfondie recommandée' :
                         'Risque élevé - Vérification stricte requise'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {selectedRequest.status !== 'approved' && (
                      <Button 
                        variant="default" 
                        className="flex-1"
                        onClick={() => handleApprove(selectedRequest.id)}
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Approuver le KYC
                      </Button>
                    )}
                    
                    {selectedRequest.status !== 'rejected' && (
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleReject(selectedRequest.id, "Document non conforme")}
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Rejeter le KYC
                      </Button>
                    )}
                    
                    <Button variant="outline">
                      <Eye className="w-5 h-5 mr-2" />
                      Voir le profil utilisateur
                    </Button>
                  </div>

                  {/* Rejection Reason (if rejected) */}
                  {selectedRequest.status === 'rejected' && selectedRequest.rejectionReason && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <h4 className="font-medium text-destructive mb-2">Raison du rejet</h4>
                      <p className="text-sm">{selectedRequest.rejectionReason}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}