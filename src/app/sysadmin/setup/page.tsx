"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { Eye, EyeOff, Shield, Lock, Mail, User } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type Errors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export default function AdminSetupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const router = useRouter()
  const supabase = createClient()

  const validateName = (value: string): string | undefined => {
    if (!value.trim()) return "Nom requis"
    if (value.length < 2) return "Le nom doit contenir au moins 2 caractères"
    return undefined
  }

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return "Email requis"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide"
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Mot de passe requis"
    if (value.length < 8) return "Le mot de passe doit contenir au moins 8 caractères"
    if (!/[A-Z]/.test(value)) return "Le mot de passe doit contenir au moins une majuscule"
    if (!/[0-9]/.test(value)) return "Le mot de passe doit contenir au moins un chiffre"
    return undefined
  }

  const validateConfirmPassword = (value: string): string | undefined => {
    if (!value) return "Confirmation du mot de passe requise"
    if (value !== password) return "Les mots de passe ne correspondent pas"
    return undefined
  }

  const handleFieldChange = (field: keyof Errors, value: string, validator?: (val: string) => string | undefined) => {
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

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setErrors({})

    // Validation
    const validationErrors: typeof errors = {}
    validationErrors.name = validateName(name)
    validationErrors.email = validateEmail(email)
    validationErrors.password = validatePassword(password)
    validationErrors.confirmPassword = validateConfirmPassword(confirmPassword)

    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([_, value]) => value !== undefined)
    ) as typeof errors

    if (Object.keys(filteredErrors).length > 0) {
      setErrors(filteredErrors)
      setLoading(false)
      return
    }

    try {
      // 1. Vérifier si l'admin est déjà initialisé
      const { data: settings } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'admin_initialized')
        .single()

      if (settings && settings.value === true) {
        setError("L'administrateur a déjà été configuré. Contactez l'équipe technique.")
        setLoading(false)
        return
      }

      // 2. Créer l'utilisateur admin avec rôle admin
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'admin'
          }
        }
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      // 3. Marquer l'admin comme initialisé
      if (authData.user) {
        await supabase
          .from('system_settings')
          .update({ value: true })
          .eq('key', 'admin_initialized')

        // 4. Créer le profil
        await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: name,
            email: email
          })

        // 5. Connecter l'utilisateur et rediriger
        await supabase.auth.signInWithPassword({
          email,
          password
        })

        router.push('/sysadmin')
      }
    } catch (err) {
      console.error('Erreur setup admin:', err)
      setError("Une erreur s'est produite lors de la configuration")
    } finally {
      setLoading(false)
    }
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
            <CardTitle className="text-2xl text-primary">Configuration Admin</CardTitle>
            <CardDescription>
              Créez le compte administrateur principal. Cette opération ne peut être effectuée qu'une seule fois.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetup} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Nom complet *
                </label>
                <Input
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    handleFieldChange('name', e.target.value, validateName)
                  }}
                  onBlur={() => handleFieldChange('name', name, validateName)}
                  className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-destructive text-xs flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email *
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
                  Mot de passe *
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
                <p className="text-xs text-muted-foreground">
                  Au moins 8 caractères, une majuscule et un chiffre
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      handleFieldChange('confirmPassword', e.target.value, validateConfirmPassword)
                    }}
                    onBlur={() => handleFieldChange('confirmPassword', confirmPassword, validateConfirmPassword)}
                    className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive text-xs flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? "Configuration en cours..." : "Créer l'administrateur"}
              </Button>

              <div className="bg-accent/10 border border-accent text-accent text-xs p-3 rounded-lg">
                <p className="font-medium mb-1">⚠️ Important</p>
                <p>Cette opération est irréversible. Conservez vos identifiants en sécurité.</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
