import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "icon" | "wordmark"
  className?: string
  showText?: boolean
}

export function Logo({ variant = "full", className, showText = true }: LogoProps) {
  if (variant === "icon") {
    return (
      <div className={cn("relative w-8 h-8 flex items-center justify-center", className)}>
        <Image
          src="/corix-finanza-icone-A-transparent.svg"
          alt="Corix Finanza"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>
    )
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("flex flex-col", className)}>
        <span className="font-bold text-primary text-xl leading-tight tracking-tight">Corix</span>
        <span className="text-muted-foreground text-sm font-medium tracking-wider">FINANZA</span>
      </div>
    )
  }

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Image
          src="/corix-finanza-icone-A-transparent.svg"
          alt="Corix Finanza"
          width={32}
          height={32}
          className="w-8 h-8"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-primary text-xl leading-tight tracking-tight">Corix</span>
          <span className="text-muted-foreground text-sm font-medium tracking-wider">FINANZA</span>
        </div>
      )}
    </Link>
  )
}
