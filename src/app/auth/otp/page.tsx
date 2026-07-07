"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function OTPPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Logo />
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          FR
          <ChevronDown className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Vérification</CardTitle>
            <CardDescription>
              Entrez le code envoyé au <span className="font-medium text-foreground">+221 77 123 45 67</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border border-input rounded-xl bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                />
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Renvoyer le code dans <span className="font-medium text-foreground">00:45</span>
            </p>

            <Button className="w-full" size="lg">
              Vérifier
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Code non reçu ?{" "}
              <button className="text-accent hover:underline font-medium">
                Renvoyer
              </button>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
