import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { getDbPath } from './ensureTables'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export function createPrismaClient() {
  const dbPath = getDbPath()
  const adapter = new PrismaBetterSqlite3({
    url: `file:${dbPath}`,
  })
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

// Use a getter so Prisma client is created lazily (after ensureTables copies DB)
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient()
    }
    return (globalForPrisma.prisma as unknown as Record<string | symbol, unknown>)[prop]
  }
})
