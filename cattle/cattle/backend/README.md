# Smart Livestock Backend

This Express backend provides basic APIs for Smart Livestock Management Dashboard including:

- Cows CRUD
- Trade records
- Disease prediction stub
- Advisory and grants

Run locally:

- npm install
- copy `.env.example` to `.env` and set `MONGODB_URI`
- npm run seed (to seed sample data)
- npm run dev (requires nodemon)

Next steps:
- Replace in-memory stores with a database (Postgres/MongoDB)
- Add authentication and role-based access control
- Integrate real ML model for predictions (see `services/predictService.js` for a stub and notes on integration)
