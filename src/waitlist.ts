// src/waitlist.ts
import { Hono } from 'hono'

// In-memory storage (replace with a database in production)
const waitlist = new Set<string>()

export const waitlistRouter = new Hono()

waitlistRouter.post('/join', async (c) => {
  try {
    const { email } = await c.req.json()
    
    if (!email || !email.includes('@')) {
      return c.json({ success: false, error: 'Invalid email address' }, 400)
    }

    if (waitlist.has(email)) {
      return c.json({ success: false, error: 'Email already registered' }, 400)
    }

    waitlist.add(email)
    console.log(`New waitlist signup: ${email}`)
    console.log(`Total waitlist size: ${waitlist.size}`)

    return c.json({ 
      success: true, 
      message: 'Successfully joined the waitlist',
      position: waitlist.size 
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    return c.json({ success: false, error: 'Server error' }, 500)
  }
})

waitlistRouter.get('/count', (c) => {
  return c.json({ count: waitlist.size })
})
