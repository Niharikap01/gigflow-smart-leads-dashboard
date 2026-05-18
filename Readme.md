# GigFlow Smart Leads Dashboard

A full-stack CRM dashboard application built for the ServiceHive Full Stack Development Internship assignment.

## Features

- JWT Authentication
- User Registration & Login
- Protected Routes
- Lead Management CRUD
- Search Leads
- Filter Leads
- Pagination
- CSV Export
- Zustand State Management
- Responsive UI
- Error Handling
- Form Validation
- Loading & Empty States

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- Zustand

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Project Structure

/client → Frontend  
/server → Backend

## Setup Instructions

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create `.env` inside server:

```env
PORT=5000
MONGO_URI=mongodb+srv://niharikapareek200_db_user:<db_password>@cluster0.qbydmou.mongodb.net/?appName=Cluster0
JWT_SECRET=niharika_jwt_secret
```
# Docker Support

Docker configuration files are included.

Run using:

```bash
docker-compose up --build
```

---
# Docker Support

Docker configuration files are included.

Run using:

```bash
docker-compose up --build
```

---
## Live Links

Frontend:  
https://gigflow-smart-leads-dashboard-phi.vercel.app/

Backend:  
https://gigflow-smart-leads-dashboard-msor.onrender.com