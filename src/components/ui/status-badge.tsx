import { Badge } from "@/components/ui/badge"
import { cva, type VariantProps } from "class-variance-authority"

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      active: "bg-success/10 text-success",
      pending: "bg-warning/10 text-warning",
      rejected: "bg-destructive/10 text-destructive",
      refunded: "bg-success/10 text-success",
      blocked: "bg-destructive/10 text-destructive",
      expired: "bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: {
    status: "pending",
  },
})

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  status?: "active" | "pending" | "rejected" | "refunded" | "blocked" | "expired"
}

function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <Badge
      className={statusBadgeVariants({ status, className })}
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }
