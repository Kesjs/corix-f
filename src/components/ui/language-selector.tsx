"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

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
}

export function LanguageSelector({ variant = "header" }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language: currentLanguage, setLanguage } = useLanguage()
  
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language.code as "fr" | "es" | "en")
    setIsOpen(false)
  }

  if (variant === "simple") {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-border hover:bg-secondary/50 transition-colors cursor-pointer min-h-[44px]"
          style={{ touchAction: "manipulation" }}
          aria-label={`Changer la langue. Actuellement : ${selectedLanguage.name}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="relative w-5 h-4">
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              fill
              className="object-cover rounded-sm"
              sizes="20px"
            />
          </div>
          <span className="text-sm font-medium">{selectedLanguage.code.toUpperCase()}</span>
          <ChevronDown className={cn(
            "w-3 h-3 transition-transform",
            isOpen && "rotate-180"
          )} />
        </button>

        {isOpen && (
          <>
            {/* Backdrop blur for mobile */}
            <div 
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
              style={{ touchAction: "manipulation" }}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer",
                      selectedLanguage.code === language.code && "bg-accent/10",
                      "min-h-[44px]"
                    )}
                    style={{ touchAction: "manipulation" }}
                    aria-label={`Changer la langue en ${language.name}`}
                    aria-current={selectedLanguage.code === language.code ? "true" : "false"}
                  >
                    <div className="relative w-6 h-5 flex-shrink-0">
                      <Image
                        src={language.flag}
                        alt={language.name}
                        fill
                        className="object-cover rounded-sm"
                        sizes="24px"
                      />
                    </div>
                    <div className="flex flex-col items-start flex-1">
                      <span className="text-sm font-medium">{language.name}</span>
                      <span className="text-xs text-muted-foreground">{language.code.toUpperCase()}</span>
                    </div>
                    {selectedLanguage.code === language.code && (
                      <div className="ml-auto w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === "dropdown") {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-border hover:bg-secondary/50 transition-colors cursor-pointer min-h-[44px] min-w-[120px]"
          style={{ touchAction: "manipulation" }}
          aria-label={`Changer la langue. Actuellement : ${selectedLanguage.name}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="relative w-5 h-4">
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              fill
              className="object-cover rounded-sm"
              sizes="20px"
            />
          </div>
          <span className="text-sm font-medium hidden sm:block">{selectedLanguage.name}</span>
          <span className="text-sm font-medium sm:hidden">{selectedLanguage.code.toUpperCase()}</span>
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )} />
        </button>

        {isOpen && (
          <>
            {/* Backdrop blur for mobile */}
            <div 
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              style={{ touchAction: "manipulation" }}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer",
                      selectedLanguage.code === language.code && "bg-accent/10",
                      "min-h-[44px]"
                    )}
                    style={{ touchAction: "manipulation" }}
                    aria-label={`Changer la langue en ${language.name}`}
                    aria-current={selectedLanguage.code === language.code ? "true" : "false"}
                  >
                    <div className="relative w-6 h-5 flex-shrink-0">
                      <Image
                        src={language.flag}
                        alt={language.name}
                        fill
                        className="object-cover rounded-sm"
                        sizes="24px"
                      />
                    </div>
                    <div className="flex flex-col items-start flex-1">
                      <span className="text-sm font-medium">{language.name}</span>
                      <span className="text-xs text-muted-foreground">{language.code.toUpperCase()}</span>
                    </div>
                    {selectedLanguage.code === language.code && (
                      <div className="ml-auto w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  // Variant "header" (par défaut)
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[32px] min-w-[64px]"
        style={{ touchAction: "manipulation" }}
        aria-label={`Changer la langue. Actuellement : ${selectedLanguage.name}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-1.5">
          <div className="relative w-5 h-4">
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              fill
              className="object-cover rounded-sm"
              sizes="20px"
            />
          </div>
          <span>{selectedLanguage.code.toUpperCase()}</span>
        </div>
        <ChevronDown className={cn(
          "w-3 h-3 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop blur for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            style={{ touchAction: "manipulation" }}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-secondary/50 transition-colors cursor-pointer min-h-[44px]"
                  style={{ touchAction: "manipulation" }}
                  aria-label={`Changer la langue en ${language.name}`}
                  aria-current={selectedLanguage.code === language.code ? "true" : "false"}
                >
                  <div className="relative w-5 h-4 flex-shrink-0">
                    <Image
                      src={language.flag}
                      alt={language.name}
                      fill
                      className="object-cover rounded-sm"
                      sizes="20px"
                    />
                  </div>
                  <span className="font-medium flex-1">{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <div className="ml-auto w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}