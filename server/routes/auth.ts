import {Hono} from "hono"
import {z} from "zod"
import {kindeClient, sessionManager} from "../kinde.tsx";


const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(255),
    amount: z.number().int().positive(),
})

const createPostSchema = expenseSchema.omit({id: true})


export const authRoute = new Hono()
    .get("/login", async (c) => {
        const loginUrl = await kindeClient.login(sessionManager(c));
        return c.redirect(loginUrl.toString());
    })

    .get("/register", async (c) => {
        const registerUrl = await kindeClient.register(sessionManager(c));
        return c.redirect(registerUrl.toString());
    })
    .get("/callback", async (c) => {
        const url = new URL(`${c.req.url}`);
        await kindeClient.handleRedirectToApp(sessionManager(c), url);
        return c.redirect("/");
    })
    .get("/logout", async (c) => {
        const logoutUrl = await kindeClient.logout(sessionManager(c));
        return c.redirect(logoutUrl.toString());
    })
    .get('/me', async (c) => {
        const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c)); // Boolean: true or false
        if (isAuthenticated) {
            return c.json({ isAuthenticated: true });
        } else {
            return c.json({ isAuthenticated: false });
        }
    })
