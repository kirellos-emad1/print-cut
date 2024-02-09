import { title } from "process";
import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
})
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum of 8 characters required",
  }),
  name: z.string().min(3, {
    message: "Username is required",
  }),
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum of 8 characters required",
  }),
});

export const CreateProduct = z.object({
  category: z.string().min(3, {
    message: "please add a valid category"
  }),
  title: z.string().min(3, {
    message: "Please add a valid title"
  }),
  summary: z.string().min(3, {
    message: "Please add a valid summary"
  }),
  images: z.array(z.string()).optional(),
  description: z.string().min(3, {
    message: "please add a valid description"
  }),
  price_by_meter: z.string(),
  quantity_by_meter: z.string(),
  // created_by: z.string(),
});