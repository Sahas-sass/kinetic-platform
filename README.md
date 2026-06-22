# ⚡ KINETIC - From Talent to Income

**Team Nexio 2.0 | University of Moratuwa**

## 📖 Overview
Kinetic is an AI-driven freelance transition platform designed to help student creatives confidently turn their skills into actual income[cite: 1]. While traditional global platforms cater heavily to experienced professionals, Kinetic provides a safe, guided, and structured environment specifically for beginners to land their first client and build a portfolio[cite: 1].

## 🚨 The Problem
Many students spend hours honing practical skills in graphic design, UI/UX, and software development but struggle to monetize them[cite: 1]. They face a severe "first client barrier" driven by:
* A lack of business and communication soft skills[cite: 1].
* Confusion around how to price services[cite: 1].
* High competition and algorithm biases on existing global marketplaces[cite: 1].
* Fear of exploitation and a lack of secure payment structures in the local gig economy[cite: 1].

## 💡 The Solution
Kinetic bridges the "learning to earning" gap by simulating real-world freelance environments[cite: 1]. Rather than just being an open marketplace, Kinetic acts as a career launch system that prepares, supports, and connects students as they navigate their early freelance journey[cite: 1].

## ✨ Key Features
* **AI Client Simulation:** Practice negotiating, clarifying requirements, and handling real-world project scenarios with an AI client to build confidence before talking to real clients[cite: 1].
* **AI Skill Assessment & Smart Pricing:** Receive personalized recommendations on realistic service offerings and beginner-friendly pricing strategies based on your actual skill level[cite: 1].
* **Guided Project Workflow:** Clear step-by-step task breakdowns, communication tips, and deadline tracking so first-time freelancers never feel overwhelmed[cite: 1].
* **Beginner-Friendly Opportunity Matching:** Connects users with entry-level local freelance opportunities, prioritizing fairness over established ratings[cite: 1].
* **Secure Micro-Contracts:** Built-in milestone-based payment structures tailored for the local context to ensure safe transactions[cite: 1].

## 🛠️ Tech Stack
* **Frontend:** Next.js (App Router), Tailwind CSS v4, Zustand, Lucide React
* **Backend, Auth & Database:** Supabase (PostgreSQL, Authentication, Storage)
* **AI Engine:** Vercel AI SDK powered by OpenAI / Anthropic
* **Payments:** PayHere / Webxpay (Local LKR integration)
* **Hosting & Deployment:** Vercel

## 🚀 Getting Started

First, install the dependencies:
\`\`\`bash
npm install
\`\`\`

Set up your local environment variables in a \`.env.local\` file:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the platform.