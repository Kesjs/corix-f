"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, CreditCard, Send, PiggyBank, User, 
  Bell, MessageCircle, MoreHorizontal, Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NotificationCenter } from "./notification-center"

interface MobileBottomBarProps {
  userType?: "client" | "admin"
  unreadNotifications?: number
  unreadMessages?: number
}

export function MobileBottomBar({ 
  userType = "client", 
  unreadNotifications = 3,
  unreadMessages = 1 
}: MobileBottomBarProps) {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Ne pas afficher sur desktop
  if (!isMobile) return null

  const clientMenuItems = [
    { 
      name: "Accueil", 
      href: "/dashboard", 
      icon: Home,
      isActive: pathname === "/dashboard"
    },
    { 
      name: "Cartes", 
      href: "/dashboard/cartes", 
      icon: CreditCard,
      isActive: pathname?.startsWith("/dashboard/cartes")
    },
    { 
      name: "Actions", 
      href: "#", 
      icon: Plus,
      isAction: true,
      isActive: showQuickActions
    },
    { 
      name: "Épargne", 
      href: "/dashboard/epargne", 
      icon: PiggyBank,
      isActive: pathname?.startsWith("/dashboard/epargne"),
      badge: "3"
    },
    { 
      name: "Profil", 
      href: "/dashboard/profil", 
      icon: User,
      isActive: pathname?.startsWith("/dashboard/profil")
    }
  ]

  const adminMenuItems = [
    { 
      name: "Dashboard", 
      href: "/admin", 
      icon: Home,
      isActive: pathname === "/admin"
    },
    { 
      name: "Utilisateurs", 
      href: "/admin/users", 
      icon: User,
      isActive: pathname?.startsWith("/admin/users"),
      badge: "156"
    },
    { 
      name: "Actions", 
      href: "#", 
      icon: Plus,
      isAction: true,
      isActive: showQuickActions
    },
    { 
      name: "KYC", 
      href: "/admin/kyc", 
      icon: CreditCard,
      isActive: pathname?.startsWith("/admin/kyc"),
      badge: "23",
      badgeVariant: "destructive"
    },
    { 
      name: "Plus", 
      href: "/admin/more", 
      icon: MoreHorizontal,
      isActive: false
    }
  ]

  const menuItems = userType === "admin" ? adminMenuItems : clientMenuItems

  const quickActions = userType === "admin" ? [
    { name: "Approuver KYC", icon: CreditCard, href: "/admin/kyc", color: "bg-green-500" },
    { name: "Voir utilisateurs", icon: User, href: "/admin/users", color: "bg-blue-500" },
    { name: "Rapports", icon: MoreHorizontal, href: "/admin/reports", color: "bg-purple-500" },
  ] : [
    { name: "Transférer", icon: Send, href: "/dashboard/transferts", color: "bg-blue-500" },
    { name: "Recharger", icon: Plus, href: "/dashboard/recharge", color: "bg-green-500" },
    { name: "Support", icon: MessageCircle, href: "/dashboard/support", color: "bg-orange-500" },
  ]

  return (
    <>
      {/* Quick Actions Overlay */}
      {showQuickActions && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40">
          <div 
            className="absolute inset-0"
            onClick={() => setShowQuickActions(false)}
          />
          <div className="absolute bottom-20 left-4 right-4">
            <div className="bg-background rounded-2xl shadow-2xl border border-border p-4">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-foreground">Actions rapides</h3>
                <p className="text-sm text-muted-foreground">
                  {userType === "admin" ? "Outils d'administration" : "Que souhaitez-vous faire ?"}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      onClick={() => setShowQuickActions(false)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-medium text-center">{action.name}</span>
                    </Link>
                  )
                })}
              </div>
              
              {userType === "client" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowNotifications(true)
                        setShowQuickActions(false)
                      }}
                      className="flex-1 relative"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                      {unreadNotifications > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-2 -right-2 text-xs min-w-[20px] h-5"
                        >
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = '/dashboard/support'}
                      className="flex-1 relative"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Messages
                      {unreadMessages > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-2 -right-2 text-xs min-w-[20px] h-5"
                        >
                          {unreadMessages}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Overlay */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
          <div 
            className="absolute inset-0"
            onClick={() => setShowNotifications(false)}
          />
          <div className="absolute top-4 left-4 right-4 bottom-20 overflow-hidden">
            <NotificationCenter 
              variant="dropdown"
              onClose={() => setShowNotifications(false)}
            />
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-30">
        <div className="grid grid-cols-5 h-16">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            
            if (item.isAction) {
              return (
                <button
                  key={index}
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    showQuickActions 
                      ? 'text-accent scale-110' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className={`p-2 rounded-full transition-all duration-200 ${
                    showQuickActions 
                      ? 'bg-accent text-accent-foreground rotate-45 scale-110' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">
                    {showQuickActions ? 'Fermer' : item.name}
                  </span>
                </button>
              )
            }

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 relative ${
                  item.isActive 
                    ? 'text-accent' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Active Indicator */}
                {item.isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-accent rounded-b-full" />
                )}
                
                <div className="relative">
                  <Icon className={`w-6 h-6 transition-transform duration-200 ${
                    item.isActive ? 'scale-110' : 'scale-100'
                  }`} />
                  
                  {/* Badge */}
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-3 text-xs min-w-[18px] h-4 flex items-center justify-center p-1"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                
                <span className={`text-xs font-medium transition-all duration-200 ${
                  item.isActive ? 'font-semibold' : ''
                }`}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
        
        {/* Safe area for iPhone */}
        <div className="h-safe-area-inset-bottom bg-background/95" />
      </div>

      {/* Floating Notification Button (when not in quick actions) */}
      {!showQuickActions && userType === "client" && unreadNotifications > 0 && (
        <div className="fixed bottom-20 right-4 z-20">
          <Button
            onClick={() => setShowNotifications(true)}
            className="rounded-full w-12 h-12 shadow-lg relative animate-bounce"
          >
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 text-xs min-w-[20px] h-5"
            >
              {unreadNotifications}
            </Badge>
          </Button>
        </div>
      )}

      {/* Spacer to prevent content being hidden behind bottom bar */}
      <div className="h-16 md:hidden" />
    </>
  )
}