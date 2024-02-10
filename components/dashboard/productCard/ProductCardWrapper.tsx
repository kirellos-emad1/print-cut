"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BackButton } from "@/components/dashboard/BackButton";
import { Header } from "@/components/dashboard/Header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const ProductCardWrapper = ({
  children,
  backButtonLabel,
  headerLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader>
        <h1 className="text-3xl text-center font-semibold">{headerLabel}</h1>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
