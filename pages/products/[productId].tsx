import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import { ProductDetails } from "@/components/Product";
import Link from "next/link";
import { getProduct, getProducts } from "@/services/products";
import { Main } from "@/components/Main";
import { serialize } from "next-mdx-remote/serialize";
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

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const products: StoreApiResponse[] = await getProducts();

  const paths = products.map((product: StoreApiResponse) => ({
    params: { productId: product.id.toString() },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const data = await getProduct(params.productId);

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: { ...data, longDescription: await serialize(data.longDescription) },
    },
  };
};

const ProductPage = ({ data }: { data: StoreApiResponse }) => {
  if (!data) {
    return <div>Nie znaleziono produktu</div>;
  }

  return (
    <Main>
      <Link href="/products">Wróć na stronę produktów</Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          thumbnailAlt: data.title,
          thumbnailUrl: data.image,
          description: data.description,
          longDescription: data.longDescription,
          rating: data.rating.rate,
        }}
      />
    </Main>
  );
};

export default ProductPage;
