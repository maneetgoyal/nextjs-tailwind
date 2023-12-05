"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import type { Product } from "@/app/page";
import type { MouseEventHandler } from "react";
import { UpdateProduct } from "@/components/UpdateProduct";

export default function SingleProduct({ params }: { params: { id: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery<Product>({
    queryKey: ["product", params.id],
    queryFn: () => fetch(`https://dummyjson.com/products/${params.id}`).then((res) => res.json()),
  });

  const handleUpdate: MouseEventHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto max-w-4xl my-8 p-4 shadow-lg bg-white rounded-lg relative">
        <div className="flex flex-col lg:flex-row ">
          <div className="lg:w-1/2 mb-4 lg:mb-0">
            <Image
              src={data?.thumbnail ?? ""}
              width={400}
              height={600}
              alt={data?.title ?? "product image"}
              className="rounded-lg"
            />
          </div>

          <div className="lg:w-1/2 lg:ml-4">
            <h2 className="text-3xl font-semibold mb-2">{data?.title}</h2>
            <p className="text-gray-600 mb-4">{data?.description}</p>
            <p className="text-xl font-bold text-indigo-700 mb-2">${data?.price}</p>
            <p className="text-gray-600 mb-4">Rating: {data?.rating}</p>
            <button className="bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300">
              Add to Cart
            </button>
            <button
              className="py-2 px-4 rounded transition duration-300 border-2 ml-2 hover:bg-gray-50 "
              onClick={handleUpdate}
            >
              Update product
            </button>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 shadow-lg rounded-md w-4/6">
            <UpdateProduct product={data} onClose={handleClose} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
