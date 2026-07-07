"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { ChevronDown, Upload, Camera } from "lucide-react"
import Link from "next/link"

export default function KYCPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Logo />
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          FR
          <ChevronDown className="w-4 h-4" />
        </button>
      </header>

      {/* Progress */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-accent rounded-full" />
          <div className="flex-1 h-1 bg-border rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">Étape 1/2</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Informations personnelles</CardTitle>
            <CardDescription>
              Ces informations servent uniquement à vérifier votre identité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date de naissance</label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Adresse</label>
              <Input placeholder="Votre adresse complète" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Profession</label>
              <Input placeholder="Votre profession" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Pièce d'identité</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Recto</p>
                  <p className="text-xs text-muted-foreground">CNI, Passeport</p>
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Verso</p>
                  <p className="text-xs text-muted-foreground">CNI, Passeport</p>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Continuer
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Annuler
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
