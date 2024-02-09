
import { CreateProductForm } from "@/components/dashboard/CreateProductForm";

import { SessionProvider } from "next-auth/react";
const CreateProduct = () => {
  return (
    <SessionProvider>
      <div className="flex items-center justify-center">

      <CreateProductForm />
      </div>
    </SessionProvider>
  );
};

export default CreateProduct;
