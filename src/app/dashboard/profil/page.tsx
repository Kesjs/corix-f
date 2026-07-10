"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { User, Camera, Shield, Mail, Phone, MapPin } from "lucide-react"

export default function ProfilPage() {
  // État du profil (connecté à ton UserContext dans ton implémentation réelle)
  const [profile, setProfile] = useState({
    name: "Ken Erlich Babatounde",
    email: "ken.erlich@ifri.edu.bj",
    phone: "+229 01 23 45 67 89",
    address: "Cotonou, Bénin"
  })

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles et paramètres de sécurité.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Avatar Card (colonne de gauche) */}
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

          {/* Form Section (colonne de droite) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Infos Personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <User className="w-4 h-4" /> Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
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
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2">
                  Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-red-500 hover:text-red-600">
                  Activer la vérification en deux étapes (2FA)
                </Button>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">Sauvegarder les modifications</Button>

          </div>
        </div>
      </main>
    </div>
  )
}
