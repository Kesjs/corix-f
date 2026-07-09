"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, CreditCard, Send, PiggyBank, TrendingUp, 
  User, HelpCircle, LogOut, ChevronLeft, ChevronRight,
  Shield, History, MessageCircle, Globe, Menu, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/ui/language-selector"
import { createClient } from "@/utils/supabase/client"   // ← Adaptez le chemin si différent

interface UserSidebarProps {
  user: any
}

const menuItems = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard, badge: null },
  { name: "Mes cartes", href: "/dashboard/cartes", icon: CreditCard, badge: null },
  { name: "Transferts", href: "/dashboard/transferts", icon: Send, badge: null },
  { name: "Épargne", href: "/dashboard/epargne", icon: PiggyBank, badge: "3" },
  { name: "Crédit", href: "/dashboard/credit", icon: TrendingUp, badge: "Disponible" },
  { name: "Historique", href: "/dashboard/history", icon: History, badge: null },
  { name: "Mon profil", href: "/dashboard/profil", icon: User, badge: null },
  { name: "Sécurité", href: "/dashboard/security", icon: Shield, badge: null },
]

const supportItems = [
  { name: "Support", href: "/dashboard/support", icon: MessageCircle },
  { name: "Aide & Support", href: "/dashboard/help", icon: HelpCircle },
]

function SidebarContent({
  user,
  collapsed,
  onNavigate,
}: {
  user: any
  collapsed: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    if (onNavigate) onNavigate() // Ferme le menu mobile

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      router.push("/auth/login")
      router.refresh()
    } catch (error) {
      console.error("Erreur déconnexion:", error)
      alert("Impossible de se déconnecter. Veuillez réessayer.")
    }
  }

  return (
    <>
      {/* User Profile */}
      {!collapsed && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-white font-semibold">
              {user?.profile?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {user?.profile?.first_name || user?.email?.split("@")[0] || "Utilisateur"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "Non connecté"}</p>
            </div>
            <Badge variant="success" className="text-xs shrink-0">Actif</Badge>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-[#E8622C]/10 text-[#E8622C]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="font-medium flex-1 text-sm">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Support Links */}
      <div className="p-3 border-t border-border">
        <div className="space-y-1">
          {supportItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            )
          })}

          {/* Bouton Déconnexion */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm">Déconnexion</span>}
          </button>
        </div>

        {!collapsed && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div className="px-3">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-[#0B1F3A]" />
                <span className="text-sm font-medium">Langue</span>
              </div>
              <LanguageSelector variant="compact" />
            </div>

            <div className="bg-secondary/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-[#0B1F3A]" />
                <span className="text-sm font-medium">Besoin d'aide ?</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Contactez notre support 24/7</p>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contacter le support
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function UserSidebar({ user }: UserSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Ouvrir le menu"
        className="md:hidden fixed top-3 left-3 z-40 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center"
      >
        <Menu className="w-5 h-5 text-[#0B1F3A]" />
      </button>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex md:flex-col fixed left-0 top-0 bottom-0 ${
          collapsed ? "w-16" : "w-64"
        } bg-card border-r border-border z-30 transition-all duration-300`}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0B1F3A] rounded-lg flex items-center justify-center">
                  <span className="text-[#E8622C] font-bold text-lg">C</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0B1F3A] text-lg leading-tight">Corix Finanza</span>
                  <span className="text-muted-foreground text-xs">Votre espace client</span>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="w-8 h-8 bg-[#0B1F3A] rounded-lg flex items-center justify-center mx-auto">
                <span className="text-[#E8622C] font-bold text-lg">C</span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <SidebarContent user={user} collapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-[280px] max-w-[80vw] bg-card flex flex-col shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0B1F3A] rounded-lg flex items-center justify-center">
                <span className="text-[#E8622C] font-bold text-lg">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#0B1F3A] text-base leading-tight">Corix Finanza</span>
                <span className="text-muted-foreground text-xs">Votre espace client</span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <SidebarContent user={user} collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </aside>
      </div>
    </>
  )
}
