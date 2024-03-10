import Image from "next/image";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "./(components)/ProductCard";
import Link from "next/link";
import PaginationBar from "./(components)/PaginationBar";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPgae = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();
  const totolPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPgae - 1) * pageSize + (currentPgae === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPgae === 1 ? heroItemCount : 0),
  });
  return (
    <div className="flex flex-col items-center">
      {currentPgae === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              height={800}
              width={400}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold"> {products[0].name}</h1>
              <p className="py-6"> {products[0].description}</p>
              <Link
                href={"/products/" + products[0].id}
                className="btn btn-primary"
              >
                Check It Out
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPgae === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totolPages > 1 && (
        <PaginationBar currentPgae={currentPgae} totolPages={totolPages} />
      )}
    </div>
  );
}
