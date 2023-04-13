import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { gql } from "@apollo/client";
import { apolloClient } from "@/graphql/apolloClient";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  longDescription: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  category: string;
  images: {
    id: string;
    url: string;
  }[];
  rating: {
    rate: number;
    count: number;
  };
}

interface StoreApiResponse {
  products: Product[];
}

interface GetProductsSlugs {
  products: {
    slug: string;
  }[];
}

const GET_PRODUCTS = gql`
  query getProductsList {
    products {
      id
      slug
      name
      price
      description
      images(first: 1) {
        id
        url
      }
    }
  }
`;

export const getProducts = async () => {
  const { data } = await apolloClient.query<StoreApiResponse>({
    query: GET_PRODUCTS,
  });

  return data;
};

export const getProduct = async (slug: string) => {
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
    variables: { slug: slug },
    query: GET_PRODUCT,
  });

  return data;
};

export const getProductsPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugs>({
    query: gql`
      query getProductsSlugs {
        products {
          slug
        }
      }
    `,
  });

  return data;
};
