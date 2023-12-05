"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/app/page";

interface UpdateProductProps {
  product?: Product; // Pass the product data to pre-fill the form
  onClose: () => void; // Function to close the update product overlay
}

export function UpdateProduct({ product, onClose }: UpdateProductProps) {
  const [updatedProduct, setUpdatedProduct] = useState<Product | undefined>(product);
  const queryClient = useQueryClient();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...(prevProduct as Product),
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async ({ id }: Product) => {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedProduct?.title,
          description: updatedProduct?.description,
          price: updatedProduct?.price,
        }),
      });
      if (!res.ok) {
        // Handle the case where the fetch request fails, e.g., throw an error
        throw new Error("Failed to update order");
      }
      return res.json(); // Return the JSON response data
    },
    onSuccess: (data: Product) => {
      queryClient.setQueryData(["product", data.id.toString()], data);
    },
  });

  console.log("mutation", mutation);

  const handleUpdate = () => {
    // Close the update product overlay
    if (updatedProduct !== undefined) {
      mutation.mutate(updatedProduct);
    }
    onClose?.();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form>
        {/* Include form fields with default values from updatedProduct */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedProduct?.title || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={updatedProduct?.description || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={updatedProduct?.price || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 py-2 px-4 rounded transition duration-300 border-2 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
