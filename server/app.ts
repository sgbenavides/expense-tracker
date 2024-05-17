import { Hono } from 'hono'
import { logger } from "hono/logger"
import { expenseRoute } from "./routes/expenses.ts";
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use("*", logger())

app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

app.route("/api/expenses", expenseRoute)

export default app

