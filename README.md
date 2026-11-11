# SpaceSync — Smart Campus Discovery & Reservation Platform (TIET Patiala)

SpaceSync is a premium dark-themed SaaS web application customized for **Thapar Institute of Engineering and Technology (TIET), Patiala**. It provides real-time room discovery, OpenStreetMap interactive GIS navigation, acoustic telemetry, and digital student badge check-in across university landmarks.

---

## 📍 TIET Campus Center Coordinates
- **Latitude**: `30.35447°N`
- **Longitude**: `76.36621°E`
- **Default Map Zoom**: `16`

---

## 🏛️ Integrated TIET Landmarks & Spaces

| Landmark Name | Short Code | Category | Geo-Coordinates | Bookable Status |
| :--- | :---: | :--- | :--- | :---: |
| **Nava Nalanda Central Library** | `NNL` | Central Library & Research | `[30.35338, 76.36445]` | ✅ Bookable (Silent Pods, Collab Rooms) |
| **Lecture Hall Complex (LHC / TAN)** | `LHC` | Academic Lecture Complex | `[30.35515, 76.36950]` | ✅ Bookable (Seminar Halls, Tutorial Suites) |
| **COS Complex** | `COS` | Student Activity & Computing | `[30.35420, 76.36530]` | ✅ Bookable (Society Collab Studios, Neural Compute) |
| **STEP / Venture Lab** | `STEP` | Incubation & Prototyping | `[30.35190, 76.36380]` | ✅ Bookable (Investor Boardroom, IoT Maker Bay) |
| **Main Auditorium** | `AUD` | Auditorium & Cultural Arena | `[30.35280, 76.36880]` | ✅ Bookable (Executive Steering Suite) |
| **Kravings Food Court** | `KFC` | Dining & Student Plaza | `[30.35620, 76.36480]` | ℹ️ Public Facility (Non-bookable) |
| **Main Gate (Bhadson Road)** | `GATE` | Campus Security & Entry | `[30.35690, 76.36210]` | ℹ️ Security Checkpoint (Non-bookable) |
| **Nirman Academic Block (F & G)** | `NRM` | Engineering Wing | `[30.35580, 76.36720]` | ✅ Bookable (Embedded Systems Studio) |

---

## 🚀 Key Features

### 1. Interactive TIET Campus Map (`Leaflet` + `react-leaflet`)
- Centered on TIET Patiala with CartoDB Dark Matter tiles matching `#10121A`.
- Custom categorized glowing SVG markers (Library, Academic, Student Hub, Innovation, Facility).
- Location popups with verified coordinates, photos, operating hours, and 1-click room exploration.
- Campus controls: **Center Campus** (`flyTo`), **Fullscreen Toggle**, **Map/List Split View**, and **Live Landmark Search**.
- Interactive mini-map preview embedded directly into the Student Dashboard.

### 2. Campus Room Directory & Bidirectional Navigation
- Centralized data in `src/data/campusLocations.js` and `src/data/rooms.js`.
- Click any landmark to see its rooms; click any room to locate its building on the map.
- Filter by capacity and facilities (4K Display, Whiteboards, Soundproofing, Projectors).

### 3. Advanced Booking Engine with Strict Validation
- **Overlap Prevention**: Rejects overlapping bookings for the same room on the same date.
- **Capacity Limits**: Prevents booking if attendees exceed room seating limit.
- **Operating Hours Enforcement**: Validates that reservations fall within building open hours.
- **Unavailable Slot Indicators**: Displays strikethroughs and disabled states for booked blocks.
- **Persistence**: Bookings and user preferences persist in `localStorage`.

---

## 💻 How to Run Locally

```powershell
cd "C:\Users\manas\.gemini\antigravity\scratch\spacesync"
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.
Click **"Campus Map"** in the top navigation or sidebar to explore TIET Patiala!
