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
      <div className="flex">
        <div className="w-9 h-6 bg-[#EB001B] rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10">MC</div>
        <div className="w-9 h-6 bg-[#F79E1B] rounded-full -ml-5 flex items-center justify-center text-[10px] font-bold text-white/90">MC</div>
      </div>
    )
  }
  return <div className="text-white font-bold text-xl tracking-widest">VISA</div>
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
  const displayNumber = showFull ? cardNumber : `•••• •••• •••• ${last4}`

  return (
    <div className="relative w-full max-w-sm mx-auto [transform:rotate(-2deg)] hover:[transform:rotate(0deg)] transition-transform duration-500">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1a2338] via-[#0f172a] to-[#2a1b47] p-6 aspect-[1.586/1] flex flex-col justify-between border border-white/10">
        
        {/* Light effects */}
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

        {/* Top bar */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-2xl flex items-center justify-center">
              <span className="text-[#E8622C] font-bold text-2xl">C</span>
            </div>
            <div>
              <p className="text-white font-semibold tracking-wider">CORIX FINANZA</p>
              <p className="text-[10px] text-white/60 -mt-1">VIRTUAL CARD</p>
            </div>
          </div>
          <Wifi className="w-6 h-6 text-white/70" />
        </div>

        {/* Chip */}
        <div className="w-14 h-10 bg-gradient-to-br from-amber-300 to-yellow-600 rounded-lg shadow-inner relative">
          <div className="absolute inset-[3px] bg-[#1a2338] rounded grid grid-cols-4 grid-rows-2 gap-px p-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/10 rounded-sm" />
            ))}
          </div>
        </div>

        {/* Card Number */}
        <div className="font-mono text-xl tracking-[3px] text-white">
          {displayNumber}
        </div>

        {/* Bottom section */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-white/60">TITULAIRE</p>
            <p className="text-white font-medium tracking-wide text-sm">{holderName}</p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-white/60">EXPIRE</p>
            <p className="text-white font-medium">{expiryDate}</p>
          </div>

          <CardLogo cardType={cardType} />
        </div>

        {isVirtual && (
          <Badge className="absolute top-6 right-6 bg-white/10 text-white text-xs px-2.5 py-0.5">
            VIRTUELLE
          </Badge>
        )}

        {isBlocked && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-12 h-12 text-red-500 mx-auto mb-2" />
              <p className="text-white font-medium">Carte Bloquée</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function BankCard(props: BankCardProps) {
  const {
    cardNumber = "4521 8765 4321 9876",
    holderName = "BON KENNEDY",
    expiryDate = "12/28",
    cvv = "123",
    balance = 2450,
    cardType = "mastercard",
    isVirtual = true,
    isBlocked = false,
    variant = "full"
  } = props

  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState("")

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 1800)
  }

  return (
    <div className="w-full">
      <CardFace
        cardNumber={cardNumber}
        holderName={holderName}
        expiryDate={expiryDate}
        cardType={cardType}
        isVirtual={isVirtual}
        isBlocked={isBlocked}
        showFull={showDetails}
      />

      {variant === "full" && (
        <div className="flex justify-center gap-3 mt-6">
          <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
            {showDetails ? "Masquer" : "Voir détails"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleCopy(cardNumber.replace(/\s/g, ""), "number")}>
            <Copy className="mr-2" />
            {copied === "number" ? "Copié !" : "Copier numéro"}
          </Button>
        </div>
      )}
    </div>
  )
}
