import { db } from "@/lib/db";

export const getVerificationOtpByEmail = async (email: string) => {
    try {
        const verificationOtp = await db.verificationOtp.findFirst({
            where: { email }
        })

        return verificationOtp
    } catch {
        return null
    }
}
export const getVerificationOtpByOtp = async (otp: string) => {
    try {
        const verificationOtp = await db.verificationOtp.findUnique({
            where: { otp }
        })

        return verificationOtp
    } catch {
        return null
    }
}