import { Hono } from "hono"
import {zValidator} from "@hono/zod-validator";
import { z } from "zod"


const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(255),
    amount: z.number().int().positive(),
})

const createPostSchema =  expenseSchema.omit({id: true})

type Expense = z.infer<typeof expenseSchema>

const fakeExpensesData: Expense[] = [
    { id: 1, title: "Rent", amount: 1200 },
    { id: 2, title: "Groceries", amount: 250 },
    { id: 3, title: "Internet", amount: 50 },
    { id: 4, title: "Fuel", amount: 100 },
    { id: 5, title: "Entertainment", amount: 200 },
];
export const expensesRoute = new Hono()
.get("/", (c) => {
    return c.json({expenses: fakeExpensesData})
})
.get("/total-spent", (c) => {
    const totalSpent = fakeExpensesData.reduce((sum, expense) => sum + expense.amount, 0);

    return c.json({expenses: totalSpent})
})
.get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpensesData.find(expense => expense.id === id)

    if(!expense) {
        return c.notFound()
    }

        return c.json({expense})
})
.post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json")
    fakeExpensesData.push({
        ...expense,
            id: fakeExpensesData.length + 1,
    })
    return c.json({})
})
.delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpensesData.find(expense => expense.id === id)

    if(!expense) {
        return c.notFound()
    }
    const index = fakeExpensesData.findIndex(expense => expense.id === id)

    const deleteExpense = fakeExpensesData.splice(index, 1)[0]

    return c.json({deleteExpense})
})