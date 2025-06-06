'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export type Client = {
  id: number
  name: string
  email: string
  status: boolean
}

export function ClientList() {
  const { data: clients, isLoading, isError } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await axios.get('/clients')
      console.log('clients api response:', res.data)
      // Ajuste aqui para retornar o array de clientes corretamente
      return res.data.clients  // <- Ajuste principal
    },
  })

  if (isLoading) return <p>Carregando clientes...</p>
  if (isError) return <p>Erro ao carregar clientes.</p>

  return (
    <div className="grid gap-4">
      {clients?.map((client) => (
        <Card key={client.id}>
          <CardContent className="p-4 flex flex-col gap-2">
            <div><strong>Nome:</strong> {client.name}</div>
            <div><strong>Email:</strong> {client.email}</div>
            <div><strong>Status:</strong> {client.status ? 'Ativo' : 'Inativo'}</div>
            <Button variant="outline" size="sm" className="w-fit mt-2">
              Editar
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
