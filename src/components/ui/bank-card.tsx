"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, Eye, EyeOff, Copy, MoreVertical, 
  Wifi, Zap, Shield, Lock, QrCode
} from "lucide-react"

interface BankCardProps {
  cardNumber?: string
  holderName?: string
  expiryDate?: string
  cvv?: string
  balance?: number
  cardType?: "visa" | "mastercard" | "amex"
  cardStyle?: "classic" | "premium" | "black"
  isVirtual?: boolean
  isBlocked?: boolean
  variant?: "full" | "compact"
}

export function BankCard({
  cardNumber = "4521 **** **** 9876",
  holderName = "JOHN DOE",
  expiryDate = "12/28",
  cvv = "123",
  balance = 2450.00,
  cardType = "visa",
  cardStyle = "premium",
  isVirtual = false,
  isBlocked = false,
  variant = "full"
}: BankCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState("")

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  const getCardGradient = () => {
    switch(cardStyle) {
      case "classic":
        return "from-blue-600 to-blue-800"
      case "premium":
        return "from-purple-600 via-indigo-700 to-blue-800"
      case "black":
        return "from-gray-800 to-black"
      default:
        return "from-blue-600 to-purple-800"
    }
  }

  const getCardLogo = () => {
    switch(cardType) {
      case "visa":
        return (
          <div className="text-white font-bold text-xl italic tracking-wider">
            VISA
          </div>
        )
      case "mastercard":
        return (
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-red-500 rounded-full opacity-90" />
            <div className="w-6 h-6 bg-yellow-500 rounded-full -ml-3 opacity-90" />
          </div>
        )
      case "amex":
        return (
          <div className="text-white font-bold text-lg tracking-wider">
            AMEX
          </div>
        )
      default:
        return null
    }
  }

  if (variant === "compact") {
    return (
      <Card className="w-full max-w-sm overflow-hidden">
        <CardContent className={`p-6 bg-gradient-to-br ${getCardGradient()} text-white relative`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Corix Finanza</p>
                  {isVirtual && (
                    <Badge className="bg-white/20 text-white text-xs">
                      Virtuelle
                    </Badge>
                  )}
                </div>
              </div>
              {getCardLogo()}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-2xl font-mono tracking-wider">
                  {showDetails ? cardNumber : "4521 •••• •••• 9876"}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-70 mb-1">Solde disponible</p>
                  <p className="text-lg font-bold">{balance.toLocaleString()} €</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-white hover:bg-white/10"
                >
                  {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card */}
      <Card className="overflow-hidden mb-4 transform hover:scale-105 transition-all duration-300 shadow-2xl">
        <CardContent className={`p-0 bg-gradient-to-br ${getCardGradient()} text-white relative h-56`}>
          {/* Background Elements */}
          <div className="absolute inset-0">
            {/* Chip Pattern */}
            <div className="absolute top-6 left-6 w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md" />
            
            {/* Contactless Symbol */}
            <div className="absolute top-6 right-20">
              <Wifi className="w-6 h-6 rotate-90 opacity-60" />
            </div>
            
            {/* Decorative Circles */}
            <div className="absolute top-8 right-8 w-24 h-24 border border-white/20 rounded-full" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/10 rounded-full" />
            <div className="absolute bottom-12 right-12 w-32 h-32 border border-white/5 rounded-full" />
            
            {/* Security Features */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-60">
              <Shield className="w-3 h-3" />
              <span className="text-xs">Secure</span>
            </div>
          </div>

          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">C</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Corix Finanza</p>
                  <p className="text-xs opacity-70">Premium Card</p>
                </div>
              </div>
              {getCardLogo()}
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <p className="text-2xl font-mono tracking-wider font-medium">
                {showDetails ? cardNumber : "4521 •••• •••• 9876"}
              </p>
              {isVirtual && (
                <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur px-2 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  <span className="text-xs">Carte Virtuelle</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div>
                  <p className="text-xs opacity-70 uppercase tracking-wide">Titulaire</p>
                  <p className="text-sm font-medium tracking-wide">{holderName}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div>
                  <p className="text-xs opacity-70 uppercase tracking-wide">Expire</p>
                  <p className="text-sm font-medium font-mono">{expiryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blocked Overlay */}
          {isBlocked && (
            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-red-500/90 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="font-medium">Carte bloquée</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2"
        >
          {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showDetails ? "Masquer" : "Voir"}
        </Button>

        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleCopy(cardNumber.replace(/\s/g, ''), 'number')}
          className="flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied === 'number' ? 'Copié!' : 'Copier'}
        </Button>

        <Button variant="outline" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Card Details */}
      {showDetails && (
        <Card className="mt-4 animate-in fade-in-50 slide-in-from-top-2">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Numéro complet</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                    {cardNumber}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(cardNumber.replace(/\s/g, ''), 'number')}
                    className="h-6 w-6"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">CVV</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                    {cvv}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(cvv, 'cvv')}
                    className="h-6 w-6"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Type de carte:</span>
                <span className="font-medium capitalize">{cardType} {cardStyle}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Statut:</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isBlocked ? 'bg-red-500' : 'bg-green-500'}`} />
                  <span className="font-medium">{isBlocked ? 'Bloquée' : 'Active'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}