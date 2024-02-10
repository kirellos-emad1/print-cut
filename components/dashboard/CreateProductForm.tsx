"use client";
import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/components/dashboard/CardWrapper";
import { CreateProduct } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { createProduct } from "@/actions/createProduct";
import { useSession } from "next-auth/react";
import { uploadCloudinary } from "@/lib/uploadCloudinary";

export const CreateProductForm = () => {
  const session = useSession();
  const id = session.data?.user.id!;
  const [images, setImages] = useState<FileList | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const submitImage = async () => {
    let arr: Array<string> = [];
    if (!images) return;
    for (let i = 0; i < images.length; i++) {
      try {
        const data = await uploadCloudinary(images[i]);
        arr.push(data.url);
        return arr;
      } catch (uploadError) {
        console.error("Error uploading an image:", uploadError);
        return arr
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof CreateProduct>) => {
    const arr = await submitImage();
    setError("");
    setSuccess("");
    startTransition(() => {
      createProduct({ ...values, images: arr }, id).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.success) {
          form.reset();
          setImages(null);
        }
      });
    });
  };

  const form = useForm<z.infer<typeof CreateProduct>>({
    resolver: zodResolver(CreateProduct),
    defaultValues: {
      category: "",
      title: "",
      summary: "",
      description: "",
      images: [],
      price_by_meter: "",
      quantity_by_meter: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="Create product"
      backButtonLabel="Back to dashboard"
      backButtonHref="/dashboard"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="MacBook"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="This Product ...."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Laptop"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Product details"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="price_by_meter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price for meter</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="105.99 EGP"
                      disabled={isPending}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="quantity_by_meter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      placeholder="100 Meter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={isPending}
                      placeholder="Select images"
                      multiple={true}
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setImages(e.target.files)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormSuccess message={success} />
          <FormSuccess message={error} />
          <Button type="submit" disabled={isPending} className="w-full">
            Submit Product
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
