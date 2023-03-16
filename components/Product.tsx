import { Rating, RatingProps } from "@/components/Rating";
import Image from "next/image";
import { StoreApiResponse } from "@/pages/products";

export const Product = ({ data }: { data: StoreApiResponse }) => {
  return (
    <>
      <img src={data.image} alt={data.title} />
      <h2 className="p-4 font-bold text-2xl ">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};
