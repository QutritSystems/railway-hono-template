import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Satellite Services</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }
          .satellite {
            animation: orbit 20s linear infinite;
            transform-origin: center;
          }
        </style>
      </head>
      <body class="bg-gradient-to-b from-blue-900 to-black min-h-screen text-white">
        <div class="container mx-auto px-4 py-16">
          <!-- Space Scene -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              <!-- Earth -->
              <g transform="translate(200, 200)">
                <circle cx="0" cy="0" r="50" fill="#1E40AF"/>
                <circle cx="0" cy="0" r="52" fill="none" stroke="#60A5FA" stroke-width="1" opacity="0.3"/>
              </g>
              
              <!-- Satellite -->
              <g transform="translate(200, 200)">
                <g class="satellite">
                  <rect x="-15" y="-6" width="30" height="12" fill="#4a5568" rx="2"/>
                  <rect x="-20" y="-2" width="40" height="4" fill="#2d3748"/>
                  <rect x="-30" y="-8" width="12" height="16" fill="#4299e1"/>
                  <rect x="18" y="-8" width="12" height="16" fill="#4299e1"/>
                </g>
              </g>
            </svg>
          </div>

          <!-- Content -->
          <div class="text-center max-w-3xl mx-auto relative">
            <h1 class="text-4xl font-bold mb-6">
              Book Satellite Services in Minutes
            </h1>
            <p class="text-xl text-blue-200 mb-8">
              The first marketplace platform for satellite services
            </p>
            
            <!-- Form -->
            <form id="waitlistForm" class="max-w-md mx-auto mb-16">
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

            <!-- Features -->
            <div class="grid md:grid-cols-3 gap-8">
              <div class="border border-blue-500 rounded-lg p-6 bg-blue-900 bg-opacity-20">
                <h3 class="text-xl font-semibold mb-2">Easy Search</h3>
                <p class="text-blue-200">Find the perfect satellite for your needs</p>
              </div>
              <div class="border border-blue-500 rounded-lg p-6 bg-blue-900 bg-opacity-20">
                <h3 class="text-xl font-semibold mb-2">Quick Booking</h3>
                <p class="text-blue-200">Book satellite time slots instantly</p>
              </div>
              <div class="border border-blue-500 rounded-lg p-6 bg-blue-900 bg-opacity-20">
                <h3 class="text-xl font-semibold mb-2">API Access</h3>
                <p class="text-blue-200">Integrate directly into your applications</p>
              </div>
            </div>
          </div>
        </div>

        <script>
          document.getElementById('waitlistForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            alert('Thanks for joining our waitlist!');
            document.getElementById('email').value = '';
          });
        </script>
      </body>
    </html>
  `)
})

const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: parseInt(port.toString())
})

export default app
