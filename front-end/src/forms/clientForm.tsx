'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientFormSchema, ClientFormData } from '@/schemas/clientSchema'
import { useCreateClient } from '@/hooks/useClients'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Label } from '@/components/ui/label'

export function ClientForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
  })

  const createClient = useCreateClient()

  function onSubmit(data: ClientFormData) {
    createClient.mutate(data)
    console.log('Enviando dados:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="mb-2">Nome</Label>
        <Input {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label className="mb-2">Email</Label>
        <Input {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <Button type="submit" disabled={createClient.isPending}>
        {createClient.isPending ? 'Salvando...' : 'Salvar'}
      </Button>
      

    </form>
  )
}
