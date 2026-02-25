# 💳 Card Dashboard

A responsive card management dashboard built using **React** that displays burner and subscription cards with filtering, search, and infinite scrolling.

This project demonstrates clean UI design, modular architecture, and efficient data handling with paginated APIs.

---

## 🚀 Live Demo

👉 https://card-dashboard-sage.vercel.app/

---

## 📦 Features

### 🗂 Tabs Navigation

- **Your** → shows cards owned by current user
- **All** → shows all cards
- **Blocked** → shows blocked cards only

---

### 💳 Card Types

Two card types are supported:

#### 🔥 Burner Cards

- Shows **expiry date**
- Ideal for one-time usage

#### 🔄 Subscription Cards

- Shows **spending limit**
- Used for recurring payments

---

### 🔍 Search Functionality

- Search cards by **name**
- Case-insensitive filtering
- Instant results

---

### 🎯 Filter by Card Type

- All Types
- Burner
- Subscription

---

### ♾ Infinite Scroll (Paginated API)

- Fetches **10 cards per request**
- Automatically loads more when scrolling
- Stops when all records are loaded
- Total mock records: **20**

---

### 📊 Budget Usage Indicator

- Visual progress bar
- Shows spent vs available balance
- Turns red when limit exceeded

---

### 🟢 Card Status

- Active → green indicator
- Blocked → red indicator

---

### 🎨 UI/UX Enhancements

- Responsive grid layout
- Dynamic avatar colors
- Smooth hover effects
- Loading spinner
- Empty state UI
- Clean & modern dashboard styling

---

## 🛠 Tech Stack

- React (Vite)
- Tailwind CSS
- Font Awesome Icons
- Intersection Observer API (Infinite Scroll)

---

## 📁 Project Structure

```
src/
 ├── components/
 │   └── Card.jsx
 ├── services/
 │   ├── api.js
 │   └── mockData.js
 ├── pages/
 │   └── Dashboard.jsx
 └── main.jsx
```

---

## ⚙️ How It Works

### Pagination

The mock API returns paginated results:

- Page size: **10 cards**
- Total records: **20 cards**

Infinite scroll loads additional pages automatically.

---

### Filtering Logic

1. API data is fetched.
2. Tabs filter data based on:
   - owner_id
   - status

3. Search & dropdown filters are applied.
4. Filtered results are rendered.

---

## 🧪 Mock API Structure

```json
{
  "data": [...cards],
  "page": 1,
  "per_page": 10,
  "total": 20
}
```

---

## ▶️ Running Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/aviraljoshi12/card-dashboard.git
```

### 2️⃣ Navigate into project

```
cd card-dashboard
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Start development server

```
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## 💡 Design Decisions

- Infinite scroll improves UX by loading data progressively.
- Filtering is applied on the client side for responsiveness.
- Intersection Observer is used for efficient scroll detection.
- Tailwind CSS ensures consistent and responsive styling.

---

## 👨‍💻 Author

**Aviral Joshi**

Frontend Developer

---
