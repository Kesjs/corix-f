"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { ChevronDown, Camera } from "lucide-react"
import Link from "next/link"

export default function KYCBiometricPage() {
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
          <div className="flex-1 h-1 bg-accent rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">Étape 2/2</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-primary">Vérification biométrique</CardTitle>
            <CardDescription>
              Prenez un selfie pour confirmer votre identité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative mx-auto w-48 h-48">
              {/* Oval frame */}
              <div className="absolute inset-0 border-4 border-dashed border-border rounded-full" />
              <div className="absolute inset-4 border-2 border-accent/30 rounded-full" />
              
              {/* Camera icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                  <Camera className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-foreground">Instructions</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Placez votre visage dans le cadre ovale</li>
                <li>• Assurez-vous d'avoir un bon éclairage</li>
                <li>• Regardez directement la caméra</li>
                <li>• Évitez les lunettes et les chapeaux</li>
              </ul>
            </div>

            <Button className="w-full" size="lg">
              Prendre la photo
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link href="/auth/kyc" className="text-muted-foreground hover:text-foreground">
                Retour
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
