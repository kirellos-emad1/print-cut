"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationOtp } from "@/lib/otps";
import { getUserByEmail } from "@/data-access/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email)
  if(!existingUser || !existingUser.email|| !existingUser.password){
    return {error: "Email doesn't exist"}
  }

  if(!existingUser.emailVerified){
    const verificationOtp = await generateVerificationOtp(existingUser.email)
    const {verificationOtp:verificationData, otp} = verificationOtp
    const hashOtp = verificationData.otp
    await sendVerificationEmail(
      verificationData.email,
      otp,
      hashOtp
    )
    
    return {success:" Confirmation OTP sent"}
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credential" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
