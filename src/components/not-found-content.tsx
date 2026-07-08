"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Home, MessageCircle, SearchX } from "lucide-react"

export function NotFoundContent() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#F0F1F3] rounded-full flex items-center justify-center">
              <SearchX className="w-10 h-10 text-[#6B7280]" />
            </div>
          </div>

          {/* 404 Number */}
          <div className="text-6xl font-bold text-[#0F2942] mb-4">404</div>

          {/* Title */}
          <h1 className="text-2xl font-medium text-[#1A1D1F] mb-3">
            {t("notFound.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-[#6B7280] mb-8">
            {t("notFound.subtitle")}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-[#FF6B35] hover:bg-[#E85A28] text-white h-12 rounded-lg">
                <Home className="w-4 h-4 mr-2" />
                {t("notFound.backHome")}
              </Button>
            </Link>
            
            <Link href="/contact" className="flex-1">
              <Button variant="outline" className="w-full border-[#0F2942] text-[#0F2942] hover:bg-[#F0F1F3] h-12 rounded-lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("notFound.contactSupport")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-[#B0B5BC] text-sm mt-6">
          © 2026 Corix Finanza
        </p>
      </div>
    </div>
  )
}
