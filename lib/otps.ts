import { getVerificationOtpByEmail } from "@/data-access/verificationOtp";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs"

export const generateVerificationOtp = async (email: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingOtp = await getVerificationOtpByEmail(email);

    if (existingOtp) {
        await db.verificationOtp.delete({ where: { id: existingOtp.id } })
    }
    const hashOTP = await bcryptjs.hash(otp, 10)
    const verificationOtp = await db.verificationOtp.create({
        data: {
            email,
            otp: hashOTP,
            expires
        }
    })
    return {verificationOtp,otp}
}