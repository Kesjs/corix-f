"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { LanguageSelector } from "@/components/ui/language-selector"
import { CountryPhoneSelector } from "@/components/ui/country-phone-selector"
import { Eye, EyeOff, ChevronDown, User, Building, Briefcase, Mail, FileText, Phone, Lock, Globe, CreditCard, Car, Home } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

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
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [city, setCity] = useState("")
  const [profession, setProfession] = useState("")
  const [idType, setIdType] = useState<string>("")
  const [idNumber, setIdNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [idFile, setIdFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // États d'erreur pour chaque champ
  const [errors, setErrors] = useState<{
    lastName?: string
    firstName?: string
    city?: string
    profession?: string
    idType?: string
    idNumber?: string
    idFile?: string
    email?: string
    password?: string
    confirmPassword?: string
    phone?: string
    terms?: string
    general?: string
  }>({})

  // Options pour le type de pièce d'identité
  const idTypes = [
    { value: "passport", label: "Passeport", icon: "Globe" },
    { value: "id_card", label: "Carte d'identité nationale", icon: "CreditCard" },
    { value: "driving_license", label: "Permis de conduire", icon: "Car" },
    { value: "residence_permit", label: "Titre de séjour", icon: "Home" },
  ]

  // Fonction pour obtenir le composant icône
  const getIconComponent = (typeValue: string) => {
    switch (typeValue) {
      case "passport": return <Globe className="w-4 h-4" />
      case "id_card": return <CreditCard className="w-4 h-4" />
      case "driving_license": return <Car className="w-4 h-4" />
      case "residence_permit": return <Home className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  // Fonctions de validation
  const validateLastName = (value: string): string | undefined => {
    if (!value.trim()) return "Le nom est requis"
    if (value.length < 2) return "Le nom doit contenir au moins 2 caractères"
    if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value)) return "Le nom ne doit contenir que des lettres"
    return undefined
  }

  const validateFirstName = (value: string): string | undefined => {
    if (!value.trim()) return "Le prénom est requis"
    if (value.length < 2) return "Le prénom doit contenir au moins 2 caractères"
    if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value)) return "Le prénom ne doit contenir que des lettres"
    return undefined
  }

  const validateCity = (value: string): string | undefined => {
    if (!value.trim()) return "La ville est requise"
    if (value.length < 2) return "La ville doit contenir au moins 2 caractères"
    return undefined
  }

  const validateProfession = (value: string): string | undefined => {
    if (value && value.length > 100) return "La profession ne doit pas dépasser 100 caractères"
    return undefined
  }

  const validateIdType = (value: string): string | undefined => {
    if (!value) return "Le type de pièce d'identité est requis"
    return undefined
  }

  const validateIdNumber = (value: string): string | undefined => {
    if (!value.trim()) return "Le numéro de pièce d'identité est requis"
    if (value.length < 4) return "Le numéro doit contenir au moins 4 caractères"
    if (!/^[a-zA-Z0-9\s\-]+$/.test(value)) return "Format invalide (lettres et chiffres seulement)"
    return undefined
  }

  const validateIdFile = (file: File | null): string | undefined => {
    if (!file) return "Le document d'identité est requis"
    if (file.size > 5 * 1024 * 1024) return "Le fichier ne doit pas dépasser 5MB"
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) return "Format invalide (JPG, PNG ou PDF uniquement)"
    return undefined
  }

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return "L'email est requis"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide"
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Le mot de passe est requis"
    if (value.length < 8) return "Au moins 8 caractères"
    if (!/[A-Z]/.test(value)) return "Au moins une majuscule"
    if (!/[0-9]/.test(value)) return "Au moins un chiffre"
    return undefined
  }

  const validateConfirmPassword = (value: string): string | undefined => {
    if (!value) return "La confirmation du mot de passe est requise"
    if (value !== password) return "Les mots de passe ne correspondent pas"
    return undefined
  }

  const validatePhone = (value: string, country: Country | null): string | undefined => {
    if (!value.trim()) return "Le numéro de téléphone est requis"
    if (!country) return "Le pays est requis"
    
    const regex = new RegExp(country.phonePattern)
    if (!regex.test(value)) {
      return `Format invalide. Exemple: ${country.example}`
    }
    
    if (value.length < country.phoneLength) {
      return `Le numéro doit contenir ${country.phoneLength} chiffres`
    }
    
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setIdFile(file)
    
    const fileError = validateIdFile(file)
    const newErrors = { ...errors }
    if (fileError) {
      newErrors.idFile = fileError
    } else {
      delete newErrors.idFile
    }
    setErrors(newErrors)
  }

  const uploadIdDocument = async (userId: string): Promise<string | null> => {
    if (!idFile) return null
    
    setIsUploading(true)
    setUploadProgress(10)
    
    try {
      const fileExt = idFile.name.split('.').pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
      const filePath = `id-documents/${fileName}`
      
      // Simuler une progression (on peut améliorer cela plus tard)
      setTimeout(() => setUploadProgress(50), 500)
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, idFile, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (uploadError) {
        console.error('Erreur upload:', uploadError)
        setErrors(prev => ({ ...prev, idFile: "Erreur lors du téléchargement du document" }))
        return null
      }
      
      // Simuler la progression
      setTimeout(() => setUploadProgress(90), 1000)
      
      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)
      
      setUploadProgress(100)
      return publicUrl
    } catch (error) {
      console.error('Erreur upload:', error)
      setErrors(prev => ({ ...prev, idFile: "Erreur lors du téléchargement du document" }))
      return null
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    }
  }

  const handlePhoneChange = (phoneValue: string, country: Country) => {
    setPhone(phoneValue)
    setSelectedCountry(country)
    
    // Validation en temps réel
    const phoneError = validatePhone(phoneValue, country)
    const newErrors = { ...errors }
    if (phoneError) {
      newErrors.phone = phoneError
    } else {
      delete newErrors.phone
    }
    setErrors(newErrors)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Réinitialiser les erreurs
    setErrors({})
    
    // Validation complète de tous les champs
    const validationErrors: typeof errors = {}
    
    validationErrors.lastName = validateLastName(lastName)
    validationErrors.firstName = validateFirstName(firstName)
    validationErrors.city = validateCity(city)
    validationErrors.profession = validateProfession(profession)
    validationErrors.idType = validateIdType(idType)
    validationErrors.idNumber = validateIdNumber(idNumber)
    validationErrors.idFile = validateIdFile(idFile)
    validationErrors.email = validateEmail(email)
    validationErrors.password = validatePassword(password)
    validationErrors.confirmPassword = validateConfirmPassword(confirmPassword)
    validationErrors.phone = validatePhone(phone, selectedCountry)
    
    if (!acceptedTerms) {
      validationErrors.terms = "Vous devez accepter les conditions générales"
    }
    
    // Filtrer les erreurs undefined
    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([_, value]) => value !== undefined)
    ) as typeof errors
    
    // Si des erreurs existent
    if (Object.keys(filteredErrors).length > 0) {
      setErrors(filteredErrors)
      setLoading(false)
      
      // Scroll vers la première erreur
      setTimeout(() => {
        const firstErrorElement = document.querySelector('[data-error="true"]')
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      
      return
    }

    try {
      // Vérifier que selectedCountry n'est pas null
      if (!selectedCountry) {
        setErrors({ ...errors, phone: "Veuillez sélectionner un pays" })
        setLoading(false)
        return
      }
      
      // 1. Créer le compte utilisateur
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            last_name: lastName,
            first_name: firstName,
            city: city,
            profession: profession,
            id_type: idType,
            id_number: idNumber,
            phone: phone,
            country: selectedCountry.code,
            phone_code: selectedCountry.phoneCode
          }
        }
      })

      if (signUpError) {
        setErrors({ ...errors, general: signUpError.message })
        return
      }

      // 2. Si l'inscription réussit et qu'on a un utilisateur
      if (authData.user) {
        let idDocumentUrl: string | null = null
        
        // 3. Uploader le document d'identité si disponible
        if (idFile) {
          idDocumentUrl = await uploadIdDocument(authData.user.id)
        }
        
        // 4. Créer le profil dans la table profiles avec l'URL du document
        const profileData: any = {
          id: authData.user.id,
          last_name: lastName,
          first_name: firstName,
          city: city,
          profession: profession,
          id_type: idType,
          id_number: idNumber,
          phone: phone,
          country: selectedCountry!.code, // Utilisation de ! car déjà vérifié plus haut
          phone_code: selectedCountry!.phoneCode // Utilisation de ! car déjà vérifié plus haut
        }
        
        // Ajouter l'URL du document si disponible
        if (idDocumentUrl) {
          profileData.id_document_url = idDocumentUrl
        }
        
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(profileData)

        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError)
          // On continue quand même, car le compte est créé
          // L'utilisateur pourra compléter son profil plus tard
        }
        
        // Redirection vers la page de vérification
        router.push("/auth/pending")
      } else {
        setErrors({ ...errors, general: "Compte créé mais utilisateur non disponible" })
      }
    } catch (err) {
      console.error('Erreur d\'inscription:', err)
      setErrors({ ...errors, general: "Une erreur s'est produite lors de l'inscription" })
    } finally {
      setLoading(false)
    }
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
        <Card className="w-full max-w-6xl shadow-lg border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Créer votre compte bancaire</CardTitle>
            <CardDescription>
              Remplissez vos informations personnelles pour ouvrir votre compte Corix Finanza
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
                {/* Colonne gauche - Informations personnelles */}
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
                      placeholder="Entrez votre nom de famille" 
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
                      placeholder="Entrez votre prénom" 
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
                      placeholder="Entrez votre ville" 
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
                      placeholder="Ex: Ingénieur, Enseignant, Commerçant..." 
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
                      placeholder="votre@email.com" 
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

                {/* Colonne droite - Informations d'identité et sécurité */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground border-b pb-2">Informations d'identité et sécurité</h3>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Type de pièce d'identité *
                    </label>
                    
                    {/* Sélecteur personnalisé */}
                    <div className="relative">
                      <div className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-sm cursor-pointer hover:border-accent/50 shadow-sm flex items-center justify-between"
                           onClick={() => setIsSelectOpen(!isSelectOpen)}
                      >
                        <div className="flex items-center gap-3">
                          {idType ? (
                            <>
                              {getIconComponent(idType)}
                              <span className="font-medium">{idTypes.find(t => t.value === idType)?.label}</span>
                            </>
                          ) : (
                            <>
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Sélectionnez un type de document</span>
                            </>
                          )}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isSelectOpen ? "rotate-180" : ""}`} />
                      </div>
                      
                      {/* Menu déroulant */}
                      {isSelectOpen && (
                        <div className="absolute z-10 w-full mt-1 border border-input rounded-lg bg-background shadow-lg">
                          {idTypes.map((type) => (
                            <div
                              key={type.value}
                              className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-accent/5 ${idType === type.value ? "bg-accent/10" : ""}`}
                              onClick={() => {
                                setIdType(type.value);
                                setIsSelectOpen(false);
                              }}
                            >
                              {getIconComponent(type.value)}
                              <span className="text-sm">{type.label}</span>
                              {idType === type.value && (
                                <div className="ml-auto">
                                  <div className="w-2 h-2 rounded-full bg-accent" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Aide visuelle */}
                    <div className="text-xs text-muted-foreground">
                      {idType && (
                        <div className="flex items-center gap-2 text-accent">
                          <FileText className="w-3 h-3" />
                          {idType === "passport" && "Document de voyage international requis"}
                          {idType === "id_card" && "Document officiel d'identité nationale"}
                          {idType === "driving_license" && "Permis de conduire officiel valide"}
                          {idType === "residence_permit" && "Autorisation de séjour en cours de validité"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Numéro de pièce d'identité *
                    </label>
                    <div className="relative">
                      <Input 
                        placeholder="Ex: AB123456, 12AB345678, etc." 
                        value={idNumber}
                        onChange={(e) => {
                          setIdNumber(e.target.value)
                          handleFieldChange('idNumber', e.target.value, validateIdNumber)
                        }}
                        onBlur={() => handleFieldChange('idNumber', idNumber, validateIdNumber)}
                        className="pl-10"
                        required
                        data-error={errors.idNumber ? "true" : "false"}
                      />
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {errors.idNumber && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.idNumber}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Entrez le numéro exact tel qu'il apparaît sur votre document
                    </p>
                  </div>

                  {/* Champ de téléchargement du document */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Document d'identité *
                    </label>
                    <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-accent/50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Téléchargez votre pièce d'identité
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Formats acceptés : JPG, PNG, PDF (max 5MB)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Le document doit être lisible et en couleur
                          </p>
                        </div>
                        <input
                          type="file"
                          id="id-document"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileSelect}
                        />
                        
                        {/* Affichage du fichier sélectionné */}
                        {idFile && (
                          <div className="mt-2 p-2 bg-secondary/30 rounded-lg w-full">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-accent" />
                                <span className="text-xs font-medium text-foreground truncate max-w-[180px]">
                                  {idFile.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({(idFile.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setIdFile(null)}
                                className="h-6 px-2 text-xs"
                              >
                                ×
                              </Button>
                            </div>
                            
                            {/* Barre de progression */}
                            {isUploading && uploadProgress > 0 && (
                              <div className="mt-2">
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-accent rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-center text-muted-foreground mt-1">
                                  Téléchargement en cours... {uploadProgress}%
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById('id-document')?.click()}
                          disabled={isUploading}
                        >
                          {idFile ? 'Changer de fichier' : 'Choisir un fichier'}
                        </Button>
                      </div>
                    </div>
                    {errors.idFile && (
                      <p className="text-destructive text-xs flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive"></span>
                        {errors.idFile}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Requis pour la vérification de votre compte bancaire
                    </p>
                  </div>

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
                        placeholder="Créez un mot de passe" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Au moins 8 caractères, une majuscule et un chiffre
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Confirmer le mot de passe *</label>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirmez votre mot de passe" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section conditions et soumission */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-start gap-2 mb-4">
                  <input 
                    type="checkbox" 
                    className="mt-1" 
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                    id="terms-checkbox"
                  />
                  <label htmlFor="terms-checkbox" className="text-sm text-muted-foreground cursor-pointer">
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
                      Votre compte sera activé après vérification de vos documents.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={loading || !!errors.phone}
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
