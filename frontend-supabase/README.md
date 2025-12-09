<h1 align="center">🔐 EcoRides – Full Stack Version (Supabase Auth + Database)</h1>

<p align="center">
A complete production-ready version of EcoRides featuring authentication, database persistence, secure routing, and real-time Supabase integration.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-v18-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vite-Fast%20Builds-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-v3-38BDF8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ShadCN-UI-black?style=for-the-badge" />
</p>

---

# 🧠 Overview

This version contains the **full backend-enabled logic** for EcoRides.  

It includes:

- 🔑 **User Authentication** (Email login via Supabase Auth)  
- 🗂️ **Ride offers stored in database**  
- 🌱 **Persistent Green Points system**  
- 👥 **Community creation, membership & CRUD operations**  
- 🔒 **Protected routes using React Router**  
- 🔄 **Real-time features powered by Supabase**  

This is the version intended for full-stack developers or anyone wanting to extend EcoRides with backend capabilities.

---

# ⚠️ Environment Variables (Required)

Create a `.env` file inside this folder (`frontend-supabase/`):
```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

💡 **DO NOT use or share `service_role_key`**  
💡 Your own Supabase project is required

A `.env.example` file is included for reference.

---

# 🏗 Architecture Diagram

```
Frontend (React + Vite)
|
|---- supabase.auth (login / logout / session)
|
|---- supabase.from("rides") (CRUD operations)
|
|---- supabase.from("communities") (real-time sync)
|
Supabase Backend (Auth + Database + Policies)
```


---

# 🔑 Authentication Flow

1. User signs up/logs in using email  
2. Supabase returns a session object  
3. `AuthContext.tsx` stores the user state  
4. Protected pages are wrapped inside `<ProtectedRoute>`  
5. Sessions persist automatically via Supabase  

---

# 📁 Folder Structure

```
frontend-supabase/
│
├── src/
│ ├── contexts/
│ │ └── AuthContext.tsx # User auth state & listeners
│ ├── components/
│ │ └── ProtectedRoute.tsx # Blocks pages for non-authenticated users
│ ├── lib/
│ │ └── supabase.ts # Supabase client instance
│ ├── pages/ # All screens (Profile, Rides, Auth, etc.)
│ └── main.tsx # App entrypoint
│
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md
```

---

# 🚀 Running Locally

### 1️⃣ Install dependencies

```bash
npm install
```
### 2️⃣ Start development server
```bash
npm run dev
```
Your app runs at:
```
http://localhost:5173
```
---

# 🛠 Supabase Setup Instructions

### 1️⃣ Create a new Supabase project
```
https://app.supabase.com
```
### 2️⃣ Get your project credentials
Go to → Project Settings → API
Copy:
```
Project URL
Public ANON key
```
Insert them in .env.


### 3️⃣ Enable Authentication
Go to → Auth → Providers:
Enable Email sign-in
Add redirect URL:
```
http://localhost:5173
```

### 4️⃣ Create Required Tables (Optional)

If your app uses:
- profiles
- rides
- communities
- community_members
- green_points
Create them manually or via SQL (schema export optional).

### 5️⃣ Apply Row Level Security

Ensure your tables have RLS enabled.
Example policy:
```
Allow users to insert and update their own data
```

---

# 🔒 Protected Routes
This version uses:
```
ProtectedRoute.tsx
```

Blocks anonymous users:
```
<ProtectedRoute>
   <Profile />
</ProtectedRoute>
```

***AuthContext.tsx***

Manages:
- session persistence
- user state
- login/logout
- Supabase listeners

---
# 🧰 Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Frontend   | React + TypeScript + Vite |
| UI         | TailwindCSS + ShadCN UI   |
| Icons      | Lucide Icons              |
| Routing    | React Router              |
| Auth       | Supabase Auth             |
| Database   | Supabase Postgres         |
| Deployment | Render / Vercel           |

---
# ⭐ Support This Project
If you like EcoRides, or if this Supabase version helped you learn full-stack development —
please consider starring the main repo ⭐

<p align="center"> <img src="https://img.shields.io/github/stars/DhawalThombare37/Eco-Rides?style=social" /> </p>

Your support motivates further improvements 🚀💚

---
# 📄 License
MIT License

---


