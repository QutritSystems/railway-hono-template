import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

app.get('/', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Satellite Services</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(40px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(40px) rotate(-360deg);
            }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          .star {
            animation: twinkle 3s infinite;
          }
          .satellite {
            animation: orbit 20s linear infinite;
          }
        </style>
      </head>
      <body class="bg-gradient-to-b from-blue-900 to-black min-h-screen text-white">
        <div class="container mx-auto px-4 py-16">
          <!-- Stars and Satellite Animation -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              <!-- Stars -->
              <circle cx="50" cy="50" r="1" fill="white" class="star" style="animation-delay: 0s"/>
              <circle cx="150" cy="80" r="1" fill="white" class="star" style="animation-delay: 0.5s"/>
              <circle cx="250" cy="60" r="1" fill="white" class="star" style="animation-delay: 1s"/>
              <circle cx="350" cy="90" r="1" fill="white" class="star" style="animation-delay: 1.5s"/>
              <circle cx="100" cy="150" r="1" fill="white" class="star" style="animation-delay: 2s"/>
              
              <!-- Satellite -->
              <g class="satellite">
                <rect x="-15" y="-6" width="30" height="12" fill="#4a5568" rx="2"/>
                <rect x="-20" y="-2" width="40" height="4" fill="#2d3748"/>
                <!-- Solar Panels -->
                <rect x="-30" y="-8" width="12" height="16" fill="#4299e1"/>
                <rect x="18" y="-8" width="12" height="16" fill="#4299e1"/>
                <!-- Antenna -->
                <line x1="0" y1="-6" x2="0" y2="-12" stroke="#a0aec0" stroke-width="1"/>
                <circle cx="0" cy="-12" r="2" fill="#a0aec0"/>
              </g>
            </svg>
          </div>

          <!-- Hero Section -->
          <div class="text-center max-w-3xl mx-auto relative">
            <h1 class="text-4xl font-bold mb-6">
              Book Satellite Services in Minutes
            </h1>
            <p class="text-xl text-blue-200 mb-8">
              The first marketplace platform for satellite services
            </p>
            
            <!-- Waitlist Form -->
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
              <div class="border border-blue-500 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-2">Easy Search</h3>
                <p class="text-blue-200">Find the perfect satellite for your needs</p>
              </div>
              <div class="border border-blue-500 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-2">Quick Booking</h3>
                <p class="text-blue-200">Book satellite time slots instantly</p>
              </div>
              <div class="border border-blue-500 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-2">API Access</h3>
                <p class="text-blue-200">Integrate directly into your applications</p>
              </div>
            </div>
          </div>
        </div>

        <script>
          document.getElementById('waitlistForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            alert('Thanks for joining our waitlist! (Demo only)');
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
