import {z} from 'zod'

export const LoginSchema = z.object({
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
