import { Logo } from "@/components/ui/logo"
import { LanguageSelector } from "@/components/ui/language-selector"

export function AuthHeader() {
  return (
    <header className="p-4 flex items-center justify-between">
      <Logo />
      <LanguageSelector variant="simple" />
    </header>
  )
}