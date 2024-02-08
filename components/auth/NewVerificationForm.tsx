"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useState, useRef, useTransition, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  generateAndSendNewOtp,
  newVerification,
} from "@/actions/newVerification";
import { FormSuccess } from "@/components/FormSuccess";
import { FormError } from "@/components/FormError";

export const NewVerificationForm = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const hashOtp = searchParams.get("otp");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hashOtp) {
      setError("Missing OTP");
      return;
    }
    startTransition(() => {
      newVerification(hashOtp, otp)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text/plain");

    // Allow only numeric input from pasted data
    const numericPastedData = pastedData.replace(/\D/g, "");

    // If pasted data is longer than expected, only take the first 6 characters
    const slicedData = numericPastedData.slice(0, 6) as any;

    // Fill in individual input fields with pasted data
    [...slicedData].forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = char;
        setOtp((prevOtp) => prevOtp + char);
      }
    });
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    // Allow only numeric input
    const numericValue = value.replace(/\D/g, "");

    // If the numeric value is empty, remove the last character from otp
    setOtp((prevOtp) =>
      numericValue === "" ? prevOtp.slice(0, -1) : prevOtp + numericValue
    );

    // If the numeric value is empty, focus on the previous input;
    // otherwise, focus on the next input
    if (numericValue === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (index < inputRefs.current.length - 1 && numericValue !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };
  return (
    <CardWrapper
      headerLabel="Confirm your email"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form
        method="POST"
        className="rounded-md flex flex-col items-center "
        onSubmit={onSubmit}
      >
        <div className="relative z-0  flex flex-row items-center justify-center w-full group md:justify-center">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              autoComplete="off"
              autoFocus={index === 0}
              disabled={isPending}
              className={
                index === 2
                  ? "shadow-md block py-2.5 px-0 ml-1 mr-4 w-10 h-15 text-2xl text-center text-sky-700 bg-transparent border-2 rounded-lg border-sky-600 appearance-none focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  : index === 3
                  ? "shadow-md block py-2.5 px-0 ml-4 mr-1 w-10 h-15 text-2xl text-center text-sky-700 bg-transparent border-2 rounded-lg border-sky-600 appearance-none focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  : `shadow-md block py-2.5 px-0 mx-1 w-10 h-15 text-2xl text-center text-sky-700 bg-transparent border-2 rounded-lg border-sky-600 appearance-none focus:outline-none focus:ring-0 focus:border-black-600 peer`
              }
              name={`otp-${index}`}
              value={otp[index] || ""}
              onPaste={handlePaste}
              onChange={(e) => handleChange(index, e)}
              maxLength={1}
              type="text"
              required
              ref={(input) => (inputRefs.current[index] = input)}
            />
          ))}
        </div>
        <Button
          disabled={isPending}
          size="lg"
          className="m-5"
          variant="default"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <FormSuccess message={success} />
      {error && (
        <div className="w-full flex flex-col items-center justify-center">
          <Button
            onClick={() =>
              generateAndSendNewOtp(hashOtp!)
                .then((data) => {
                  setError(data?.error);
                  setSuccess(data?.success);
                })
                .catch(() => {
                  setError("Something went wrong");
                })
            }
            size="sm"
            className="mb-2"
          >
            Get new OTP
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      )}
    </CardWrapper>
  );
};
