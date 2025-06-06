'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Card, CardContent } from '@/components/ui/card'

type Asset = {
  id: number
  name: string
  currentvalue: number
}

export function FixedAssets() {
  const { data: assets, isLoading, isError, error } = useQuery<Asset[], Error>({
    queryKey: ['assets'],
    queryFn: async () => {
      const res = await axios.get('/assets')
      return res.data
    },
  })

  if (isLoading) return <p>Carregando ativos...</p>

  if (isError) 
    return (
      <div>
        <p>Erro ao carregar ativos.</p>
        <pre>{error?.message}</pre>
      </div>
    )

  return (
    <div className="grid gap-4">
      {assets?.map((asset) => (
        <Card key={asset.id}>
          <CardContent className="p-4 flex justify-between">
            <span>{asset.name}</span>
            <span>R$ {asset.currentvalue.toFixed(2)}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
