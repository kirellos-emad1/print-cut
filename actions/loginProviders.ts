"use server"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const loginProvider= async(provider:"google"|"facebook")=>{
    await signIn(provider,{
        redirectTo:DEFAULT_LOGIN_REDIRECT
    })
}