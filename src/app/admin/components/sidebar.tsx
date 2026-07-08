"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, Users, FileCheck, CreditCard, BarChart3, 
  Shield, Settings, HelpCircle, LogOut, Bell, ChevronLeft, ChevronRight,
  Home, TrendingUp, Wallet, AlertCircle, FileText, PieChart, Globe, MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/ui/language-selector"

const menuItems = [
  { 
    name: "Dashboard", 
    href: "/admin", 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    name: "Utilisateurs", 
    href: "/admin/users", 
    icon: Users,
    badge: "12456"
  },
  { 
    name: "KYC", 
    href: "/admin/kyc", 
    icon: FileCheck,
    badge: "23",
    badgeColor: "destructive"
  },
  { 
    name: "Transactions", 
    href: "/admin/transactions", 
    icon: CreditCard,
    badge: "89432"
  },
  { 
    name: "Crédits", 
    href: "/admin/credits", 
    icon: TrendingUp,
    badge: "156"
  },
  { 
    name: "Cartes", 
    href: "/admin/cards", 
    icon: CreditCard,
    badge: "8923"
  },
  { 
    name: "Rapports", 
    href: "/admin/reports", 
    icon: BarChart3,
    badge: null
  },
  { 
    name: "Analytics", 
    href: "/admin/analytics", 
    icon: PieChart,
    badge: null
  },
  { 
    name: "Sécurité", 
    href: "/admin/security", 
    icon: Shield,
    badge: null
  },
  { 
    name: "Paramètres", 
    href: "/admin/settings", 
    icon: Settings,
    badge: null
  }
]

const supportItems = [
  { name: "Messages", href: "/admin/messages", icon: MessageCircle },
  { name: "Support", href: "/admin/support", icon: HelpCircle },
  { name: "Déconnexion", href: "/auth/logout", icon: LogOut }
]

export default function AdminSidebar() {
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
                <span className="text-muted-foreground text-xs">Administration</span>
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
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && item.badgeColor === 'destructive' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </div>
              {!collapsed && (
                <>
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge 
                      variant={item.badgeColor === 'destructive' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Notifications and Support */}
      <div className="p-4 border-t border-border space-y-4">
        {!collapsed && (
          <div className="space-y-3">
            {/* Language Selector */}
            <div>
              <div className="flex items-center gap-2 mb-2 px-3">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Langue</span>
              </div>
              <div className="px-3">
                <LanguageSelector variant="compact" />
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-5 h-5 text-warning" />
                <span className="font-medium text-sm">Alertes système</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {5} alertes nécessitent votre attention
              </p>
              <div className="flex gap-2">
                <Badge variant="destructive" className="text-xs">KYC: 23</Badge>
                <Badge variant="warning" className="text-xs">Sécurité: 2</Badge>
              </div>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="flex flex-col items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <Bell className="w-5 h-5 text-warning" />
          </div>
        )}

        {/* Support Links */}
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

        {/* Admin Info */}
        {!collapsed && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="font-bold text-accent text-sm">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin Principal</p>
                <p className="text-xs text-muted-foreground">admin@corix-finanza.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}