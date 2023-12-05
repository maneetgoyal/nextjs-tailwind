"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function Home() {
  const { data } = useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: () => fetch("https://dummyjson.com/products").then((res) => res.json()),
  });

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.products.map((product: Product) => (
            <Link href={`product/${product.id}`} key={product.id}>
              <div className="group relative shadow-md rounded">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.thumbnail}
                    alt={`Front of ${product.title}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full  md:h-60 sm:h-60"
                    width={100}
                    height={400}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#" className="px-2">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 px-2">Rating: {product.rating}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 px-2">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
