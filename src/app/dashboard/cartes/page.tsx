"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { BankCard } from "@/components/ui/bank-card"

export default function CartesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [kycStatus, setKycStatus] = useState<string | null>(null)
  const [card, setCard] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("kyc_status")
        .eq("id", user.id)
        .single()

      setKycStatus(profile?.kyc_status ?? null)

      if (profile?.kyc_status === "approved") {
        const { data: cardData } = await supabase
          .from("cards")
          .select("*")
          .eq("user_id", user.id)
          .single()

        setCard(cardData)
      }

      setLoading(false)
    }

    load()
  }, [router])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mes cartes</h1>
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (kycStatus !== "approved") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mes cartes</h1>
        <p className="text-muted-foreground">
          Votre compte est en cours de vérification. Votre carte sera disponible dès l'approbation.
        </p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mes cartes</h1>
        <p className="text-muted-foreground">Aucune carte trouvée pour ce compte.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes cartes</h1>
      <BankCard
        cardNumber={card.card_number}
        holderName={card.holder_name}
        expiryDate={card.expiry_date}
        cvv={card.cvv}
        balance={Number(card.balance)}
        cardType={card.card_type}
        isVirtual={card.is_virtual}
        isBlocked={card.is_blocked}
        variant="full"
      />
    </div>
  )
}
