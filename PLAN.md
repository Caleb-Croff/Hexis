# Hexis — Weight Tracking App: Implementation Plan

## Stack
- **React** (Vite) — frontend
- **Firebase Auth** — login/signup (email/password)
- **Firebase Firestore** — database
- **Recharts** — weight graphs
- **React Router** — page navigation

---

## Pages / Routes

| Route | Purpose |
|---|---|
| `/` | Landing / marketing page |
| `/login` | Sign in |
| `/signup` | Create account |
| `/dashboard` | Main app — log weight, view chart |
| `/history` | Table of all past entries (edit/delete) |

---

## Phase 1 — Project Setup
1. Scaffold with `npm create vite@latest` (React + JS or TS)
2. Install dependencies: `react-router-dom`, `firebase`, `recharts`
3. Configure Firebase project (Auth + Firestore)
4. Set up `.env` for Firebase credentials
5. Create folder structure: `src/components`, `src/pages`, `src/firebase`, `src/hooks`

## Phase 2 — Auth
1. Firebase Auth context (`AuthProvider`, `useAuth` hook)
2. Login and Signup pages with form validation
3. Protected routes (redirect to `/login` if not authenticated)
4. Logout functionality

## Phase 3 — Core CRUD (Dashboard)
1. Weight entry form (date + weight value)
2. Firestore: `weightEntries` subcollection under each user
3. Create, read, update, delete entries
4. History page — table view with edit/delete per row

## Phase 4 — Charts
1. Fetch entries and sort by date
2. Line chart showing weight over time
3. Time range filters: 1 week / 1 month / 3 months / 1 year / all time
4. Responsive chart sizing for mobile

## Phase 5 — Polish
1. Responsive layout (mobile-first)
2. Loading states, error messages
3. Landing page for unauthenticated visitors
4. Basic theming (clean, minimal design)

---

## Key Design Decisions
- **No backend server** — Firestore handles data, Firebase Auth handles identity. Keeps it simple.
- **Firestore security rules** — each user can only read/write their own entries (`request.auth.uid == resource.data.user_id`)
- **Recharts** over Chart.js — better React integration, no imperative DOM manipulation
