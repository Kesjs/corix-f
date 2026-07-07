"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { LanguageSelector } from "@/components/ui/language-selector"
import { MailCheck } from "lucide-react"
import Link from "next/link"

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Logo />
        <LanguageSelector variant="simple" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MailCheck className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl text-primary">Vérifiez votre email</CardTitle>
            <CardDescription>
              Un email de confirmation vous a été envoyé
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Pour compléter votre inscription, veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation.
            </p>

            <div className="bg-success/10 border border-success rounded-xl p-4 space-y-2">
              <p className="text-sm font-medium text-success">✅ Inscription en attente</p>
              <p className="text-sm text-muted-foreground">
                Une fois votre email vérifié, vous pourrez vous connecter à votre compte.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Vous n'avez pas reçu l'email ?</p>
              <div className="flex flex-col gap-2">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Se connecter
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="ghost" className="w-full">
                    Réessayer l'inscription
                  </Button>
                </Link>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Une question ? Contactez notre support : support@corix-finanza.com
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
