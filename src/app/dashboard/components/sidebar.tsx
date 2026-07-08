"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, CreditCard, Send, PiggyBank, TrendingUp, 
  User, Settings, HelpCircle, LogOut, Bell, ChevronLeft, ChevronRight,
  Home, Wallet, Target, FileText, Shield, History, MessageCircle, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/ui/language-selector"

interface UserSidebarProps {
  user: any
}

const menuItems = [
  { 
    name: "Tableau de bord", 
    href: "/dashboard", 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    name: "Mes cartes", 
    href: "/dashboard/cartes", 
    icon: CreditCard,
    badge: null
  },
  { 
    name: "Transferts", 
    href: "/dashboard/transferts", 
    icon: Send,
    badge: null
  },
  { 
    name: "Épargne", 
    href: "/dashboard/epargne", 
    icon: PiggyBank,
    badge: "3"
  },
  { 
    name: "Crédit", 
    href: "/dashboard/credit", 
    icon: TrendingUp,
    badge: "Disponible"
  },
  { 
    name: "Historique", 
    href: "/dashboard/history", 
    icon: History,
    badge: null
  },
  { 
    name: "Mon profil", 
    href: "/dashboard/profil", 
    icon: User,
    badge: null
  },
  { 
    name: "Sécurité", 
    href: "/dashboard/security", 
    icon: Shield,
    badge: null
  }
]

const supportItems = [
  { name: "Support", href: "/dashboard/support", icon: MessageCircle },
  { name: "Aide & Support", href: "/dashboard/help", icon: HelpCircle },
  { name: "Déconnexion", href: "/auth/logout", icon: LogOut }
]

export default function UserSidebar({ user }: UserSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`fixed left-0 top-0 bottom-0 ${collapsed ? 'w-16' : 'w-64'} bg-card border-r border-border z-50 transition-all duration-300`}>
      {/* Logo and Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-accent font-bold text-lg">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-primary text-lg leading-tight">Corix Finanza</span>
                <span className="text-muted-foreground text-xs">Votre espace client</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-accent font-bold text-lg">C</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      {!collapsed && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="font-bold text-primary">
                {user?.profile?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {user?.profile?.first_name || user?.email?.split('@')[0] || 'Utilisateur'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || 'Non connecté'}
              </p>
            </div>
            <Badge variant="success" className="text-xs">
              Actif
            </Badge>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && (
                <>
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Support Links */}
      <div className="p-4 border-t border-border">
        <div className="space-y-1">
          {supportItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            )
          })}
        </div>

        {/* Quick Help */}
        {!collapsed && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {/* Language Selector */}
            <div className="px-3">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Langue</span>
              </div>
              <LanguageSelector variant="compact" />
            </div>
            
            {/* Support Card */}
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Besoin d'aide ?</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Contactez notre support 24/7
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contacter le support
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}