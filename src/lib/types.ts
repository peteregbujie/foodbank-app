import { z } from "zod"

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(10, "Name must be at least 6 characters")
      .max(30, { message: "Name must be less than 30 characters." }),
    email: z.string().email().nonempty("Email is required."),
    password: z.string().min(10, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z.string().email().nonempty("Name is required."),
  password: z.string().min(10, "Password must be at least 8 characters"),
})

export type TSignInSchema = z.infer<typeof signInSchema>
