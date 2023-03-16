import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Product } from "@/components/Product";
import { RatingProps } from "@/components/Rating";
import { InferGetStaticPropsType } from "next";

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingProps;
}

export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products/");
  const data: StoreApiResponse[] = await res.json();

  return {
    props: { data },
  };
};

export default function ProductsPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {data.map((product) => (
            <li key={product.id} className="shadow-xl border-2">
              <Product data={product} />
            </li>
          ))}
        </ul>
      </Main>
      <Footer />
    </div>
  );
}
