
# 🏟️ AuraFlow — Smart Venue Experience Platform

> AI-powered platform that transforms large-scale sporting event experiences through intelligent crowd management, real-time queue optimization, and personalized attendee services.

## 🔗 Links
- **Live Demo**: https://auraflow-firebase.web.app/
- **GitHub**: https://github.com/suchiii29/auraflow-ai

---

## 🎯 Problem Statement
**PromptWars Virtual Challenge 1** — Hack2Skill x Google for Developers

Design a solution that improves the physical event experience for attendees at large-scale sporting venues addressing crowd movement, waiting times, and real-time coordination.

Built for **Bengaluru Sports Arena** — capacity: 45,000 attendees.

---

## ✨ Features

### 👤 Attendee Side
- 🗺️ **Navigation** — Interactive SVG venue map with color-coded crowd zones (Green/Yellow/Red) and best route suggestions
- ⏱️ **Queues** — Live wait times, virtual queue joining from your seat, auto-updates every 5 seconds
- 🍔 **Pre-Order** — Full food & beverage menu, cart, pickup slot booking, order confirmation
- 🤖 **AuraGuide AI** — Google Gemini 1.5 Flash powered concierge for natural language venue assistance with multilingual support
- 🛡️ **Safety** — Emergency SOS button, first aid locations, security contacts
- 🏪 **Amenities** — Food directory, restrooms, parking, WiFi, merchandise

### 🎛️ Ops Center (Staff/Management)
- Real-time crowd heatmap
- Queue SLA monitoring dashboard
- AI predictive bottleneck alerts (15–30 min ahead)
- Staff dispatch and redeployment tools
- Live attendance counter
- Incident management feed

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| AI | Google Gemini 1.5 Flash API |
| Deployment | Firebase Hosting |

---

## 🚀 Getting Started

```bash
git clone https://github.com/suchiii29/auraflow-ai.git
cd auraflow-ai
npm install
```

Create a `.env` file:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

```bash
npm run dev
```
Open http://localhost:5173

---

## 🏗️ Project Structure
src/
components/
Navbar.jsx
BottomNav.jsx
views/
LandingPage.jsx
AttendeeDashboard.jsx
OpsCommandCenter.jsx
SafetyView.jsx
AmenitiesView.jsx
hooks/
useSimulatedData.js
utils/
aiService.js

---

## 👩‍💻 Built for PromptWars 2026
**Hack2Skill x Google for Developers**
Built with Google Antigravity
