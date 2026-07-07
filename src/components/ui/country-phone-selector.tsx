"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Country = {
  code: string
  name: string
  flag: string
  phoneCode: string
  phonePattern: string
  phoneLength: number
  example: string
}

const countries: Country[] = [
  {
    code: "es",
    name: "Espagne",
    flag: "/esp.png",
    phoneCode: "+34",
    phonePattern: "^\\+34[0-9]{9}$",
    phoneLength: 9,
    example: "+34 612 345 678"
  },
  {
    code: "fr", 
    name: "France",
    flag: "/fr.png",
    phoneCode: "+33",
    phonePattern: "^\\+33[0-9]{9}$",
    phoneLength: 9,
    example: "+33 612 345 678"
  },
  {
    code: "us",
    name: "États-Unis",
    flag: "/usa.png",
    phoneCode: "+1",
    phonePattern: "^\\+1[0-9]{10}$",
    phoneLength: 10,
    example: "+1 202 555 0145"
  }
]

interface CountryPhoneSelectorProps {
  value: string
  onChange: (phone: string, country: Country) => void
  error?: string
}

export function CountryPhoneSelector({ value, onChange, error }: CountryPhoneSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]) // Espagne par défaut
  const [isOpen, setIsOpen] = useState(false)
  const [localValue, setLocalValue] = useState("")

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    
    // Mettre à jour la valeur avec le code du pays
    const phoneWithoutCode = localValue.replace(/^\+\d+\s*/, "")
    const newValue = country.phoneCode + phoneWithoutCode
    setLocalValue(newValue)
    onChange(newValue, country)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Nettoyer l'entrée
    let cleanValue = inputValue.replace(/[^\d+]/g, '')
    
    // S'assurer que ça commence par le code du pays sélectionné
    if (!cleanValue.startsWith(selectedCountry.phoneCode)) {
      cleanValue = selectedCountry.phoneCode + cleanValue.replace(/^\+\d+/, '')
    }
    
    // Limiter la longueur
    const maxLength = selectedCountry.phoneCode.length + selectedCountry.phoneLength
    if (cleanValue.length > maxLength) {
      cleanValue = cleanValue.substring(0, maxLength)
    }
    
    // Formater pour l'affichage
    let formattedValue = cleanValue
    if (cleanValue.length > selectedCountry.phoneCode.length) {
      const code = cleanValue.substring(0, selectedCountry.phoneCode.length)
      const number = cleanValue.substring(selectedCountry.phoneCode.length)
      formattedValue = `${code} ${number.match(/.{1,3}/g)?.join(' ') || number}`
    }
    
    setLocalValue(formattedValue)
    onChange(cleanValue, selectedCountry)
  }

  const validatePhone = (phone: string, country: Country): boolean => {
    const regex = new RegExp(country.phonePattern)
    return regex.test(phone)
  }

  const isPhoneComplete = (phone: string, country: Country): boolean => {
    if (!phone || phone === country.phoneCode) return false
    const numberPart = phone.substring(country.phoneCode.length)
    return numberPart.length === country.phoneLength
  }

  const getPhoneError = (phone: string, country: Country): string | null => {
    if (!phone || phone === country.phoneCode) return null
    
    if (!phone.startsWith(country.phoneCode)) {
      return `Le numéro doit commencer par ${country.phoneCode}`
    }
    
    const numberPart = phone.substring(country.phoneCode.length)
    const expectedLength = country.phoneLength
    
    // Si l'utilisateur a commencé à saisir mais n'a pas terminé
    if (numberPart.length > 0 && numberPart.length < expectedLength) {
      return `Il manque ${expectedLength - numberPart.length} chiffre(s)`
    }
    
    if (numberPart.length > expectedLength) {
      return `Trop de chiffres (${expectedLength} attendus)`
    }
    
    if (!validatePhone(phone, country)) {
      return `Format invalide. Exemple: ${country.example}`
    }
    
    return null
  }

  const cleanPhone = localValue.replace(/\s/g, '')
  const currentError = getPhoneError(cleanPhone, selectedCountry)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Numéro de téléphone</label>
      
      <div className="relative">
        <div className="flex gap-2">
          {/* Sélecteur de pays */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white hover:bg-secondary/50 transition-colors w-32"
            >
              <div className="relative w-6 h-4">
                <Image
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <span className="text-sm font-medium">{selectedCountry.phoneCode}</span>
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform ml-auto",
                isOpen && "rotate-180"
              )} />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary/50 transition-colors",
                      selectedCountry.code === country.code && "bg-accent/10"
                    )}
                  >
                    <div className="relative w-6 h-4">
                      <Image
                        src={country.flag}
                        alt={country.name}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{country.name}</span>
                      <span className="text-xs text-muted-foreground">{country.phoneCode}</span>
                    </div>
                    {selectedCountry.code === country.code && (
                      <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Champ téléphone */}
          <div className="flex-1 relative">
            <input
              type="tel"
              value={localValue}
              onChange={handlePhoneChange}
              placeholder={selectedCountry.example}
              className={cn(
                "w-full px-3 py-2 rounded-lg border transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                (error || (currentError && cleanPhone !== selectedCountry.phoneCode))
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-accent"
              )}
            />
            {currentError && cleanPhone !== selectedCountry.phoneCode && (
              <div className="absolute -bottom-6 left-0 text-xs text-destructive">
                {currentError}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guide de format */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success/10 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
          </div>
          <span>Exemple: {selectedCountry.example}</span>
        </div>
        <div className="text-muted-foreground/70">
          {selectedCountry.phoneLength} chiffres après {selectedCountry.phoneCode}
        </div>
      </div>

      {/* Message d'erreur global */}
      {error && (
        <div className="text-sm text-destructive mt-1">
          {error}
        </div>
      )}
    </div>
  )
}