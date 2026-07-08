"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, X, Check, AlertCircle, Info, CheckCircle, 
  CreditCard, Send, PiggyBank, Shield, TrendingUp, 
  Clock, Trash2, MoreVertical
} from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'transaction'
  category: 'security' | 'transaction' | 'account' | 'system' | 'promotion'
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  actionable?: boolean
  actionText?: string
  actionUrl?: string
}

interface NotificationCenterProps {
  variant?: "dropdown" | "page"
  onClose?: () => void
}

export function NotificationCenter({ variant = "dropdown", onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simuler les notifications
    const mockNotifications: Notification[] = [
      {
        id: 1,
        title: "Vérification KYC requise",
        message: "Complétez votre vérification d'identité pour débloquer toutes les fonctionnalités",
        type: "warning",
        category: "security",
        timestamp: "2024-01-15T10:30:00Z",
        read: false,
        priority: "high",
        actionable: true,
        actionText: "Compléter maintenant",
        actionUrl: "/auth/kyc-upload"
      },
      {
        id: 2,
        title: "Transfert réussi",
        message: "Votre transfert de 150€ vers Marie Diop a été effectué avec succès",
        type: "success",
        category: "transaction",
        timestamp: "2024-01-15T09:15:00Z",
        read: false,
        priority: "medium"
      },
      {
        id: 3,
        title: "Objectif d'épargne atteint",
        message: "Félicitations ! Vous avez atteint 65% de votre objectif voyage",
        type: "success",
        category: "account",
        timestamp: "2024-01-14T16:45:00Z",
        read: true,
        priority: "low"
      },
      {
        id: 4,
        title: "Nouvelle fonctionnalité",
        message: "Découvrez notre nouveau système de crédit instantané",
        type: "info",
        category: "promotion",
        timestamp: "2024-01-14T14:20:00Z",
        read: true,
        priority: "low",
        actionable: true,
        actionText: "En savoir plus",
        actionUrl: "/dashboard/credit"
      },
      {
        id: 5,
        title: "Connexion depuis un nouvel appareil",
        message: "Une connexion a été détectée depuis un nouvel appareil (Chrome, Windows)",
        type: "warning",
        category: "security",
        timestamp: "2024-01-14T08:30:00Z",
        read: true,
        priority: "high"
      },
      {
        id: 6,
        title: "Maintenance programmée",
        message: "Maintenance des services prévue le 20/01 de 02:00 à 04:00",
        type: "info",
        category: "system",
        timestamp: "2024-01-13T12:00:00Z",
        read: true,
        priority: "medium"
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: string, category: string) => {
    if (category === 'transaction') return <Send className="w-5 h-5" />
    if (category === 'security') return <Shield className="w-5 h-5" />
    if (category === 'account') return <PiggyBank className="w-5 h-5" />
    
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-success" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-warning" />
      case 'error': return <AlertCircle className="w-5 h-5 text-destructive" />
      case 'info': return <Info className="w-5 h-5 text-blue-500" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'success': return 'success'
      case 'warning': return 'warning'
      case 'error': return 'destructive'
      case 'info': return 'secondary'
      default: return 'secondary'
    }
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true
    if (filter === "unread") return !n.read
    return n.category === filter
  })

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "À l'instant"
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    if (diffInHours < 48) return "Hier"
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
  }

  if (variant === "dropdown") {
    return (
      <Card className="absolute top-12 right-0 w-96 max-h-[80vh] shadow-xl border-border/50 z-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Tout lire
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-1 mt-3">
            {["all", "unread", "security", "transaction", "account"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(f)}
                className="text-xs"
              >
                {f === "all" ? "Toutes" :
                 f === "unread" ? "Non lues" :
                 f === "security" ? "Sécurité" :
                 f === "transaction" ? "Transactions" : "Compte"}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune notification</p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border hover:bg-secondary/50 transition-colors ${
                    !notification.read ? 'bg-accent/5 border-l-4 border-l-accent' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${
                      notification.type === 'success' ? 'text-success' :
                      notification.type === 'warning' ? 'text-warning' :
                      notification.type === 'error' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {getIcon(notification.type, notification.category)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm text-foreground line-clamp-1">
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-accent rounded-full" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant={getTypeColor(notification.type)} className="text-xs">
                          {notification.priority === 'high' ? '🔴 Urgent' :
                           notification.priority === 'medium' ? '🟡 Important' : '🟢 Info'}
                        </Badge>
                        
                        <div className="flex items-center gap-1">
                          {notification.actionable && (
                            <Button variant="outline" size="sm" className="text-xs h-6">
                              {notification.actionText}
                            </Button>
                          )}
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {filteredNotifications.length > 0 && (
          <div className="p-3 border-t border-border">
            <Button variant="outline" className="w-full text-xs" size="sm">
              Voir toutes les notifications
            </Button>
          </div>
        )}
      </Card>
    )
  }

  // Page variant (for full page notifications)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Notifications</h1>
          <p className="text-muted-foreground">
            Restez informé de l'activité de votre compte
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
          <Badge variant="secondary">
            {notifications.length} notifications
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "unread", "security", "transaction", "account", "system", "promotion"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "Toutes" :
             f === "unread" ? "Non lues" :
             f === "security" ? "Sécurité" :
             f === "transaction" ? "Transactions" :
             f === "account" ? "Compte" :
             f === "system" ? "Système" : "Promotions"}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-accent bg-accent/5' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`mt-1 ${
                  notification.type === 'success' ? 'text-success' :
                  notification.type === 'warning' ? 'text-warning' :
                  notification.type === 'error' ? 'text-destructive' : 'text-muted-foreground'
                }`}>
                  {getIcon(notification.type, notification.category)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={getTypeColor(notification.type)}>
                        {notification.priority === 'high' ? 'Urgent' :
                         notification.priority === 'medium' ? 'Important' : 'Info'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-accent rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {notification.actionable && (
                        <Button variant="default" size="sm">
                          {notification.actionText}
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Marquer comme lu
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Aucune notification
            </h3>
            <p className="text-muted-foreground">
              Vous êtes à jour ! Aucune notification correspondant aux filtres sélectionnés.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}