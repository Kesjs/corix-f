"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Copy, MoreVertical, Wifi, Lock } from "lucide-react"

interface BankCardProps {
  cardNumber?: string
  holderName?: string
  expiryDate?: string
  cvv?: string
  balance?: number
  cardType?: "visa" | "mastercard"
  isVirtual?: boolean
  isBlocked?: boolean
  variant?: "full" | "compact"
}

function CardLogo({ cardType }: { cardType: "visa" | "mastercard" }) {
  if (cardType === "mastercard") {
    return (
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-[#EB001B] opacity-90" />
        <div className="w-7 h-7 rounded-full bg-[#F79E1B] opacity-90 -ml-3.5 mix-blend-screen" />
      </div>
    )
  }
  return <div className="text-white font-bold text-xl italic tracking-wide">VISA</div>
}

function CardFace({
  cardNumber,
  holderName,
  expiryDate,
  cardType,
  isVirtual,
  isBlocked,
  showFull,
}: {
  cardNumber: string
  holderName: string
  expiryDate: string
  cardType: "visa" | "mastercard"
  isVirtual?: boolean
  isBlocked?: boolean
  showFull: boolean
}) {
  const last4 = cardNumber.replace(/\s/g, "").slice(-4)
  const displayNumber = showFull
    ? cardNumber
    : `•••• •••• •••• ${last4}`

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#132C52] to-[#0B1F3A] p-5 aspect-[1.586/1] flex flex-col justify-between shadow-xl">
      {/* Ambient light circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/[0.03] blur-xl" />

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white/10 rounded-md flex items-center justify-center">
            <span className="text-[#E8622C] font-bold text-xs">C</span>
          </div>
          <span className="text-white text-sm font-medium tracking-wide">CORIX FINANZA</span>
        </div>
        <Wifi className="w-5 h-5 text-white/70 rotate-90" />
      </div>

      {/* Chip */}
      <div className="relative z-10">
        <div className="w-11 h-8 rounded-md bg-gradient-to-br from-[#F4D896] via-[#D9B361] to-[#C09A3E] relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-px p-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-black/10 rounded-[1px]" />
            ))}
          </div>
        </div>
      </div>

      {/* Number */}
      <div className="relative z-10">
        <p className="text-white text-lg md:text-xl font-mono tracking-[0.15em]">{displayNumber}</p>
        {isVirtual && (
          <Badge className="mt-2 bg-white/10 text-white/90 border-0 text-[10px] px-2 py-0.5">
            Virtuelle
          </Badge>
        )}
      </div>

      {/* Bottom row */}
      <div className="relative z-10 flex items-end justify-between">
        <div>
          <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Titulaire</p>
          <p className="text-white text-sm font-medium tracking-wide">{holderName}</p>
        </div>
        <div className="flex items-end gap-4">
          <div className="text-right">
            <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Expire</p>
            <p className="text-white text-sm font-mono">{expiryDate}</p>
          </div>
          <CardLogo cardType={cardType} />
        </div>
      </div>

      {isBlocked && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-red-500/90 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="font-medium text-sm">Carte bloquée</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function BankCard({
  cardNumber = "4521 8765 4321 9876",
  holderName = "UTILISATEUR",
  expiryDate = "12/28",
  cvv = "123",
  balance = 0,
  cardType = "visa",
  isVirtual = false,
  isBlocked = false,
  variant = "full",
}: BankCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState("")

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  if (variant === "compact") {
    return (
      <div className="w-full max-w-sm">
        <CardFace
          cardNumber={cardNumber}
          holderName={holderName}
          expiryDate={expiryDate}
          cardType={cardType}
          isVirtual={isVirtual}
          isBlocked={isBlocked}
          showFull={showDetails}
        />
        <div className="flex items-center justify-between mt-3 px-1">
          <div>
            <p className="text-xs text-muted-foreground">Solde disponible</p>
            <p className="text-base font-bold tabular-nums">{balance.toLocaleString("fr-FR")} €</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <CardFace
        cardNumber={cardNumber}
        holderName={holderName}
        expiryDate={expiryDate}
        cardType={cardType}
        isVirtual={isVirtual}
        isBlocked={isBlocked}
        showFull={showDetails}
      />

      <div className="grid grid-cols-3 gap-3 mt-4">
        <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)} className="flex items-center gap-2">
          {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showDetails ? "Masquer" : "Voir"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopy(cardNumber.replace(/\s/g, ""), "number")}
          className="flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied === "number" ? "Copié !" : "Copier"}
        </Button>
        <Button variant="outline" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {showDetails && (
        <Card className="mt-4">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Numéro complet</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono bg-secondary px-2 py-1 rounded">{cardNumber}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(cardNumber.replace(/\s/g, ""), "number")} className="h-6 w-6">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">CVV</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono bg-secondary px-2 py-1 rounded">{cvv}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(cvv, "cvv")} className="h-6 w-6">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Type de carte :</span>
                <span className="font-medium capitalize">{cardType}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Statut :</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isBlocked ? "bg-red-500" : "bg-green-500"}`} />
                  <span className="font-medium">{isBlocked ? "Bloquée" : "Active"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
