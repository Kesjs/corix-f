"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { LanguageSelector } from "@/components/ui/language-selector"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        const errorMessage = getFrenchErrorMessage(error.message)
        setError(errorMessage)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError("Une erreur s'est produite")
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour traduire les messages d'erreur Supabase
  const getFrenchErrorMessage = (message: string): string => {
    if (message.includes("Invalid email")) {
      return "Format d'email invalide"
    }
    if (message.includes("User not found")) {
      return "Aucun compte trouvé avec cet email"
    }
    // Message par défaut
    return "Une erreur s'est produite lors de la réinitialisation"
  }

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
            <CardTitle className="text-2xl text-primary">Mot de passe oublié</CardTitle>
            <CardDescription>
              Entrez votre email pour réinitialiser votre mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="space-y-4">
                <div className="bg-success/10 border border-success text-success text-sm p-4 rounded-lg">
                  Un email de réinitialisation a été envoyé à {email}. 
                  Veuillez vérifier votre boîte de réception.
                </div>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Retour à la connexion
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Entrez votre email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Envoi en cours..." : "Continuer"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  <Link href="/auth/login" className="text-accent hover:underline font-medium">
                    Retour à la connexion
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
