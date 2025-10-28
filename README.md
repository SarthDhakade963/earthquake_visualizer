
# 🌍 Earthquake Visualizer

A real-time **Earthquake Visualization Dashboard** built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **Leaflet.js**, using live data from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

---

## 🚀 Features

* **📡 Real-Time Earthquake Data** – Fetches up-to-date earthquake info from USGS API.
* **🗺️ Interactive MapView** – Visualize quake locations using Leaflet; click on markers to view detailed data.
* **📊 Insights Dashboard** – Interactive Recharts display magnitude, region, and frequency insights.
* **📋 Earthquake List View** – Clean, scrollable list with essential quake details.
* **⚡ Server-Side Rendering (SSR)** – Optimized for performance and SEO using Next.js App Router.
* **🎨 Responsive UI** – Styled with Tailwind CSS for a modern, clean design.

---

## 🧩 Tech Stack

| Category               |  Technology                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------ |
| **Frontend Framework** | [Next.js 14+ (App Router)](https://nextjs.org/)                                      |
| **Language**           | [TypeScript](https://www.typescriptlang.org/)                                        |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)                                             |
| **Data Visualization** | [Recharts](https://recharts.org/en-US/)                                              |
| **Map Visualization**  | [React Leaflet](https://react-leaflet.js.org/)                                       |
| **API Source**         | [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) |

---

## 🧠 Project Structure

```
earthquake-visualizer/
│
├── app/
│   └── page.tsx                 # Main dashboard page (SSR)
│
├── components/
│   ├── EarthquakeDashboard.tsx  # High-level stats
│   ├── MapView.tsx              # Interactive map with markers
│   ├── InsightsChart.tsx        # Recharts visualization
│   ├── EarthquakeList.tsx       # List view of all quakes
│   └── TimeDisplay.tsx          # Date formatter
│
├── lib/
│   └── fetchEarthquakes.ts      # Fetches data from USGS API
│
├── types/
│   └── earthquake.ts            # TypeScript interfaces
│
├── styles/
│   └── globals.css              # Tailwind global styles
│
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/earthquake-visualizer.git
cd earthquake-visualizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) 🌐

---

## 🗺️ Map Interaction

* Click on any **map marker** to view quake details (location, magnitude, time).
* The map dynamically updates with new data when refreshed.

---

## 📊 Data Insights

* **Magnitude distribution**
* **Region frequency**
* **Time-based quake trends**
* Built using **Recharts** for interactivity and clarity.

---

## 🧪 Example API

```bash
GET https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

---

## 🛠️ Build for Production

```bash
npm run build
npm start
```

---