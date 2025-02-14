// src/index.ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Important: Use the PORT from environment variable
const port = process.env.PORT || 3000

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: parseInt(port.toString())
})
