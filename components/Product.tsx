import Link from "next/link";
import { Rating } from "./Rating";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextLinkMarkdown } from "@/components/NextLinkMarkdown";
import { useCartState } from "@/components/Cart/CartContext";

export interface ProductDetails {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

type ProductListItem = Pick<
  ProductDetails,
  "title" | "thumbnailAlt" | "thumbnailUrl" | "id" | "slug"
>;

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className="relative bg-white flex justify-center align-middle w-4/5 h-72 mx-auto my-4">
        <NextSeo
          title={data.title}
          description={data.description}
          // canonical={`https://naszsklep.vercel.app/products/${data.id}`}
          // openGraph={{
          //   url: `https://naszsklep.vercel.app/products/${data.id}`,
          //   title: data.title,
          //   description: data.description,
          //   images: [
          //     {
          //       url: data.thumbnailUrl,
          //       alt: data.thumbnailAlt,
          //       type: "image/jpeg",
          //     },
          //   ],
          //   siteName: "Sklep testowy",
          // }}
        />
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          fill={true}
          style={{ objectFit: "contain" }}
        ></Image>
      </div>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        {/*<NextLinkMarkdown>{data.longDescription}</NextLinkMarkdown>*/}
      </article>
      <Rating rating={data.rating} />
    </>
  );
};

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();

  const onAddToCartClickHandle = (data: any) => {
    cartState.addItemToCart({
      id: data.id,
      slug: data.slug,
      title: data.title,
      price: data.price,
      count: 1,
    });
  };

  return (
    <>
      <div className="relative bg-white flex justify-center align-middle w-4/5 h-72 mx-auto my-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          fill={true}
          style={{ objectFit: "contain" }}
        ></Image>
      </div>
      <div className="p-4 flex flex-col justify-between h-44">
        <Link href={`/products/${data.slug}/`}>
          <h2 className="px-4 text-3xl font-bold">{data.title}</h2>
        </Link>
        <button
          onClick={() => onAddToCartClickHandle(data)}
          className="w-full inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};
