import { ClientForm } from '@/forms/clientForm'

export default function ClientesPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Novo Cliente</h1>
      <ClientForm />
    </div>
  )
}
