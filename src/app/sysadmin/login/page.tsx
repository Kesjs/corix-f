"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { Eye, EyeOff, Shield, Lock, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()
  const supabase = createClient()

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return "Email requis"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide"
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Mot de passe requis"
    return undefined
  }

  const handleFieldChange = (field: keyof typeof errors, value: string, validator?: (val: string) => string | undefined) => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Traduction des erreurs Supabase
        const errorMessage = getFrenchErrorMessage(error.message)
        setError(errorMessage)
      } else {
        // Vérifier le rôle admin
        const userRole = data.user?.user_metadata?.role
        if (userRole !== 'admin') {
          await supabase.auth.signOut()
          setError("Accès réservé aux administrateurs")
        } else {
          router.push('/sysadmin')
        }
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

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
    return "Une erreur s'est produite lors de la connexion"
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-border/50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-primary">Administration</CardTitle>
            <CardDescription>
              Accès sécurisé au système de gestion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email administrateur
                </label>
                <Input 
                  type="email" 
                  placeholder="admin@corix-finanza.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    handleFieldChange('email', e.target.value, validateEmail)
                  }}
                  onBlur={() => handleFieldChange('email', email, validateEmail)}
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
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  Mot de passe
                </label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      handleFieldChange('password', e.target.value, validatePassword)
                    }}
                    onBlur={() => handleFieldChange('password', password, validatePassword)}
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

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? "Connexion en cours..." : "Accéder à l'administration"}
              </Button>

              <div className="text-center">
                <a 
                  href="/auth/login" 
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  ← Retour à l'accès client
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
