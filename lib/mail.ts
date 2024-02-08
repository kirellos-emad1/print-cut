import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, otp: string, hashOtp: string) => {
    const confirmOtpLink = `http://localhost:3000/auth/new-verification?otp=${hashOtp}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Verify your Email',
        html: `
        <div>
            <h1>Here it is your OTP ${otp}.</h1>
            <p> Click <a href="${confirmOtpLink}">here</a> to verify your email.</p>
        </div>`

    })
}
export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Reset your password',
        html: `
        <div>
            <p> Click <a href="${resetLink}">here</a> to reset password.</p>
        </div>`
    })
}