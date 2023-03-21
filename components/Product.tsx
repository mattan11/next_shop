import Link from "next/link";
import { Rating } from "./Rating";
import Image from "next/image";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

type ProductListItem = Pick<
  ProductDetails,
  "title" | "thumbnailAlt" | "thumbnailUrl" | "id"
>;

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className="relative bg-white flex justify-center align-middle w-4/5 h-72 mx-auto my-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          fill={true}
          objectFit={"contain"}
        ></Image>
      </div>

      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <>
      <div className="relative bg-white flex justify-center align-middle w-4/5 h-72 mx-auto my-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          fill={true}
          objectFit={"contain"}
        ></Image>
      </div>
      <Link href={`/products/${data.id}/`}>
        <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      </Link>
    </>
  );
};
