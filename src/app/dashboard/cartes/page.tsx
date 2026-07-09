import { createClient } from "@/lib/supabase/server"
import { BankCard } from "@/components/bank-card"
import { redirect } from "next/navigation"

export default async function CartesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("kyc_status")
    .eq("id", user.id)
    .single()

  if (profile?.kyc_status !== "approved") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mes cartes</h1>
        <p className="text-muted-foreground">
          Votre compte est en cours de vérification. Votre carte sera disponible dès l'approbation.
        </p>
      </div>
    )
  }

  const { data: card, error } = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (error || !card) {
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
