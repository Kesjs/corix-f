"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Language = {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "fr", name: "Français", flag: "/fr.png" },
  { code: "es", name: "Español", flag: "/esp.png" },
  { code: "en", name: "English", flag: "/usa.png" },
]

interface LanguageSelectorProps {
  variant?: "header" | "dropdown" | "simple"
  className?: string
}

export function LanguageSelector({ variant = "header", className }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    // Ici, vous pourriez ajouter la logique pour changer la langue de l'application
    console.log(`Langue sélectionnée: ${language.code}`)
  }

  if (variant === "simple") {
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-5 h-4">
          <Image
            src={selectedLanguage.flag}
            alt={selectedLanguage.name}
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <span className="text-sm font-medium">{selectedLanguage.code.toUpperCase()}</span>
      </div>
    )
  }

  if (variant === "dropdown") {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-border hover:bg-secondary/50 transition-colors"
        >
          <div className="relative w-5 h-4">
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <span className="text-sm font-medium">{selectedLanguage.name}</span>
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary/50 transition-colors",
                  selectedLanguage.code === language.code && "bg-accent/10"
                )}
              >
                <div className="relative w-6 h-5">
                  <Image
                    src={language.flag}
                    alt={language.name}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{language.name}</span>
                  <span className="text-xs text-muted-foreground">{language.code.toUpperCase()}</span>
                </div>
                {selectedLanguage.code === language.code && (
                  <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Variant "header" (par défaut)
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <div className="flex items-center gap-1.5">
          <div className="relative w-5 h-4">
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <span>{selectedLanguage.code.toUpperCase()}</span>
        </div>
        <ChevronDown className="w-3 h-3" />
      </button>
      
      <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors"
            >
              <div className="relative w-5 h-4">
                <Image
                  src={language.flag}
                  alt={language.name}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <span className="font-medium">{language.name}</span>
              {selectedLanguage.code === language.code && (
                <div className="ml-auto w-1.5 h-1.5 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}