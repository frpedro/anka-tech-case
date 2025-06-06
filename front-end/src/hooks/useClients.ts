import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export type Client = {
  id: number
  name: string
  email: string
}

type NewClient = {
  name: string
  email: string
}

export function useClients() {
  return useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await api.get('/clients')
      return data
    }
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation<Client, Error, NewClient>({
    mutationFn: async (newClient) => {
      const { data } = await api.post('/clients', newClient)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()

  return useMutation<Client, Error, { id: number, data: Partial<NewClient> }>({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/clients/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
    onError: (error) => {
  console.error('Erro ao criar cliente:', error)
  alert('Erro ao salvar cliente: ' + error.message)
  }
  })

}