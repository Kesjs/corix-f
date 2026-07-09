"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthHeader } from "@/components/auth/auth-header"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const searchParams = useSearchParams()
  const supabase = createClient()
  const { t } = useLanguage()

  // Vérifier si l'utilisateur vient de s'inscrire
  const justRegistered = searchParams.get("registered") === "true"

  // Fonctions de validation
  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return "Email requis"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide"
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Mot de passe requis"
    return undefined
  }

  // Validation en temps réel
  const handleFieldChange = (field: keyof typeof errors, value: string, validator?: (value: string) => string | undefined) => {
    const newErrors = { ...errors }
    if (validator) {
      const error = validator(value)
      if (error) {
        newErrors[field] = error
      } else {
        delete newErrors[field]
      }
    }
    setErrors(newErrors)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setErrors({})

    // Validation
    const validationErrors: typeof errors = {}
    validationErrors.email = validateEmail(email)
    validationErrors.password = validatePassword(password)

    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([_, value]) => value !== undefined)
    ) as typeof errors

    if (Object.keys(filteredErrors).length > 0) {
      setErrors(filteredErrors)
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Traduction des erreurs Supabase en français
        const errorMessage = getFrenchErrorMessage(error.message)
        setError(errorMessage)
        setLoading(false)
      }
      // Pas de redirection ici : AuthProvider écoute onAuthStateChange
      // et redirige vers /dashboard dès que l'event SIGNED_IN se déclenche.
    } catch (err) {
      setError("Une erreur s'est produite lors de la connexion")
      setLoading(false)
    }
  }

  // Fonction pour traduire les messages d'erreur Supabase
  const getFrenchErrorMessage = (message: string): string => {
    if (message.includes("Invalid login credentials")) {
      return "Email ou mot de passe incorrect"
    }
    if (message.includes("Email not confirmed")) {
      return "Veuillez confirmer votre email avant de vous connecter"
    }
    if (message.includes("Invalid email")) {
      return "Format d'email invalide"
    }
    if (message.includes("User not found")) {
      return "Aucun compte trouvé avec cet email"
    }
    if (message.includes("Password")) {
      return "Mot de passe incorrect"
    }
    // Message par défaut
    return "Une erreur s'est produite lors de la connexion"
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AuthHeader />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Connexion</CardTitle>
            <CardDescription>
              Accédez à votre compte Corix Finanza
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {justRegistered && (
                <div className="bg-teal/10 border border-teal text-teal text-sm p-3 rounded-lg">
                  Compte créé avec succès ! Connectez-vous avec vos identifiants.
                </div>
              )}

              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input 
                  type="email" 
                  placeholder={t("placeholder.enterEmail")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    handleFieldChange('email', e.target.value, validateEmail)
                  }}
                  onBlur={() => handleFieldChange('email', email, validateEmail)}
                  required
                  className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-xs flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mot de passe</label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder={t("placeholder.enterPassword")}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      handleFieldChange('password', e.target.value, validatePassword)
                    }}
                    onBlur={() => handleFieldChange('password', password, validatePassword)}
                    required
                    className={errors.password ? "border-destructive focus-visible:ring-destructive" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-sm text-accent hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link href="/auth/register" className="text-accent hover:underline font-medium">
                  Créer un compte
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
