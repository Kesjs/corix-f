import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Filter, MoreVertical } from "lucide-react"

interface ChartCardProps {
  title: string
  description?: string
  type: 'line' | 'bar' | 'pie'
  data: any[]
}

export default function ChartCard({ title, description, type, data }: ChartCardProps) {
  // Simuler un graphique simple
  const maxValue = Math.max(...data.map(d => d.revenue || d.value || 0))
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Période
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {type === 'line' && (
            <div className="h-full flex items-end gap-2 pt-8">
              {data.map((item, index) => {
                const height = ((item.revenue || 0) / maxValue) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                        {item.revenue?.toLocaleString()} €
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
                  </div>
                )
              })}
            </div>
          )}
          
          {type === 'bar' && (
            <div className="h-full flex items-end gap-4">
              {data.map((item, index) => {
                const height = ((item.value || 0) / maxValue) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
                  </div>
                )
              })}
            </div>
          )}
          
          {type === 'pie' && (
            <div className="h-full flex items-center justify-center">
              <div className="relative w-32 h-32">
                {/* Simuler un graphique circulaire */}
                <div className="absolute inset-0 border-8 border-blue-500 rounded-full" style={{ clipPath: 'inset(0 0 0 50%)' }} />
                <div className="absolute inset-0 border-8 border-green-500 rounded-full" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                <div className="absolute inset-0 border-8 border-amber-500 rounded-full" style={{ clipPath: 'inset(50% 0 0 0)' }} />
                <div className="absolute inset-0 border-8 border-purple-500 rounded-full" style={{ clipPath: 'inset(0 0 50% 0)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Légende */}
        {type === 'pie' && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs">Utilisateurs (45%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs">Transactions (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs">Crédits (15%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs">Autres (10%)</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}