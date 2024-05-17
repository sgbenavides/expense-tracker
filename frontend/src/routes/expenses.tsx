import { createFileRoute } from '@tanstack/react-router';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton";


import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

export const Route = createFileRoute('/expenses')({
    component: Expenses,
})

async function getExpenses() {
    const res = await api.expenses.$get();
    if (!res.ok) {
        throw new Error("server error");
    }
    return await res.json();
}

function Expenses() {
    const { isPending, error, data } = useQuery({
        queryKey: ["get-all-expenses"],
        queryFn: getExpenses,
    });

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="p-4 max-w-3xl mx-auto">
        <Table>
            <TableCaption>A list of all your expenses.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isPending
                    ? Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                    <Skeleton className="h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4" />
                                </TableCell>
                            </TableRow>
                        ))
                    : data?.expenses.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell className="font-medium">{expense.id}</TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
        </div>
    );
}