"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Bell, ChevronDown, TrendingUp, Download, Calendar, Filter } from "lucide-react"
import { useState } from "react"

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("30d")

  const reports = [
    {
      id: 1,
      name: "Rapport d'activité mensuel",
      type: "activity",
      period: "Décembre 2023",
      generatedAt: "1 jan. 2024",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Rapport transactions",
      type: "transactions",
      period: "Décembre 2023",
      generatedAt: "1 jan. 2024",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Rapport utilisateurs",
      type: "users",
      period: "Décembre 2023",
      generatedAt: "1 jan. 2024",
      size: "0.9 MB",
    },
    {
      id: 4,
      name: "Rapport crédits",
      type: "credits",
      period: "Décembre 2023",
      generatedAt: "1 jan. 2024",
      size: "1.2 MB",
    },
  ]

  const stats = [
    { label: "Nouveaux utilisateurs", value: "1 234", change: "+15%", positive: true },
    { label: "Volume transactions", value: "5.2M €", change: "+22%", positive: true },
    { label: "Crédits accordés", value: "45", change: "+8%", positive: true },
    { label: "Taux de satisfaction", value: "4.7/5", change: "+0.2", positive: true },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border z-50">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-accent font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg leading-tight">Corix</span>
              <span className="text-muted-foreground text-sm">Admin</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">Vue d'ensemble</span>
          </a>
          <a href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">Utilisateurs</span>
          </a>
          <a href="/admin/kyc" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">Validation KYC</span>
          </a>
          <a href="/admin/transactions" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">Transactions</span>
          </a>
          <a href="/admin/credits" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">Crédits</span>
          </a>
          <a href="/admin/cards" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">Cartes</span>
          </a>
          <a href="/admin/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/10 text-accent">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Rapports</span>
          </a>
          <a href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">Paramètres</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Rapports & exports</h1>
            <p className="text-muted-foreground">Analyse et export de données</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-input rounded-lg bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            </div>
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </header>

        {/* Period Selector */}
        <Card className="shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Période:</span>
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-input rounded-lg bg-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm"
              >
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="90d">90 derniers jours</option>
                <option value="1y">1 an</option>
              </select>
              <Button variant="outline" size="sm" className="ml-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-primary tabular-nums">{stat.value}</p>
                <p className={`text-sm ${stat.positive ? "text-success" : "text-destructive"}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Generate Reports */}
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Générer un rapport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Activité</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Transactions</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Utilisateurs</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Crédits</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Rapports générés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {//@ts-ignore}
              reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.period} • {report.generatedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{report.size}</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
