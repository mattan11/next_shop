import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import { ProductDetails } from "@/components/Product";
import Link from "next/link";
import { getProduct, getProducts, getProductsPaths } from "@/services/products";
import { Main } from "@/components/Main";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { apolloClient } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import pThrottle from "p-throttle";

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const data = await getProductsPaths();

  const paths = await data.products.map((product: any) => {
    return {
      params: { productId: product.slug },
    };
  });

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

  const throttle = pThrottle({ limit: 5, interval: 1000 });

  const throttledFetch = throttle(async (...args) => {
    const product = await getProduct(params.productId);

    return product;
  });

  const data = await throttledFetch();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: data.product,
    },
  };
};

const ProductPage = ({ data }: any) => {
  if (!data) {
    return <div>Nie znaleziono produktu</div>;
  }

  return (
    <Main>
      <Link href="/products">Wróć na stronę produktów</Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.name,
          slug: data.slug,
          thumbnailAlt: data.name,
          thumbnailUrl: data.images?.[0].url,
          description: data.description,
          // longDescription: data.longDescription,
          rating: 5,
        }}
      />
    </Main>
  );
};

export default ProductPage;
