# Habit Tracker

> A modern full-stack habit tracking application featuring daily habit tracking, streak monitoring, and heatmap visualization.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Technical Decisions](#technical-decisions)
- [Assumptions](#assumptions)
- [Future Improvements](#future-improvements)
- [Screenshots](#screenshots)

---

# Project Overview

Building habits is easy; maintaining them consistently is the real challenge. Habit Tracker was built to simplify that process by providing users with an intuitive platform to create habits, track daily progress, maintain streaks, and visualize long-term consistency through a heatmap.

The application is powered by a modern full-stack architecture using React, NestJS, PostgreSQL, Prisma, Redis, and Docker. It emphasizes secure authentication, scalability, maintainability, and clean software engineering practices while serving as a solid foundation for future enhancements such as advanced analytics, reminders, and premium features.

---

# Features

## Authentication
- User registration
- User login
- JWT authentication with Access token and Refresh token
- Protected routes

## Habit Management
- Create habits
- Update habits
- Delete habits
- View all habits

## Progress Tracking
- Daily habit completion
- Current streak
- Longest streak
- Completion history
- Heatmap visualization

## User Experience
- Loading states
- Error handling
- Empty states

---

# Tech Stack

### Frontend

- React
- TypeScript
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Axios

### Backend

- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Redis
- BullMQ
- Docker

---

# Getting Started

## Clone the repository

```bash
git clone <repository-url>
```

---

# Environment Variables

Backend requires the following environment variables.

```env
PORT=
NODE_ENV=

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DATABASE_URL=
REDIS_HOST=
REDIS_PORT=

JWT_SECRET=
JWT_ACCESS_TOKEN_EXPIRES_IN=
JWT_REFRESH_TOKEN_EXPIRES_IN=
JWT_EXPIRES_IN=
JWT_ISSUER=

LOG_LEVEL=
LOG_TO_FILE=
LOG_FILE_PATH=
```
Frontend requires the following environment variables.

```env
VITE_SERVER_BASE_URL=
```
---

# Running the Project

## Backend

1. Navigate to the backend directory.

```bash
cd habit-tracker-server
```

2. Install the project dependencies.

```bash
npm install
```

3. Start the application.

```bash
docker compose --profile dev up
```

4. Apply the database migrations.

```bash
npm run db:migrate
```

5. The backend API will be available at:

```text
http://localhost:3000
```

## Frontend

1. Navigate to the frontend directory.

```bash
cd habit-tracker-frontend
```

2. Install the project dependencies.

```bash
npm install
```

3. Start the development server.

```bash
npm run dev
```

4. Open the application in your browser.

```text
http://localhost:5173
```

---

# Technical Decisions

- Chose NestJS for its modular architecture, dependency injection, and scalability.
- Used Prisma ORM for type-safe database access and improved developer experience.
- Used TanStack Query for efficient server-state management and caching.
- Integrated React Hook Form with Zod for type-safe form validation.
- Implemented JWT authentication with access and refresh token rotation to secure protected endpoints.
- Used Redis for rate limiting to help mitigate brute-force and DDoS-style attacks.
- Leveraged BullMQ for background jobs, including scheduled cleanup of expired user sessions.

---

# Assumptions

- A habit can only be completed once per day.
- Users can only access their own habits.
- Authentication is required for all habit-related operations.
- Access tokens are short-lived, while refresh tokens are securely managed to maintain authenticated sessions.
- Deleted habits permanently remove their associated completion history.
- The application assumes a single-user personal habit tracking workflow and does not support shared or collaborative habits.

---

# Future Improvements

- Implement automated habit reminders through email and push notifications.
- Introduce a comprehensive analytics dashboard with completion trends, consistency scores, and personalized insights.
- Add advanced search, filtering, and sorting capabilities for improved habit management.
- Introduce subscription plans with premium features such as advanced analytics, unlimited habits, and priority support.
- Support recurring habit schedules (daily, weekly, and custom frequencies).
- Add achievement badges and gamification features to increase long-term user engagement.

---