import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import { ProductDetails } from "@/components/Product";
import Link from "next/link";
import { getProducts } from "@/services/products";
import { Main } from "@/components/Main";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { apolloClient } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import pThrottle from "p-throttle";

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  interface GetProductsSlugs {
    products: {
      slug: string;
    }[];
  }

  const { data } = await apolloClient.query<GetProductsSlugs>({
    query: gql`
      query getProductsSlugs {
        products {
          slug
        }
      }
    `,
  });

  const paths = data.products.map((product: any) => {
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
    const GET_PRODUCT = gql`
      query getProduct($slug: String!) {
        product(where: { slug: $slug }) {
          id
          slug
          name
          price
          description
          images {
            id
            url
          }
        }
      }
    `;

    const { data } = await apolloClient.query<any>({
      variables: { slug: params.productId },
      query: GET_PRODUCT,
    });

    return data;
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
      data,
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
          title: data.title,
          slug: data.slug,
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
