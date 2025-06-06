import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../prismaClient'

// Schemas Zod para validação
const clientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.boolean().optional(),
})

const clientUpdateSchema = clientSchema.partial()

const assetSchema = z.object({
  name: z.string().min(1),
  value: z.number().positive(),
})

export async function clientsRoutes(fastify: FastifyInstance) {
  
  fastify.get('/clients', async () => {
    const clients = await prisma.client.findMany({
      include: { assets: true },
    })
    return clients
  })

  // Criar cliente
  fastify.post('/clients', async (request, reply) => {
    try {
      const data = clientSchema.parse(request.body)
      const client = await prisma.client.create({
        data: {
          name: data.name,
          email: data.email,
          status: data.status ?? true,
        },
      })
      reply.code(201).send(client)
    } catch (error) {
      reply.code(400).send({ error: 'Dados inválidos' })
    }
  })

  // Editar cliente
  fastify.put('/clients/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const clientId = Number(id)
      const data = clientUpdateSchema.parse(request.body)
      const client = await prisma.client.update({
        where: { id: clientId },
        data,
      })
      reply.send(client)
    } catch (error) {
      reply.code(400).send({ error: 'Falha ao atualizar cliente' })
    }
  })
  // Criar ativo para cliente específico
  fastify.post('/clients/:clientId/assets', async (request, reply) => {
    try {
      const { clientId } = request.params as { clientId: string }
      const clientIdNum = Number(clientId)
      const data = assetSchema.parse(request.body)

      // Verifica se cliente existe
      const clientExists = await prisma.client.findUnique({
        where: { id: clientIdNum },
      })
      if (!clientExists) {
        return reply.code(404).send({ error: 'Cliente não encontrado' })
      }

      const asset = await prisma.asset.create({
        data: {
          name: data.name,
          value: data.value,
          clientId: clientIdNum,
        },
      })

      reply.code(201).send(asset)
    } catch (error) {
      reply.code(400).send({ error: 'Dados do ativo inválidos' })
    }
  })

  // Listar ativos de um cliente
  fastify.get('/clients/:clientId/assets', async (request, reply) => {
    try {
      const { clientId } = request.params as { clientId: string }
      const clientIdNum = Number(clientId)
      const assets = await prisma.asset.findMany({
        where: { clientId: clientIdNum },
      })
      reply.send(assets)
    } catch (error) {
      reply.code(400).send({ error: 'Erro ao buscar ativos do cliente' })
    }
  })

  // Listar assets fixos
  fastify.get('/assets', async () => {
  return [
    { id: 1, name: 'PETR4 (Petrobras PN)', currentValue: 38.45 },
    { id: 2, name: 'VALE3 (Vale ON)', currentValue: 67.10 },
    { id: 3, name: 'ITUB4 (Itaú Unibanco PN)', currentValue: 30.55 },
    { id: 4, name: 'B3SA3 (B3 ON)', currentValue: 12.34 },
    { id: 5, name: 'WEGE3 (Weg ON)', currentValue: 36.70 },
    { id: 6, name: 'BBAS3 (Banco do Brasil ON)', currentValue: 55.90 },
    { id: 7, name: 'IVVB11 (ETF S&P 500)', currentValue: 320.00 },
    { id: 8, name: 'FII HGLG11 (Logística)', currentValue: 170.20 },
    { id: 9, name: 'FII MXRF11 (Renda Fixa)', currentValue: 10.50 },
    { id: 10, name: 'Tesouro Selic 2027', currentValue: 113.20 },
    { id: 11, name: 'Tesouro IPCA+ 2035', currentValue: 91.80 },
    { id: 12, name: 'ABEV3 (Ambev ON)', currentValue: 14.22 },
  ]
  })
}
