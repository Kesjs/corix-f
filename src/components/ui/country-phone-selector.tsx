"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
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

const countries: Country[] = [
  {
    code: "es",
    name: "Espagne",
    flag: "/esp.png",
    phoneCode: "+34",
    phonePattern: "^[0-9]{9}$",
    phoneLength: 9,
    example: "+34 612 345 678"
  },
  {
    code: "fr", 
    name: "France",
    flag: "/fr.png",
    phoneCode: "+33",
    phonePattern: "^[0-9]{9}$",
    phoneLength: 9,
    example: "+33 6 12 34 56 78"
  },
  {
    code: "us",
    name: "États-Unis",
    flag: "/usa.png",
    phoneCode: "+1",
    phonePattern: "^[0-9]{10}$",
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
  const { t } = useLanguage()

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    
    // Garder seulement la partie numérique (sans indicatif)
    const numberOnly = localValue.replace(/^\+\d+\s*/, '')
    setLocalValue(numberOnly)
    onChange(country.phoneCode + numberOnly, country)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Nettoyer l'entrée (garder seulement les chiffres)
    let cleanValue = inputValue.replace(/[^\d]/g, '')
    
    // Limiter la longueur
    if (cleanValue.length > selectedCountry.phoneLength) {
      cleanValue = cleanValue.substring(0, selectedCountry.phoneLength)
    }
    
    // Formater pour l'affichage (avec espaces)
    let formattedValue = cleanValue
    if (cleanValue.length > 0) {
      formattedValue = cleanValue.match(/.{1,3}/g)?.join(' ') || cleanValue
    }
    
    setLocalValue(formattedValue)
    // Envoyer le numéro complet avec l'indicatif au parent
    onChange(selectedCountry.phoneCode + cleanValue, selectedCountry)
  }

  const validatePhone = (phone: string, country: Country): boolean => {
    const regex = new RegExp(country.phonePattern)
    return regex.test(phone)
  }

  const cleanPhone = localValue.replace(/\s/g, '')

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{t("placeholder.phone") || "Numéro de téléphone"}</label>
      
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
          <div className="flex-1">
            <input
              type="tel"
              value={localValue}
              onChange={handlePhoneChange}
              placeholder="612 345 678"
              className={cn(
                "w-full px-3 py-2 rounded-lg border transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                error
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-accent"
              )}
            />
          </div>
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