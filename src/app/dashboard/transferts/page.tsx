"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Search, Plus, QrCode, Building2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function TransfertsPage() {
  const [amount, setAmount] = useState("")
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const { t } = useLanguage()

  const recentContacts = [
    { id: 1, name: "Kossi A.", phone: "+221 77 123 45 67", avatar: "K" },
    { id: 2, name: "Marie D.", phone: "+221 78 234 56 78", avatar: "M" },
    { id: 3, name: "Jean-Pierre M.", phone: "+221 76 345 67 89", avatar: "J" },
  ]

  const handleConfirm = () => {
    console.log("Transfert validé vers", selectedContact?.name, "Montant:", amount, "OTP:", otp)
    setIsConfirmOpen(false)
    setAmount("")
    setSelectedContact(null)
    setOtp("")
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <h1 className="text-xl font-semibold text-primary">Transferts</h1>
      </header>

      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder={t("placeholder.searchContact")} className="pl-10" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">Contacts récents</h2>
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`shadow-sm cursor-pointer hover:shadow-md transition-all ${
                    selectedContact?.id === contact.id ? "ring-2 ring-accent" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center font-bold text-primary">
                      {contact.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Nouveau bénéficiaire</p>
                <p className="text-sm text-muted-foreground">Ajouter un nouveau contact</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-sm cursor-pointer hover:shadow-md text-center p-4">
              <QrCode className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Scanner QR</p>
            </Card>
            <Card className="shadow-sm cursor-pointer hover:shadow-md text-center p-4">
              <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Vers banque</p>
            </Card>
          </div>

          {selectedContact && (
            <Card className="shadow-sm border-accent/20">
              <CardHeader><CardTitle>Vers {selectedContact.name}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="number"
                  placeholder="Montant (€)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl font-bold text-center h-16"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total avec frais (1%)</span>
                  <span className="font-bold">{amount ? (parseFloat(amount) * 1.01).toFixed(2) : "0,00"} €</span>
                </div>
                <Button className="w-full" size="lg" disabled={!amount} onClick={() => setIsConfirmOpen(true)}>
                  Continuer
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Validation sécurisée</DialogTitle>
            <DialogDescription>
              Entrez votre code OTP à 6 chiffres pour confirmer le transfert de {(parseFloat(amount) * 1.01).toFixed(2)} €.
            </DialogDescription>
          </DialogHeader>
          <Input 
            type="text" 
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="000000" 
            value={otp} 
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '')
              setOtp(val)
            }} 
            className="text-center text-2xl tracking-[0.5em] h-14"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Annuler</Button>
            <Button onClick={handleConfirm} disabled={otp.length !== 6}>Confirmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
