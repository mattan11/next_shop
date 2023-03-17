import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { InferGetStaticPropsType } from "next";
import { ProductListItem } from "@/components/Product";

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

export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <ul className="grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data.map((product) => {
            return (
              <li key={product.id} className="shadow-xl border-2">
                <ProductListItem
                  data={{
                    id: product.id,
                    title: product.title,
                    thumbnailAlt: product.title,
                    thumbnailUrl: product.image,
                  }}
                />
              </li>
            );
          })}
        </ul>
      </Main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
