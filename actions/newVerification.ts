"use server"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data-access/user"
import { getVerificationOtpByOtp } from "@/data-access/verificationOtp"
import { generateVerificationOtp } from "@/lib/otps"
import { sendVerificationEmail } from "@/lib/mail"
import bcryptjs from "bcryptjs"

export const newVerification = async (hashOtp:string, otp:string)=>{
    if (!otp|| otp.length !== 6) {
        return {error:"Please add your OTP to continue"}
    }
    const existingOtp = await getVerificationOtpByOtp(hashOtp);
    if (!existingOtp) {
        return {error: "OTP dose not exist"}
    }
    const hasExpired = new Date( existingOtp.expires) < new Date()
    if(hasExpired){
        return {error: "OTP has expired"}
    }

    const existingUser = await getUserByEmail(existingOtp.email)

    if(!existingUser){
        return {error: "Email dose not exist"}
    }
    const matchOtp = await bcryptjs.compare(otp,hashOtp)
    if (!matchOtp) {
        return {error: "Make sure you typed the correct OTP that you get via Email "}
    }
    await db.user.update({
        where:{id:existingUser.id},
        data:{
            emailVerified: new Date(),
        }
    })
    await db.verificationOtp.delete({
        where:{id:existingOtp.id}
    })

    return {success: "Email Verified "}
}

export const generateAndSendNewOtp = async (hashOtp:string)=>{
    const existingOtp = await getVerificationOtpByOtp(hashOtp);
    if (!existingOtp) {
        return{error:"OTP dose not exist"}
    }
    const existingUser = await getUserByEmail(existingOtp.email)
    if (!existingUser) {
        return {error: "Email doesn't exist"}
    }
    if(!existingUser.emailVerified){
        const verificationOtp = await generateVerificationOtp(existingUser.email!)
        const {verificationOtp:verificationData, otp} = verificationOtp
        const hashOtp = verificationData.otp
        await sendVerificationEmail(
          verificationData.email,
          otp,
          hashOtp
        )
        
        return {success:"New confirmation OTP sent"}
    }

}