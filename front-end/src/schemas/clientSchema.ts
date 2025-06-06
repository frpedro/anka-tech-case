import { z } from 'zod'

export const clientFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido')
})  

export type ClientFormData = z.infer<typeof clientFormSchema>
