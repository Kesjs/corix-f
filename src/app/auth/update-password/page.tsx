"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { LanguageSelector } from "@/components/ui/language-selector"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Vérifier que l'utilisateur a un token valide
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/auth/login")
      }
    })
  }, [router, supabase])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        const errorMessage = getFrenchErrorMessage(error.message)
        setError(errorMessage)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      }
    } catch (err) {
      setError("Une erreur s'est produite")
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour traduire les messages d'erreur Supabase
  const getFrenchErrorMessage = (message: string): string => {
    if (message.includes("Password")) {
      return "Le mot de passe doit contenir au moins 8 caractères"
    }
    if (message.includes("weak password")) {
      return "Le mot de passe est trop faible"
    }
    // Message par défaut
    return "Une erreur s'est produite lors de la mise à jour"
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
            <CardTitle className="text-2xl text-primary">Nouveau mot de passe</CardTitle>
            <CardDescription>
              Créez un nouveau mot de passe pour votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="space-y-4">
                <div className="bg-success/10 border border-success text-success text-sm p-4 rounded-lg">
                  Votre mot de passe a été mis à jour avec succès. 
                  Redirection vers la page de connexion...
                </div>
                <Link href="/auth/login">
                  <Button className="w-full">
                    Se connecter maintenant
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nouveau mot de passe</label>
                  <Input 
                    type="password" 
                    placeholder="Entrez votre nouveau mot de passe" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirmer le mot de passe</label>
                  <Input 
                    type="password" 
                    placeholder="Confirmez votre nouveau mot de passe" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Mise à jour en cours..." : "Mettre à jour le mot de passe"}
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