import {z} from 'zod'

export const marketplaceSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters long.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long.",
  }),
  category: z.string({
    required_error: "Please select a product category.",
  }),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  quantity: z.number().int().positive({
    message: "Quantity must be a positive integer.",
  }),
  unit: z.string({
    required_error: "Please select a unit of measurement.",
  }),
  harvestDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL for the product image.",
  }),
})