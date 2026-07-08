"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Send, Paperclip, Search, Phone, Mail, MessageCircle, 
  Clock, CheckCircle2, AlertCircle, FileText, Image,
  ChevronLeft, MoreVertical, Star, Archive
} from "lucide-react"
import UserSidebar from "../components/sidebar"
import { useRouter } from "next/navigation"

interface Message {
  id: number
  content: string
  type: 'user' | 'admin'
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  attachments?: string[]
}

interface SupportTicket {
  id: number
  subject: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  created: string
  lastMessage: string
  unreadCount: number
  adminName?: string
}

export default function SupportPage() {
  const [user, setUser] = useState<any>(null)
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [newTicketSubject, setNewTicketSubject] = useState("")
  const [newTicketContent, setNewTicketContent] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Simuler les données
    setTickets([
      {
        id: 1,
        subject: "Problème de connexion",
        status: "in_progress",
        priority: "high",
        created: "2024-01-15 10:30",
        lastMessage: "Nous travaillons sur votre problème...",
        unreadCount: 2,
        adminName: "Marie Support"
      },
      {
        id: 2,
        subject: "Question sur les frais",
        status: "closed",
        priority: "low",
        created: "2024-01-10 14:20",
        lastMessage: "Merci pour votre réponse !",
        unreadCount: 0,
        adminName: "Jean Support"
      }
    ])
  }, [])

  useEffect(() => {
    if (selectedTicket) {
      // Simuler les messages du ticket
      setMessages([
        {
          id: 1,
          content: "Bonjour, j'ai un problème de connexion sur mon compte.",
          type: "user",
          timestamp: "2024-01-15 10:30",
          status: "read"
        },
        {
          id: 2,
          content: "Bonjour ! Je comprends votre problème. Pouvez-vous me dire quel navigateur vous utilisez ?",
          type: "admin",
          timestamp: "2024-01-15 11:15",
          status: "read"
        },
        {
          id: 3,
          content: "J'utilise Chrome version 120. Le problème persiste même après avoir vidé le cache.",
          type: "user",
          timestamp: "2024-01-15 11:30",
          status: "read"
        },
        {
          id: 4,
          content: "Nous travaillons sur une solution. Je vous tiendrai informé dans les plus brefs délais.",
          type: "admin",
          timestamp: "2024-01-15 14:00",
          status: "delivered"
        }
      ])
    }
  }, [selectedTicket])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTicket) {
      const message: Message = {
        id: messages.length + 1,
        content: newMessage,
        type: "user",
        timestamp: new Date().toISOString(),
        status: "sent"
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const createNewTicket = () => {
    if (newTicketSubject.trim() && newTicketContent.trim()) {
      const ticket: SupportTicket = {
        id: tickets.length + 1,
        subject: newTicketSubject,
        status: "open",
        priority: "medium",
        created: new Date().toISOString(),
        lastMessage: newTicketContent,
        unreadCount: 0
      }
      setTickets([ticket, ...tickets])
      setSelectedTicket(ticket.id)
      setNewTicketSubject("")
      setNewTicketContent("")
      setShowNewTicket(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'destructive'
      case 'in_progress': return 'warning'
      case 'closed': return 'success'
      default: return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'destructive'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'secondary'
    }
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <UserSidebar user={user} />
        
        {/* Mobile Header */}
        <div className="ml-0 md:ml-64">
          <div className="p-4 bg-card border-b border-border sticky top-0 z-10">
            <div className="flex items-center justify-between">
              {selectedTicket && !showNewTicket ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSelectedTicket(null)}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 text-center">
                    <h2 className="font-semibold text-primary">
                      {tickets.find(t => t.id === selectedTicket)?.subject}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {tickets.find(t => t.id === selectedTicket)?.adminName || 'Support'}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold text-primary">Support</h1>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => setShowNewTicket(true)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Nouveau
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Content */}
          <main className="p-4 pb-20">
            {selectedTicket && !showNewTicket ? (
              <MobileChat 
                messages={messages} 
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                messagesEndRef={messagesEndRef}
              />
            ) : showNewTicket ? (
              <MobileNewTicket
                subject={newTicketSubject}
                content={newTicketContent}
                setSubject={setNewTicketSubject}
                setContent={setNewTicketContent}
                onCreate={createNewTicket}
                onCancel={() => setShowNewTicket(false)}
              />
            ) : (
              <MobileTicketList 
                tickets={tickets}
                onSelectTicket={setSelectedTicket}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
              />
            )}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar user={user} />
      
      <main className="ml-64 p-6">
        {/* Desktop Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">Support & Assistance</h1>
            <p className="text-muted-foreground">Contactez notre équipe pour toute question</p>
          </div>
          <Button onClick={() => setShowNewTicket(true)}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Nouveau ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Tickets List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Mes tickets ({tickets.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto max-h-[600px]">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-secondary/50 ${
                    selectedTicket === ticket.id ? 'bg-accent/10 border-l-4 border-l-accent' : ''
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground line-clamp-1">{ticket.subject}</h3>
                    {ticket.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {ticket.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {ticket.lastMessage}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(ticket.status)} className="text-xs">
                        {ticket.status === 'open' ? 'Ouvert' :
                         ticket.status === 'in_progress' ? 'En cours' : 'Fermé'}
                      </Badge>
                      <Badge variant={getPriorityColor(ticket.priority)} className="text-xs">
                        {ticket.priority === 'high' ? 'Urgent' :
                         ticket.priority === 'medium' ? 'Normal' : 'Faible'}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{ticket.created}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedTicket && !showNewTicket ? (
              <DesktopChat 
                ticket={tickets.find(t => t.id === selectedTicket)!}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                messagesEndRef={messagesEndRef}
              />
            ) : showNewTicket ? (
              <DesktopNewTicket
                subject={newTicketSubject}
                content={newTicketContent}
                setSubject={setNewTicketSubject}
                setContent={setNewTicketContent}
                onCreate={createNewTicket}
                onCancel={() => setShowNewTicket(false)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Sélectionnez un ticket
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Choisissez un ticket existant pour voir la conversation ou créez-en un nouveau.
                </p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}

// Composants mobile
function MobileTicketList({ tickets, onSelectTicket, getStatusColor, getPriorityColor }: any) {
  return (
    <div className="space-y-3">
      {tickets.map((ticket: SupportTicket) => (
        <Card 
          key={ticket.id}
          className="cursor-pointer hover:shadow-md transition-all"
          onClick={() => onSelectTicket(ticket.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-foreground line-clamp-1">{ticket.subject}</h3>
              {ticket.unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {ticket.unreadCount}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {ticket.lastMessage}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(ticket.status)} className="text-xs">
                  {ticket.status === 'open' ? 'Ouvert' :
                   ticket.status === 'in_progress' ? 'En cours' : 'Fermé'}
                </Badge>
                <Badge variant={getPriorityColor(ticket.priority)} className="text-xs">
                  {ticket.priority === 'high' ? 'Urgent' :
                   ticket.priority === 'medium' ? 'Normal' : 'Faible'}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">{ticket.created}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function MobileChat({ messages, newMessage, setNewMessage, handleSendMessage, messagesEndRef }: any) {
  return (
    <>
      <div className="space-y-4 mb-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-70">{message.timestamp}</span>
                {message.type === 'user' && (
                  <div className="flex">
                    {message.status === 'sent' && <Clock className="w-3 h-3 opacity-70" />}
                    {message.status === 'delivered' && <CheckCircle2 className="w-3 h-3 opacity-70" />}
                    {message.status === 'read' && <CheckCircle2 className="w-3 h-3 text-accent" />}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="w-4 h-4" />
          </Button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-input rounded-lg bg-background"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}

function MobileNewTicket({ subject, content, setSubject, setContent, onCreate, onCancel }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Sujet</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Décrivez brièvement votre problème"
          className="w-full px-4 py-2 border border-input rounded-lg bg-background"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Décrivez votre problème en détail..."
          rows={6}
          className="w-full px-4 py-2 border border-input rounded-lg bg-background"
        />
      </div>
      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Annuler
        </Button>
        <Button onClick={onCreate} disabled={!subject.trim() || !content.trim()} className="flex-1">
          Créer le ticket
        </Button>
      </div>
    </div>
  )
}

// Composants desktop
function DesktopChat({ ticket, messages, newMessage, setNewMessage, handleSendMessage, messagesEndRef }: any) {
  return (
    <>
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {ticket.subject}
              <Badge variant={ticket.status === 'open' ? 'destructive' : 
                             ticket.status === 'in_progress' ? 'warning' : 'success'}>
                {ticket.status === 'open' ? 'Ouvert' :
                 ticket.status === 'in_progress' ? 'En cours' : 'Fermé'}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Ticket #{ticket.id} • {ticket.adminName || 'Support'}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-2" />
            Archiver
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <p>{message.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                  {message.type === 'user' && (
                    <div className="flex">
                      {message.status === 'sent' && <Clock className="w-3 h-3 opacity-70" />}
                      {message.status === 'delivered' && <CheckCircle2 className="w-3 h-3 opacity-70" />}
                      {message.status === 'read' && <CheckCircle2 className="w-3 h-3 text-accent" />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Paperclip className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-2 border border-input rounded-lg bg-background"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  )
}

function DesktopNewTicket({ subject, content, setSubject, setContent, onCreate, onCancel }: any) {
  return (
    <>
      <CardHeader>
        <CardTitle>Nouveau ticket de support</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Sujet</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Décrivez brièvement votre problème"
            className="w-full px-4 py-2 border border-input rounded-lg bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Décrivez votre problème en détail..."
            rows={10}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button onClick={onCreate} disabled={!subject.trim() || !content.trim()}>
            Créer le ticket
          </Button>
        </div>
      </CardContent>
    </>
  )
}