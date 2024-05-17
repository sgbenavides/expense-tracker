import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { api } from "@/lib/api"
import {
    useQuery,
} from '@tanstack/react-query'

async function getTotalSpent() {
   const res = await api.expenses["total-spent"].$get()

    if(!res.ok) {
        throw new Error("server error")
    }
    return await res.json()
}

function App() {
    const { isPending, error, data } = useQuery({ queryKey: ['todos'], queryFn: getTotalSpent })

    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message


    return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl text-amber-600">{data.expenses}</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    </>
  )
}

export default App
