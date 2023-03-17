import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import { ProductDetails } from "@/components/Product";
import Link from "next/link";

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: StoreApiResponse[] = await res.json();

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
  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  return {
    props: {
      data,
    },
  };
};

const ProductPage = ({ data }: { data: StoreApiResponse }) => {
  if (!data) {
    return <div>Nie znaleziono produktu</div>;
  }

  return (
    <div>
      <Link href="/products">Wróć na stronę produktów</Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          thumbnailAlt: data.title,
          thumbnailUrl: data.image,
          description: data.description,
          rating: data.rating.rate,
        }}
      />
    </div>
  );
};

export default ProductPage;
