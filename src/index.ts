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
          @keyframes orbit1 {
            from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }
          @keyframes orbit2 {
            from { transform: rotate(120deg) translateX(150px) rotate(0deg); }
            to { transform: rotate(480deg) translateX(150px) rotate(-360deg); }
          }
          @keyframes orbit3 {
            from { transform: rotate(240deg) translateX(80px) rotate(0deg); }
            to { transform: rotate(600deg) translateX(80px) rotate(-360deg); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes earthRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .satellite-1 {
            animation: orbit1 20s linear infinite;
            transform-origin: center;
          }
          .satellite-2 {
            animation: orbit2 25s linear infinite;
            transform-origin: center;
          }
          .satellite-3 {
            animation: orbit3 15s linear infinite;
            transform-origin: center;
          }
          .earth-rotation {
            animation: earthRotate 60s linear infinite;
          }
          .star {
            animation: twinkle 3s infinite;
          }
          .star:nth-child(2n) {
            animation-delay: 1s;
          }
          .star:nth-child(3n) {
            animation-delay: 2s;
          }
        </style>
      </head>
      <body class="bg-gradient-to-b from-blue-900 to-black min-h-screen text-white">
        <div class="container mx-auto px-4 py-16">
          <!-- Space Scene -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              <!-- Stars Background -->
              <g>
                ${Array.from({length: 50}, (_, i) => `
                  <circle 
                    cx="${Math.random() * 400}" 
                    cy="${Math.random() * 400}" 
                    r="${Math.random() * 0.5 + 0.5}" 
                    fill="white" 
                    class="star"
                  />
                `).join('')}
              </g>

              <!-- Earth -->
              <g transform="translate(200, 200)">
                <!-- Base Earth -->
                <circle cx="0" cy="0" r="50" fill="#1a67c9"/>
                
                <!-- Continents -->
                <g class="earth-rotation">
                  <!-- North America -->
                  <path d="M-20,-30 Q-10,-20 -15,-10 T-25,0" fill="#2f855a"/>
                  <!-- South America -->
                  <path d="M-15,0 Q-10,10 -15,20" fill="#2f855a"/>
                  <!-- Europe -->
                  <path d="M-5,-20 Q5,-15 15,-20" fill="#2f855a"/>
                  <!-- Africa -->
                  <path d="M0,-10 Q10,0 0,20" fill="#2f855a"/>
                  <!-- Asia -->
                  <path d="M15,-25 Q25,-15 20,0" fill="#2f855a"/>
                  <!-- Australia -->
                  <path d="M20,10 Q25,15 30,10" fill="#2f855a"/>
                </g>
                
                <!-- Atmosphere Glow -->
                <circle cx="0" cy="0" r="52" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.3"/>
                <circle cx="0" cy="0" r="54" fill="none" stroke="#93c5fd" stroke-width="0.5" opacity="0.2"/>
              </g>

              <!-- Satellites -->
              <g transform="translate(200, 200)">
                <!-- Communication Satellite -->
                <g class="satellite-1">
                  <rect x="-15" y="-6" width="30" height="12" fill="#4a5568" rx="2"/>
                  <rect x="-30" y="-8" width="12" height="16" fill="#4299e1"/>
                  <rect x="18" y="-8" width="12" height="16" fill="#4299e1"/>
                  <circle cx="0" cy="-12" r="4" fill="#e5e7eb"/>
                </g>

                <!-- Weather Satellite -->
                <g class="satellite-2">
                  <rect x="-10" y="-10" width="20" height="20" fill="#4a5568" rx="2"/>
                  <circle cx="0" cy="0" r="6" fill="#93c5fd"/>
                  <rect x="-20" y="-2" width="40" height="4" fill="#2d3748"/>
                </g>

                <!-- GPS Satellite -->
                <g class="satellite-3">
                  <rect x="-8" y="-8" width="16" height="16" fill="#4a5568" rx="2"/>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#e5e7eb" stroke-width="2"/>
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#e5e7eb" stroke-width="2"/>
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
