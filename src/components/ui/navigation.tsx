"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Send, PiggyBank, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

const navItems = [
  { href: "/dashboard", label: "Accueil", icon: Home },
  { href: "/dashboard/cartes", label: "Cartes", icon: CreditCard },
  { href: "/dashboard/transferts", label: "Transferts", icon: Send },
  { href: "/dashboard/epargne", label: "Épargne", icon: PiggyBank },
  { href: "/dashboard/profil", label: "Profil", icon: User },
]

export function Navigation() {
  const pathname = usePathname()
  const { session, signOut } = useAuth()
  const user = session?.user

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white border-t border-border shadow-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-3 gap-1 transition-colors",
                isActive ? "text-accent" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "relative",
                isActive && "bg-accent/10 rounded-full p-1"
              )}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </div>
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-white border-r border-border z-50">
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-accent font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg leading-tight">Corix</span>
              <span className="text-muted-foreground text-sm">Finanza</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-foreground">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || 'Non connecté'}
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </aside>
    </>
  )
}
