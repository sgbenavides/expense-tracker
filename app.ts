import { Hono } from 'hono'
import { logger } from "hono/logger"
import { expenseRoute } from "./routes/expenses.ts";

const app = new Hono()

app.use("*", logger())
app.get('/', (c) => c.text('Hono!'))

app.route("/api/expenses", expenseRoute)

export default app