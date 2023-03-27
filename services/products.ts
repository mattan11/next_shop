import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getProducts = async () => {
  const res = await fetch("https://naszsklep-api.vercel.app/api/products");
  const data: StoreApiResponse[] = await res.json();
  return data;
};

export const getProduct = async (id: string) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`
  );
  const data: StoreApiResponse | null = await res.json();
  return data;
};
