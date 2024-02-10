import { ProductCardWrapper } from "@/components/dashboard/productCard/ProductCardWrapper";
import { getAllProducts } from "@/data-access/products";
import Image from "next/image";
export default async function Home() {
  const products = await getAllProducts();
  return (
    <main className="w-full h-full gap-x-4 ">
      <div className="flex flex-wrap m-[29px] gap-5">
        {products?.map((product) => (
          <ProductCardWrapper
            headerLabel={product.title}
            backButtonLabel="Discover"
            backButtonHref={`/product/?product_id=${product.id}`}
            key={product.id}
          >
            <div className="flex flex-wrap flex-col items-center justify-center">
              <Image
                src={product.images[0]}
                width={200}
                height={200}
                priority
                alt="product img"
              />
              <p className="bg-black/30 p-1 rounded-xl w-[100px] text-white text-center">
                {product.price_by_meter} EGP
              </p>
              <p>{product.summary}....</p>
            </div>
          </ProductCardWrapper>
        ))}
      </div>
    </main>
  );
}
