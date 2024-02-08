import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
    try {

        const user = await db.user.findUnique({ where: { email } })
        return user

    } catch {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } })
        return user

    } catch {
        return null
    }
}
export const getAllUsers = async ()=> {
    try {
        const users = await db.user.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                emailVerified:true,
                role:true
            }
        })
        return users
    } catch  {
        return null
    }
}