import { InferGetStaticPropsType } from "next";
import { ProductListItem } from "@/components/Product";
import { getProducts } from "@/services/products";
import { Main } from "@/components/Main";

export const getStaticProps = async () => {
  const data = await getProducts();

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
    <Main>
      <ul className="grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data.products.map((product) => {
          return (
            <li key={product.id} className="shadow-xl border-2">
              <ProductListItem
                data={{
                  id: product.id,
                  title: product.name,
                  slug: product.slug,
                  thumbnailAlt: product.name,
                  thumbnailUrl: product.images[0].url,
                }}
              />
            </li>
          );
        })}
      </ul>
    </Main>
  );
};

export default ProductsPage;
