"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { LanguageSelector } from "@/components/ui/language-selector"
import { CountryPhoneSelector } from "@/components/ui/country-phone-selector"
import { Eye, EyeOff, User, Building, Briefcase, Mail, Phone, Lock } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

type Country = {
  code: string
  name: string
  flag: string
  phoneCode: string
  phonePattern: string
  phoneLength: number
  example: string
}

export default function RegisterPage() {
  const { t } = useLanguage()
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [city, setCity] = useState("")
  const [profession, setProfession] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [errors, setErrors] = useState<{
    lastName?: string
    firstName?: string
    city?: string
    profession?: string
    email?: string
    password?: string
    confirmPassword?: string
    phone?: string
    terms?: string
    general?: string
  }>({})

  const validateLastName = (value: string): string | undefined => {
    if (!value.trim()) return t("validation.lastNameRequired")
    if (value.length < 2) return t("validation.lastNameMinLength")
    if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value)) return t("validation.lastNameInvalid")
    return undefined
  }

  const validateFirstName = (value: string): string | undefined => {
    if (!value.trim()) return t("validation.firstNameRequired")
    if (value.length < 2) return t("validation.firstNameMinLength")
    if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value)) return t("validation.firstNameInvalid")
    return undefined
  }

  const validateCity = (value: string): string | undefined => {
    if (!value.trim()) return t("validation.cityRequired")
    if (value.length < 2) return t("validation.cityMinLength")
    return undefined
  }

  const validateProfession = (value: string): string | undefined => {
    if (value && value.length > 100) return t("validation.professionMaxLength")
    return undefined
  }

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return t("validation.emailRequired")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("validation.emailInvalid")
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return t("validation.passwordRequired")
    if (value.length < 8) return t("validation.passwordMinLength")
    if (!/[A-Z]/.test(value)) return t("validation.passwordUppercase")
    if (!/[0-9]/.test(value)) return t("validation.passwordNumber")
    return undefined
  }

  const validateConfirmPassword = (value: string): string | undefined => {
    if (!value) return t("validation.confirmPasswordRequired")
    if (value !== password) return t("validation.confirmPasswordMismatch")
    return undefined
  }

  const validatePhone = (value: string, country: Country | null): string | undefined => {
    if (!value.trim()) return t("validation.phoneRequired")
    if (!country) return t("validation.phoneCountryRequired")

    const cleanValue = value.replace(/\s/g, '').replace(country.phoneCode, '')

    const regex = new RegExp(country.phonePattern)
    if (!regex.test(cleanValue)) {
      return t("validation.phoneFormat", { example: country.example })
    }

    if (cleanValue.length !== country.phoneLength) {
      return t("validation.phoneLength", { count: country.phoneLength })
    }

    return undefined
  }

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

  const handlePhoneChange = (phoneValue: string, country: Country) => {
    setPhone(phoneValue)
    setSelectedCountry(country)

    const phoneError = validatePhone(phoneValue, country)
    const newErrors = { ...errors }
    if (phoneError) {
      newErrors.phone = phoneError
    } else {
      delete newErrors.phone
    }
    setErrors(newErrors)
  }

  const getFrenchErrorMessage = (message: string): string => {
    if (message.includes("User already registered")) {
      return "Un compte existe déjà avec cet email"
    }
    if (message.includes("Invalid email")) {
      return "Format d'email invalide"
    }
    if (message.includes("Password")) {
      return "Le mot de passe doit contenir au moins 8 caractères"
    }
    if (message.includes("weak password")) {
      return "Le mot de passe est trop faible"
    }
    return "Une erreur s'est produite lors de l'inscription"
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    const validationErrors: typeof errors = {}

    validationErrors.lastName = validateLastName(lastName)
    validationErrors.firstName = validateFirstName(firstName)
    validationErrors.city = validateCity(city)
    validationErrors.profession = validateProfession(profession)
    validationErrors.email = validateEmail(email)
    validationErrors.password = validatePassword(password)
    validationErrors.confirmPassword = validateConfirmPassword(confirmPassword)
    validationErrors.phone = validatePhone(phone, selectedCountry)

    if (!acceptedTerms) {
      validationErrors.terms = "Vous devez accepter les conditions générales"
    }

    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([_, value]) => value !== undefined)
    ) as typeof errors

    if (Object.keys(filteredErrors).length > 0) {
      setErrors(filteredErrors)
      setLoading(false)

      setTimeout(() => {
        const firstErrorElement = document.querySelector('[data-error="true"]')
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)

      return
    }

    try {
      if (!selectedCountry) {
        setErrors({ ...errors, phone: "Veuillez sélectionner un pays" })
        setLoading(false)
        return
      }

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            last_name: lastName,
            first_name: firstName,
            city: city,
            profession: profession,
            phone: phone,
            country: selectedCountry.code,
            phone_code: selectedCountry.phoneCode
          }
        }
      })

      if (signUpError) {
        const errorMessage = getFrenchErrorMessage(signUpError.message)
        setErrors({ ...errors, general: errorMessage })
        setLoading(false)
        return
      }

      if (authData.user) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: authData.user.id,
              last_name: lastName,
              first_name: firstName,
              city: city,
              profession: profession,
              phone: phone,
              country: selectedCountry!.code,
              phone_code: selectedCountry!.phoneCode
            })

          if (profileError) {
            // Non bloquant - l'utilisateur pourra compléter son profil plus tard
          }
        } catch (profileError) {
          // Erreur non bloquante lors de la création du profil
        }

        router.push("/auth/login?registered=true")
      } else {
        setErrors({ ...errors, general: "Compte créé mais utilisateur non disponible" })
        setLoading(false)
      }
    } catch (err) {
      setErrors({ ...errors, general: "Une erreur s'est produite lors de l'inscription" })
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <Logo />
        <LanguageSelector variant="simple" />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-6xl shadow-lg border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Créer votre compte</CardTitle>
            <CardDescription>
              Quelques informations de base pour commencer avec Corix Finanza
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              {errors.general && (
                <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded-lg">
                  {errors.general}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="font-medium text-foreground border-b pb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations personnelles
                  </h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Nom *
                    </label>
                    <Input
                      placeholder={t("placeholder.enterLastName")}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value)
                        handleFieldChange('lastName', e.target.value, validateLastName)
                      }}
                      onBlur={() => handleFieldChange('lastName', lastName, validateLastName)}
                      className={errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
                      data-error={errors.lastName ? "true" : "false"}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Prénom *
                    </label>
                    <Input
                      placeholder={t("placeholder.enterFirstName")}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value)
                        handleFieldChange('firstName', e.target.value, validateFirstName)
                      }}
                      onBlur={() => handleFieldChange('firstName', firstName, validateFirstName)}
                      className={errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
                      data-error={errors.firstName ? "true" : "false"}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      Ville *
                    </label>
                    <Input
                      placeholder={t("placeholder.enterCity")}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value)
                        handleFieldChange('city', e.target.value, validateCity)
                      }}
                      onBlur={() => handleFieldChange('city', city, validateCity)}
                      className={errors.city ? "border-destructive focus-visible:ring-destructive" : ""}
                      data-error={errors.city ? "true" : "false"}
                      required
                    />
                    {errors.city && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      Profession
                    </label>
                    <Input
                      placeholder={t("placeholder.profession")}
                      value={profession}
                      onChange={(e) => {
                        setProfession(e.target.value)
                        handleFieldChange('profession', e.target.value, validateProfession)
                      }}
                      onBlur={() => handleFieldChange('profession', profession, validateProfession)}
                      className={errors.profession ? "border-destructive focus-visible:ring-destructive" : ""}
                      data-error={errors.profession ? "true" : "false"}
                    />
                    {errors.profession && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.profession}
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
                      placeholder={t("placeholder.email")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        handleFieldChange('email', e.target.value, validateEmail)
                      }}
                      onBlur={() => handleFieldChange('email', email, validateEmail)}
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                      data-error={errors.email ? "true" : "false"}
                      required
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground border-b pb-2">Informations de contact et sécurité</h3>

                  <CountryPhoneSelector
                    value={phone}
                    onChange={handlePhoneChange}
                    error={errors.phone || undefined}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      Mot de passe *
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("placeholder.createPassword")}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          handleFieldChange('password', e.target.value, validatePassword)
                        }}
                        onBlur={() => handleFieldChange('password', password, validatePassword)}
                        required
                        className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                        data-error={errors.password ? "true" : "false"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                    <label className="text-sm font-medium text-foreground">Confirmer le mot de passe *</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("placeholder.confirmPassword")}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          handleFieldChange('confirmPassword', e.target.value, validateConfirmPassword)
                        }}
                        onBlur={() => handleFieldChange('confirmPassword', confirmPassword, validateConfirmPassword)}
                        required
                        className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
                        data-error={errors.confirmPassword ? "true" : "false"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-start gap-3 mb-4">
                  <Checkbox
                    id="terms-checkbox"
                    checked={acceptedTerms}
                    onCheckedChange={setAcceptedTerms}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms-checkbox" className="text-sm text-muted-foreground cursor-pointer select-none leading-relaxed">
                    Je déclare que les informations fournies sont exactes et complètes. J'accepte les{" "}
                    <Link href="/legal/cgu" className="text-accent hover:underline font-medium">
                      conditions générales d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link href="/legal/privacy" className="text-accent hover:underline font-medium">
                      politique de confidentialité
                    </Link>{" "}
                    de Corix Finanza. Je comprends que la création de compte bancaire est soumise à vérification.
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Note :</span> Tous les champs marqués d'un * sont obligatoires.
                      Vous pourrez compléter votre vérification d'identité après création du compte.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={loading || Object.keys(errors).length > 0 || !acceptedTerms}
                    >
                      {loading ? "Vérification en cours..." : "Ouvrir mon compte bancaire"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Déjà client ?{" "}
                      <Link href="/auth/login" className="text-accent hover:underline font-medium">
                        Connectez-vous à votre espace
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
