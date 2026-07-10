"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/ui/navigation"
import { ActionDialog } from "@/components/ui/action-dialog"
import { Send, Bot, User, MessageSquarePlus, Clock, CheckCircle2 } from "lucide-react"

export default function SupportPage() {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [message, setMessage] = useState("")

  // Simulation d'une conversation
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMessages([...messages, { id: Date.now(), sender: "user", text: message }])
    setMessage("")
  }

  const handleCreateTicket = () => {
    console.log("Nouveau ticket ouvert")
    setIsNewTicketOpen(false)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <h1 className="text-xl font-semibold text-primary">Chat Support</h1>
      </header>

      <main className="p-4 md:p-8 h-[calc(100vh-64px)] flex flex-col max-w-4xl mx-auto">
        
        {/* Header avec bouton nouveau */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Support</h1>
          <Button onClick={() => setIsNewTicketOpen(true)} className="gap-2">
            <MessageSquarePlus className="w-4 h-4" /> Nouveau ticket
          </Button>
        </div>

        {/* Zone de chat */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start gap-2 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === "user" ? "bg-accent" : "bg-secondary"}`}>
                  {msg.sender === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zone d'input */}
        <div className="flex gap-2 p-2 bg-card border rounded-lg">
          <Input 
            placeholder="Écrivez votre message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="border-0 focus-visible:ring-0"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </main>

      {/* Modale Nouveau Ticket via ActionDialog */}
      <ActionDialog
        open={isNewTicketOpen}
        onOpenChange={setIsNewTicketOpen}
        title="Ouvrir un nouveau ticket"
        description="Décrivez votre problème, notre équipe vous répondra rapidement."
        confirmLabel="Envoyer"
        onConfirm={handleCreateTicket}
        showCancel={true}
      >
        <div className="space-y-4">
          <Input placeholder="Sujet du ticket" />
          <Textarea placeholder="Votre message..." className="min-h-[120px]" />
        </div>
      </ActionDialog>
    </div>
  )
}
