"use client"

import type { ReactNode } from "react"
import { X, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  icon?: LucideIcon
  iconColor?: string
  iconBg?: string
  title: string
  description?: string
  children?: ReactNode
  confirmLabel?: string
  onConfirm?: () => void
  confirmDisabled?: boolean
  confirmVariant?: "default" | "destructive"
  cancelLabel?: string
  showCancel?: boolean
}

export function ActionDialog({
  open,
  onOpenChange,
  icon: Icon,
  iconColor = "text-[#0B1F3A]",
  iconBg = "bg-[#0B1F3A]/10",
  title,
  description,
  children,
  confirmLabel,
  onConfirm,
  confirmDisabled,
  confirmVariant = "default",
  cancelLabel = "Annuler",
  showCancel = false,
}: ActionDialogProps) {
  if (!open) return null

  const handleConfirm = () => {
    onConfirm?.()
    onOpenChange(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full md:max-w-sm bg-white rounded-t-3xl md:rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${iconBg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            )}
            <h3 className="font-semibold text-[#0B1F3A] text-base leading-tight">{title}</h3>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center hover:bg-secondary/60 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>
        )}

        {children && <div className="mb-5">{children}</div>}

        <div className="flex gap-2">
          {showCancel && (
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              {cancelLabel}
            </Button>
          )}
          <Button
            className={`flex-1 ${
              confirmVariant === "destructive"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-[#E8622C] hover:bg-[#D4551F] text-white"
            }`}
            onClick={handleConfirm}
            disabled={confirmDisabled}
          >
            {confirmLabel || (onConfirm ? "Confirmer" : "Fermer")}
          </Button>
        </div>
      </div>
    </div>
  )
}
