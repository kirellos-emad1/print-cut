"use server"

import { db } from "@/lib/db"
export const deleteUser = async(id:string)=>{
    const deletedUser = await db.user.delete({
        where:{id}
    })
    
}