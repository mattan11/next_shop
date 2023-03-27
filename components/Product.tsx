import Link from "next/link";
import { Rating } from "./Rating";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { NextLinkMarkdown } from "@/components/NextLinkMarkdown";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface ProductDetails {
  id: number;
  title: string;
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
  "title" | "thumbnailAlt" | "thumbnailUrl" | "id"
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
          canonical={`https://naszsklep.vercel.app/products/${data.id}`}
          openGraph={{
            url: `https://naszsklep.vercel.app/products/${data.id}`,
            title: data.title,
            description: data.description,
            images: [
              {
                url: data.thumbnailUrl,
                alt: data.thumbnailAlt,
                type: "image/jpeg",
              },
            ],
            siteName: "Sklep testowy",
          }}
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
        <MDXRemote {...data.longDescription} />
      </article>
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
          style={{ objectFit: "contain" }}
        ></Image>
      </div>
      <Link href={`/products/${data.id}/`}>
        <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      </Link>
    </>
  );
};
