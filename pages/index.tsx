import { Main } from "@/components/Main";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query getProductsList {
    products {
      id
      slug
      name
      price
      description
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : JSON.strigify(error)</p>;

  console.log(data, "data");

  return (
    <Main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Main>
  );
}
