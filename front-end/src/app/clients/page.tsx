'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ClientForm } from '@/forms/clientForm'
import { ClientList } from '@/forms/clientList'
import { FixedAssets } from '@/forms/fixedAssets'

export default function DashboardPage() {
  const [tab, setTab] = useState('add')

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-18">Menu</h2>
        <Tabs value={tab} onValueChange={setTab} orientation="vertical" className="space-y-2">
          <TabsList className="flex flex-col space-y-5">
            <TabsTrigger
              value="add"
              className="w-48 rounded-md bg-gray-100 text-gray-700 data-[state=active]:bg-gray-300 data-[state=active]:text-gray-900"
            >
              Adicionar Cliente
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="w-48 rounded-md bg-gray-100 text-gray-700 data-[state=active]:bg-gray-300 data-[state=active]:text-gray-900"
            >
              Visualizar e Editar Clientes
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className="w-48 rounded-md bg-gray-100 text-gray-700 data-[state=active]:bg-gray-300 data-[state=active]:text-gray-900"
            >
              Ativos Fixos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 ml-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsContent
            value="add"
            className="bg-white rounded-lg shadow-md p-6 max-w-3xl"
          >
            <h1 className="text-2xl font-bold mb-4">Adicionar Cliente</h1>
            <ClientForm />
          </TabsContent>

          <TabsContent
            value="list"
            className="bg-white rounded-lg shadow-md p-6 max-w-3xl"
          >
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <ClientList />
          </TabsContent>

          <TabsContent
            value="assets"
            className="bg-white rounded-lg shadow-md p-6 max-w-3xl"
          >
            <h1 className="text-2xl font-bold mb-4">Ativos Fixos</h1>
            <FixedAssets />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
