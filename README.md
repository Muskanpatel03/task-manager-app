# Task Manager App

A simple full-stack Task Manager application that allows users to create, view, update, and delete tasks.

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express
- Storage: In-memory (no database)

## Features
- Add a new task
- View all tasks (latest on top)
- Mark task as completed
- Delete a task
- Loading and error handling

## API Endpoints
- GET /tasks → Get all tasks  
- POST /tasks → Create task  
- PATCH /tasks/:id → Update task status  
- DELETE /tasks/:id → Delete task  

## Setup

### Backend
cd backend  
npm install  
node server.js  

Runs on: http://localhost:5000

### Frontend
cd frontend  
npm install  
npm start  

Runs on: http://localhost:3000

## Notes
- Used in-memory storage for simplicity.
- New tasks are added at the top for better user experience.
- Focused on clean structure and functionality as per assignment.

## Status
Completed and ready for submission.
