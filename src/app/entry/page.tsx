"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export default function EntryPage() {
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="space-y-4 mb-8">
            <Logo variant="icon" className="mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Bienvenue sur Corix Finanza</h1>
              <p className="text-muted-foreground mt-2">
                Votre banque digitale de confiance en Espagne
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/auth/register" className="block">
              <Button className="w-full" size="lg">
                Créer un compte
              </Button>
            </Link>
            
            <Link href="/auth/login" className="block">
              <Button variant="outline" className="w-full" size="lg">
                J'ai déjà un compte
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            En continuant, vous acceptez nos{" "}
            <Link href="#" className="text-accent hover:underline">
              conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="#" className="text-accent hover:underline">
              politique de confidentialité
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
