import z from "zod"

const FormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

type FormType = z.infer<typeof FormSchema>;

export { FormSchema }
export type { FormType }