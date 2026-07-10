"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { ActionDialog } from "@/components/ui/action-dialog" // Ton composant unifié
import { User, Camera, Shield, Lock, Smartphone } from "lucide-react"

export default function ProfilPage() {
  const [profile, setProfile] = useState({
    name: "Ken Erlich Babatounde",
    email: "ken.erlich@ifri.edu.bj",
    phone: "+229 01 23 45 67 89",
    address: "Cotonou, Bénin"
  })

  // États pour gérer les modales de sécurité
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles et paramètres de sécurité.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="flex flex-col items-center p-6 text-center">
              <div className="relative w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-muted-foreground" />
                <button className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="font-bold text-lg">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">Full-stack Developer</p>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <User className="w-4 h-4" /> Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase">Nom complet</label>
                  <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase">Email</label>
                    <Input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase">Téléphone</label>
                    <Input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsPasswordModalOpen(true)}>
                  <Lock className="w-4 h-4" /> Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-red-500 hover:text-red-600" onClick={() => setIs2FAModalOpen(true)}>
                  <Smartphone className="w-4 h-4" /> Activer la vérification 2FA
                </Button>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">Sauvegarder les modifications</Button>
          </div>
        </div>
      </main>

      {/* Modale Mot de passe */}
      <ActionDialog
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        title="Changer le mot de passe"
        description="Entrez votre nouveau mot de passe sécurisé."
        confirmLabel="Mettre à jour"
        showCancel={true}
      >
        <div className="space-y-3">
          <Input type="password" placeholder="Ancien mot de passe" />
          <Input type="password" placeholder="Nouveau mot de passe" />
        </div>
      </ActionDialog>

      {/* Modale 2FA */}
      <ActionDialog
        open={is2FAModalOpen}
        onOpenChange={setIs2FAModalOpen}
        title="Activer la 2FA"
        description="Scannez ce QR code avec votre application d'authentification pour sécuriser votre compte."
        confirmLabel="Terminer"
      >
        <div className="w-full h-48 bg-secondary rounded-xl flex items-center justify-center border border-dashed border-muted-foreground">
          [QR Code Placeholder]
        </div>
      </ActionDialog>
    </div>
  )
}
