"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
  required?: boolean
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ id, checked = false, onCheckedChange, className, disabled, required }, ref) => {
    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-required={required}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "peer shrink-0 rounded-md border-2 border-primary/30 bg-background",
          "w-5 h-5 flex items-center justify-center",
          "transition-all duration-200 ease-in-out",
          "hover:border-primary/60 hover:shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked && "bg-primary border-primary text-primary-foreground shadow-sm",
          !checked && "border-muted-foreground/30",
          className
        )}
      >
        <Check
          className={cn(
            "h-3.5 w-3.5 transition-all duration-200",
            checked ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          strokeWidth={3}
        />
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }