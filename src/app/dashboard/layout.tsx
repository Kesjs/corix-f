"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { MobileBottomBar } from "@/components/ui/mobile-bottom-bar"
import UserSidebar from "./components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push("/auth/login")
          return
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        setUser({ ...session.user, profile })
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur :", error)
      } finally {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0B1F3A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <UserSidebar user={user} />
      <div className="md:ml-64">{children}</div>
      <div className="md:hidden">
        <MobileBottomBar userType="client" unreadNotifications={3} unreadMessages={1} />
      </div>
    </div>
  )
}
