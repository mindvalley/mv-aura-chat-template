"use client"

import { useState } from "react"
import { ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ConnectorStats {
  totalConnectors: number
  activeConnectors: number
  publicConnectors: string
  totalDocsIndexed: number
  errors: number
}

interface Connector {
  name: string
  icon: string
  stats: ConnectorStats
}

const connectors: Connector[] = [
  {
    name: "Airtable",
    icon: "A",
    stats: {
      totalConnectors: 25,
      activeConnectors: 25,
      publicConnectors: "25/25",
      totalDocsIndexed: 20009,
      errors: 0,
    },
  },
  {
    name: "Confluence",
    icon: "C",
    stats: {
      totalConnectors: 20,
      activeConnectors: 20,
      publicConnectors: "20/20",
      totalDocsIndexed: 4253,
      errors: 0,
    },
  },
  {
    name: "File",
    icon: "F",
    stats: {
      totalConnectors: 1,
      activeConnectors: 1,
      publicConnectors: "1/1",
      totalDocsIndexed: 1,
      errors: 0,
    },
  },
  {
    name: "Github",
    icon: "G",
    stats: {
      totalConnectors: 26,
      activeConnectors: 26,
      publicConnectors: "26/26",
      totalDocsIndexed: 33099,
      errors: 0,
    },
  },
  {
    name: "Google Storage",
    icon: "GS",
    stats: {
      totalConnectors: 1,
      activeConnectors: 1,
      publicConnectors: "1/1",
      totalDocsIndexed: 7156,
      errors: 0,
    },
  },
]

function ConnectorCard({ connector }: { connector: Connector }) {
  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">{connector.icon}</span>
          </div>
          <h3 className="text-lg font-medium">{connector.name}</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-5 gap-4 text-sm">
        <div>
          <p className="text-gray-600 mb-1">Total Connectors</p>
          <p className="font-medium">{connector.stats.totalConnectors}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Active Connectors</p>
          <p className="font-medium">{connector.stats.activeConnectors} (100%)</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Public Connectors</p>
          <p className="font-medium">{connector.stats.publicConnectors}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Total Docs Indexed</p>
          <p className="font-medium">{connector.stats.totalDocsIndexed.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Errors</p>
          <p className="font-medium">{connector.stats.errors}</p>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConnectors = connectors.filter((connector) =>
    connector.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Existing Connectors</h1>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Expand All
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Connector
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search connectors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="space-y-4">
        {filteredConnectors.map((connector) => (
          <ConnectorCard key={connector.name} connector={connector} />
        ))}
      </div>
    </div>
  )
}
