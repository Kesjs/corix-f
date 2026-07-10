"use client"

import { CreditCard } from "@/components/shared-assets/credit-card/credit-card"

export default function CartesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes cartes</h1>
      <CreditCard type="gray-dark" />
    </div>
  )
}
