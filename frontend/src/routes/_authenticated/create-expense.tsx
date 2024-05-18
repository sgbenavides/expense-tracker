import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useForm} from '@tanstack/react-form'

import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Button} from "@/components/ui/button.tsx"

import {api} from "@/lib/api.ts";

export const Route = createFileRoute('/_authenticated/create-expense')({
    component: CreateExpense
})

function CreateExpense() {
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
        },
        onSubmit: async ({value}) => {
            const res = await api.expenses.$post({json: value})
            if (!res.ok) {
                throw new Error("server error");
            }
            navigate({to: "/expenses"})
        },
    })

    return <div>
        <h1>Create Expense</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">

            <form
                className="max-w-xl m-auto"
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <form.Field
                    name="title"
                    children={(field) => (

                        <>
                            <Label htmlFor={field.name}>Title</Label>
                            <Input id={field.name} placeholder="Title" name={field.name}
                                   value={field.state.value}
                                   onBlur={field.handleBlur}
                                   onChange={(e) => field.handleChange(e.target.value)}/>
                            <>
                                {field.state.meta.touchedErrors ? (
                                    <em>{field.state.meta.touchedErrors}</em>
                                ) : null}
                                {field.state.meta.isValidating ? 'Validating...' : null}
                            </>
                        </>
                    )}
                />
                <form.Field
                    name="amount"
                    children={(field) => (

                        <>
                            <Label htmlFor={field.name}>Amount</Label>
                            <Input id={field.name} placeholder="Amount" name={field.name}
                                   value={field.state.value}
                                   onBlur={field.handleBlur}
                                   onChange={(e) => field.handleChange(Number(e.target.value))}/>
                            <>
                                {field.state.meta.touchedErrors ? (
                                    <em>{field.state.meta.touchedErrors}</em>
                                ) : null}
                                {field.state.meta.isValidating ? 'Validating...' : null}
                            </>
                        </>
                    )}
                />

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button className="mt-4" type="submit" disabled={!canSubmit}>
                            {isSubmitting ? '...' : 'Create Expense'}
                        </Button>
                    )}
                />

            </form>
        </div>
    </div>
}