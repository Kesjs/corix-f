"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Copy, Wifi, Lock } from "lucide-react"
import Image from "next/image"

interface BankCardProps {
  cardNumber?: string
  holderName?: string
  expiryDate?: string
  cvv?: string
  balance?: number
  isVirtual?: boolean
  isBlocked?: boolean
}

export function BankCard({
  cardNumber = "4521 8765 4321 9876",
  holderName = "BON KENNEDY",
  expiryDate = "12/28",
  cvv = "123",
  balance = 2450,
  isVirtual = true,
  isBlocked = false,
}: BankCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState("")

  const last4 = cardNumber.slice(-4)
  const displayNumber = showDetails ? cardNumber : `•••• •••• •••• ${last4}`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied("number")
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-[1.586/1] border border-white/10">
        
        {/* Texture fine */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* En-tête */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
          <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center shadow">
            <span className="text-black font-bold text-3xl">C</span>
          </div>
          <div>
            <p className="text-white font-semibold text-xl tracking-wider">CORIX FINANZA</p>
            {isVirtual && <p className="text-white/60 text-xs">CARTE VIRTUELLE</p>}
          </div>
        </div>

        {/* Logo Mastercard */}
        <div className="absolute top-6 right-6 z-10">
          <Image 
            src="/images/cards/mastercard-logo.png" 
            alt="Mastercard" 
            width={75} 
            height={48}
          />
        </div>

        {/* Chip Doré */}
        <div className="absolute top-24 left-6 w-16 h-11 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-700 rounded-xl shadow-inner border border-amber-200/30" />

        {/* Numéro */}
        <div className="absolute bottom-20 left-6 font-mono text-2xl text-white tracking-[3px]">
          {displayNumber}
        </div>

        {/* Infos bas */}
        <div className="absolute bottom-8 left-6">
          <p className="text-[10px] text-white/60">TITULAIRE</p>
          <p className="text-white font-medium tracking-wider text-lg">{holderName}</p>
        </div>

        <div className="absolute bottom-8 right-6 text-right">
          <p className="text-[10px] text-white/60">EXPIRE</p>
          <p className="text-white font-medium">{expiryDate}</p>
        </div>

        {isVirtual && (
          <Badge className="absolute top-20 right-6 bg-white/10 text-white text-xs px-3 py-1">
            VIRTUELLE
          </Badge>
        )}
      </div>

      {/* Boutons */}
      <div className="flex gap-3 mt-6">
        <Button variant="outline" className="flex-1" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
          {showDetails ? "Masquer" : "Voir détails"}
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => handleCopy(cardNumber)}>
          <Copy className="mr-2" />
          {copied ? "Copié !" : "Copier"}
        </Button>
      </div>
    </div>
  )
}
