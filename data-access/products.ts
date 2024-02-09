import { db } from "@/lib/db"
export const getProductById = async (id: string) => {
    try {

        const product = await db.product.findUnique({ where: { id: id } })
        return product

    } catch {
        return null
    }
}

export const getAllProducts = async () => {
    try {
        const product = await db.product.findMany()
        return product
    } catch {
        return null
    }
}