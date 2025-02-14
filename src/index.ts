// src/index.ts
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'
import { html } from 'hono/html'

const app = new Hono()

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './' }))

// Landing page route
app.get('/', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Satellite Services Marketplace</title>
        <script src="https://unpkg.com/lucide-react"></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div class="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
          <!-- Hero Section -->
          <div class="container mx-auto px-4 py-16">
            <div class="text-center mb-16">
              <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Book Satellite Services in Minutes
              </h1>
              <p class="text-xl md:text-2xl text-blue-200 mb-8">
                The first marketplace platform streamlining satellite service procurement
                for business and scientific users
              </p>
              <form id="waitlistForm" class="max-w-md mx-auto">
                <div class="flex gap-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email for early access"
                    class="flex-1 px-4 py-2 rounded-lg text-black"
                    required
                  />
                  <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold"
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            </div>

            <!-- Features Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              ${renderFeatureCard('search', 'Easy Search', 'Find the perfect satellite for your needs with our intelligent search system')}
              ${renderFeatureCard('clock', 'Real-time Booking', 'Book satellite time slots instantly through our streamlined platform')}
              ${renderFeatureCard('database', 'API Access', 'Integrate satellite services directly into your applications')}
              ${renderFeatureCard('rocket', 'Rapid Deployment', 'Get your satellite services up and running quickly')}
            </div>

            <!-- How It Works Section -->
            <div class="text-center mb-16">
              <h2 class="text-3xl font-bold mb-8">How It Works</h2>
              <div class="grid md:grid-cols-3 gap-8">
                ${renderStepCard('1', 'Search', 'Browse our marketplace of available satellite services')}
                ${renderStepCard('2', 'Book', 'Select your time slot and complete booking in minutes')}
                ${renderStepCard('3', 'Launch', 'Access your satellite service through our platform or API')}
              </div>
            </div>
          </div>
        </div>

        <script>
          document.getElementById('waitlistForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            try {
              const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
              });
              
              if (response.ok) {
                alert('Thanks for joining our waitlist!');
                document.getElementById('email').value = '';
              } else {
                alert('Something went wrong. Please try again.');
              }
            } catch (error) {
              console.error('Error:', error);
              alert('Something went wrong. Please try again.');
            }
          });
        </script>
      </body>
    </html>
  `)
})

// API route for waitlist
app.post('/api/waitlist', async (c) => {
  try {
    const { email } = await c.req.json()
    console.log('Waitlist signup:', email)
    // Here you would typically save this to a database
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Invalid request' }, 400)
  }
})

// Helper function to render feature cards
function renderFeatureCard(icon: string, title: string, description: string) {
  return html`
    <div class="bg-blue-900 bg-opacity-50 p-6 rounded-lg text-center">
      <div class="flex justify-center mb-4">
        <i data-lucide="${icon}" class="w-12 h-12 text-blue-400"></i>
      </div>
      <h3 class="text-xl font-semibold mb-2">${title}</h3>
      <p class="text-blue-200">${description}</p>
    </div>
  `
}

// Helper function to render step cards
function renderStepCard(number: string, title: string, description: string) {
  return html`
    <div class="border border-blue-500 rounded-lg p-6">
      <div class="text-3xl font-bold text-blue-400 mb-4">${number}</div>
      <h3 class="text-xl font-semibold mb-2">${title}</h3>
      <p class="text-blue-200">${description}</p>
    </div>
  `
}

export default app
