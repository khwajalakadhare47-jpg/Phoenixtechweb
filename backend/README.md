# TechWeb Backend

## Setup
1. Copy environment file:
   - Create `.env` based on `.env.example`
2. Install dependencies:
   - `npm install`
3. Start server:
   - `npm run dev`

## API
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Courses: `GET /api/courses`, `POST /api/courses`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`
- Gallery: `GET /api/gallery`, `POST /api/gallery`, `PUT /api/gallery/:id`, `DELETE /api/gallery/:id`
- Admissions: `POST /api/admissions`, `GET /api/admissions`, `PATCH /api/admissions/:id/status`, `DELETE /api/admissions/:id`

All create/update/delete routes require Bearer token auth except `POST /api/admissions`.
