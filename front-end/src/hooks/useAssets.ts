import { useQuery} from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Client } from './useClients'

type Asset = {
  id: number
  name: string
  value: number
}

export function useAssets() {
  return useQuery<Asset[]>({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data } = await api.get('/assets')
      return data
    }
  })
}

export function useClientAssets(clientId: number) {
  return useQuery<Asset[]>({
    queryKey: ['client-assets', clientId],
    queryFn: async () => {
      const { data } = await api.get(`/clients/${clientId}/assets`)
      return data
    },
    enabled: !!clientId
  })
}

type Allocation = {
  id: number
  clientId: number
  assetId: number
  client: Client
  asset: Asset
}

export function useClientAllocations(clientId: number) {
  return useQuery<Allocation[]>({
    queryKey: ['client-allocations', clientId],
    queryFn: async () => {
      const { data } = await api.get(`/clients/${clientId}/allocations`)
      return data
    },
    enabled: !!clientId
  })
}
