"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Send, MessageCircle, User, Bot } from "lucide-react"

export default function SupportPage() {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  
  // Simulation d'une conversation
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMessages([...messages, { id: Date.now(), sender: "user", text: message }])
    setMessage("")
    // Ici, tu déclencherais l'appel à ton API de support
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <Navigation />

      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 md:hidden">
        <h1 className="text-xl font-semibold text-primary">Chat Support</h1>
      </header>

      <main className="p-4 md:p-8 h-[calc(100vh-64px)] flex flex-col">
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

        {/* Input Area */}
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
    </div>
  )
}
