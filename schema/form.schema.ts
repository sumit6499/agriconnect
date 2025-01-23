import {z} from 'zod'

export const formSchema = z.object({
  name:z.string().trim().min(2,{
    message:"Name must be at least 2 character long"
  }).max(30),
  email: z.string().trim().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().trim().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  accountType: z.enum(["farmer", "customer"], {
    required_error: "Please select an account type.",
  }),
  pmkisanId: z
    .string()
    .trim()
    .length(12,{message:"PMKISAN ID must be 12 character long"})
})