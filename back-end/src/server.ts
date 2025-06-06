import Fastify, { fastify } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { clientsRoutes } from '../routes/clients'

async function main() {
  const app = Fastify()
  const prisma = new PrismaClient()

  await clientsRoutes(app)

  app.get('/ping', async () => {
    return { message: 'pong' }
  })

  await app.listen({ port: 3001, host: '0.0.0.0' })
  console.log('Server running at http://localhost:3001')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
