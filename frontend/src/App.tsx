import { useState, useEffect } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import './App.css'

function App() {
    const [totalSpent, setTotalSpent] = useState(0)


    useEffect(() => {
        async function fetchTotal () {
            const res = await fetch("/api/expenses/total-spent")
            const data = await res.json()
            setTotalSpent(data.expenses)
        }

        fetchTotal()
    }, [])
  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl text-amber-600">{totalSpent}</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    </>
  )
}

export default App
