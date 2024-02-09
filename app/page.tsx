import { CardWrapper } from "@/components/auth/CardWrapper";
import { getAllProducts } from "@/data-access/products";
import Image from "next/image";
export default async function Home() {
  const products = await getAllProducts()
  return (
    <main className="flex gap-x-4 m-5">
      {products?.map((product)=>(
        <CardWrapper
        headerLabel={product.title}
        backButtonLabel="Discover"
        backButtonHref={`/product/?product_id=${product.id}`}
        >
          <div className=" flex flex-col items-center justify-center">
          <Image src={product.images[0]} width={200} height={200} priority alt="product img" />
          <p className="bg-black/30 p-1 rounded-xl w-full text-white text-center">{product.price_by_meter} EGP</p>
          <p>{product.summary}....</p>
          </div>
        </CardWrapper>
      ))}
    </main>
  );
}
