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

Habit Tracker is a modern full-stack web application designed to help users build long-term consistency by creating habits, tracking daily progress, maintaining streaks, and visualizing completion history through a GitHub-style heatmap.

The application emphasizes secure authentication, scalability, maintainability, and clean software engineering practices. It serves as a strong foundation for future enhancements such as advanced analytics, reminders, recurring schedules, and premium features.

---

# Features

## Authentication & Security
- User registration & Login
- Encryption, Session Management & Token Blacklisting
- JWT authentication with Access token and Refresh token
- Protected routes & Rate Limiting

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
- User-friendly error messages

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
- Used Prisma ORM for type-safe database access and an improved developer experience.
- Implemented JWT authentication with access and refresh token rotation to secure protected endpoints.
- Used Redis for rate limiting to help mitigate brute-force attacks.
- Leveraged BullMQ for background jobs, including scheduled cleanup of expired user sessions.
- Used TanStack Query for efficient server-state management and caching.
- Implemented URL-based modals using TanStack Router to enable deep linking, browser history navigation, and shareable modal states.
- Integrated React Hook Form with Zod for type-safe form validation.

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

# Screenshots

## Register

<img width="1892" height="946" alt="Image" src="https://github.com/user-attachments/assets/2de0220c-0a02-45e3-9847-073aceefdaa0" />

## Login

<img width="1892" height="946" alt="Image" src="https://github.com/user-attachments/assets/be7ae194-5409-4d60-83d8-3ff446bc36c2" />

## Dashboard Overview

<img width="1918" height="970" alt="Image" src="https://github.com/user-attachments/assets/a93ccbec-78b3-454c-9aa2-4f6ed21c17ab" />

## Add Habit

<img width="1309" height="812" alt="Image" src="https://github.com/user-attachments/assets/41ec74dd-2f8a-4bc7-bf4d-ea10a84a7241" />

## Habit Details

<img width="1472" height="826" alt="Image" src="https://github.com/user-attachments/assets/62627e83-fa0b-44ac-87f4-d5ce08aeb899" />

## Archived Habits

<img width="1883" height="969" alt="Image" src="https://github.com/user-attachments/assets/5e7884f8-67c9-4d74-a3b0-aecee31e3989" />

## Edit Habits

<img width="1309" height="812" alt="Image" src="https://github.com/user-attachments/assets/c0ae7301-be7c-4077-a92f-17b01a7833d2" />

## Habit Heatmap

<img width="574" height="481" alt="Image" src="https://github.com/user-attachments/assets/03e534a4-f192-4994-9d3c-833a257e53a8" />

## Heatmap Details

<img width="572" height="478" alt="Image" src="https://github.com/user-attachments/assets/59eef7f7-bc7a-4f2b-a187-b1cecc584873" />

---