"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to entry page after 2 seconds
    const timer = setTimeout(() => {
      router.push("/entry")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <Logo variant="icon" className="mx-auto mb-4" />
        <div className="w-8 h-8 bg-white/20 rounded-full mx-auto animate-pulse" />
      </div>
    </div>
  )
}
