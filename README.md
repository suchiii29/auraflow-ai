# 🏟️ AuraFlow — Smart Venue Experience Platform

## Overview
AuraFlow is an AI-powered platform that transforms large-scale sporting event experiences through intelligent crowd management, real-time queue optimization, and personalized attendee services. Built for Bengaluru Sports Arena with a capacity of 45,000 attendees.

## Problem Statement
**Physical Event Experience** — *PromptWars Virtual Challenge 1* by Hack2Skill x Google for Developers.
Design a solution that improves the physical event experience for attendees at large-scale sporting venues addressing crowd movement, waiting times, and real-time coordination.

## Live Demo
[Deployed Link Here]

## GitHub
[https://github.com/suchiii29/auraflow-ai](https://github.com/suchiii29/auraflow-ai)

---

## ✨ Features

### 👤 Attendee Side
#### 1. Navigation Tab
- **Interactive SVG venue map** of Bengaluru Sports Arena.
- **Color-coded zones**: Green (clear), Yellow (moderate), Red (congested).
- **Real-time crowd density** per zone.
- **Best route suggestions** to your seat.
- **Current location indicator**.

#### 2. Queues Tab  
- **Live wait times** for all venue amenities.
- **Virtual queue joining** — join from your seat.
- **Position tracker** with countdown.
- **Queue status**: Concessions, Restrooms, Merch, VIP Lounge.
- **Auto-updates** every 5 seconds.

#### 3. Pre-Order Tab
- **Full food and beverage menu** with prices.
- **Add to cart** functionality.
- **Order placement** with pickup time slot.
- **Order confirmation** with counter number.

#### 4. AuraGuide AI Concierge
- **Powered by Google Gemini 1.5 Flash API**.
- **Natural language** venue assistance.
- **Quick question chips** for common queries.
- **Knows everything** about the venue, events, and amenities.
- **Multilingual support**.

### 🎛️ Ops Center (Staff/Management)
- **Real-time crowd heatmap** using Recharts.
- **Queue SLA monitoring** dashboard.
- **AI predictive bottleneck alerts** (15-30 min ahead).
- **Staff dispatch** and redeployment tools.
- **Live attendance counter**.
- **Incident management feed**.

### 🛡️ Safety
- **Emergency SOS button** — instant alert to venue security.
- **First Aid post locations** list.
- **Security contact** dashboard.
- **Medical posts map** coverage visualization.

### 🍔 Amenities
- **Complete food and beverage directory**.
- **Restroom locations** by zone/distance.
- **Parking information** and zone availability.
- **WiFi access details** and auto-connection.
- **Merchandise store** locations.

### 🔔 Smart Notifications
- **Gate congestion alerts**.
- **Pre-order ready** notifications.
- **Event announcements**.
- **Halftime show reminders**.

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
| Build Tool | Vite 8.0 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))

### Installation
```bash
git clone https://github.com/suchiii29/auraflow-ai.git
cd auraflow-ai
npm install
```

### Environment Setup
Create a `.env` file in root:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### Build for Production
```bash
npm run build
```

---

## 📱 How to Use

### As an Attendee:
1. Open the app on your phone at the venue.
2. Dashboard shows your current location (**Gate B area**).
3. Click **Navigation** tab to see venue map and find your seat.
4. Click **Queues** tab to check wait times and join virtual queues.
5. Click **Pre-Order** tab to order food before halftime.
6. Click **AuraGuide** to ask AI anything about the venue.
7. Check **Safety** tab for emergency contacts and SOS.
8. Check **Amenities** tab for food, parking, and WiFi info.

### As Venue Staff/Manager:
1. Toggle to **Ops Center** from top navigation.
2. Monitor real-time crowd density heatmap.
3. Watch **Queue SLA monitor** for bottlenecks.
4. Read **AI predictive alerts** and take action.
5. Dispatch staff to high-priority zones.
6. Track attendance and incidents live.

---

## 🏗️ Project Structure
```text
src/
  components/
    Navbar.jsx         # Top navigation with dropdowns
    BottomNav.jsx      # Mobile navigation
  views/
    LandingPage.jsx    # Hero section & stats ticker
    AttendeeDashboard.jsx # Main attendee interface
    OpsCommandCenter.jsx  # Staff management hub
    SafetyView.jsx     # Emergency & first aid
    AmenitiesView.jsx   # Venue service directory
  hooks/
    useSimulatedData.js # Live metric simulation
  utils/
    aiService.js       # Google Gemini integration
```

---

## 👨‍💻 Built for PromptWars 2026
**Hack2Skill x Google for Developers**
Team: AuraFlow
