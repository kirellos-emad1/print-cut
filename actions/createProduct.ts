"use server"
import * as z from "zod";
import { db } from "@/lib/db";
import { CreateProduct } from "@/schemas";
import { getUserById } from "@/data-access/user";
import { uploadCloudinary } from "@/lib/uploadCloudinary";

export const createProduct = async (values: z.infer<typeof CreateProduct>, id: string) => {
    console.log(values, id)
    if (!id) return { error: "Try to login again" }
    const existingUser = await getUserById(id)
    if (!existingUser) return { error: "User not found" }
    if (existingUser.role !== "ADMIN") return { error: "User must ADMIN to create product" }
    const validatedFields = CreateProduct.safeParse(values)
    if (!validatedFields.success) return { error: "Invalid fields" };
    const {images, title, category, summary, price_by_meter, quantity_by_meter, description } = validatedFields.data;
    if(!images) return {error:"no image uploaded"}

    await db.product.create({
        data: {
            images,
            title,
            category,
            price_by_meter: parseFloat(price_by_meter),
            quantity_by_meter: parseFloat(quantity_by_meter),
            description,
            created_by: id,
            summary
        }
    })

    return { success: "Product Created" }

}