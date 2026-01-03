# DevelUp Full-Stack

- Backend: Node.js, Express, Prisma (Neon Postgres)
- Frontend: Vite + React

## Setup

- Create `.env` from `.env.example` and set `DATABASE_URL` to Neon and `JWT_SECRET`.
- Install dependencies: `npm install`
- Generate Prisma client: `npm run prisma:generate`
- Create migrations: `npm run prisma:migrate`
- Seed products: `node -e "(async()=>{const fetch=await import('node-fetch');})();"` or call `POST /products/seed` after server starts.

## Run

- Start API: `npm run server:start`
- Start frontend: `npm run dev`

## Auth

- Signup: `POST /auth/signup` with `email`, `password`, `role` (`STARTUP_ADMIN` or `STUDENT`)
- Login: `POST /auth/login` returns `token`
- Use `Authorization: Bearer <token>` for protected routes

## Key Routes

- Products: `GET /products`, `POST /products/:key/trial/start`, `POST /products/:key/trial/consume`
- Helpdesk: `GET/POST /helpdesk/agents`, `GET/POST /helpdesk/customers`, `GET/POST /helpdesk/tickets`, `PATCH /helpdesk/tickets/:id`
- Audit: `GET/POST /audit/audits`, `GET/POST /audit/findings`, `PATCH /audit/findings/:id`
- Payroll: `GET/POST/PATCH/DELETE /payroll/employees`, `GET /payroll/payslips`, `POST /payroll/payslips/generate`, `GET/PATCH /payroll/settings`
- Students: `GET/POST /students/resume`

## Tests

- Run: `npm test`
- Includes integration tests for auth, CRUD, trials

