import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
  iconColor: string
  description?: string
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  positive, 
  icon: Icon, 
  iconColor,
  description 
}: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-primary tabular-nums">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm ${positive ? 'text-success' : 'text-destructive'}`}>
                {change}
              </span>
              {description && (
                <span className="text-xs text-muted-foreground">• {description}</span>
              )}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor.replace('text-', 'bg-')}/10`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}