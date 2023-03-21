import { useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const Pagination = () => {
  const [page, setPage] = useState(1);

  const getProducts = async (page: number) => {
    const res = await fetch(
      `https://naszsklep-api.vercel.app/api/products?take=25&offset=${
        (page - 1) * 25
      }`
    );
    return await res.json();
  };

  const { isLoading, isError, data, error }: UseQueryResult = useQuery({
    queryKey: ["todos", { page }],
    queryFn: () => getProducts(page),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // @ts-ignore
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        {/* @ts-ignore */}
        {data.map((product: { title: string; id: string }) => {
          return <p key={product.id}>{product.title}</p>;
        })}
      </div>
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <div className="hidden md:-mt-px md:flex">
          <button
            onClick={() => setPage(1)}
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            1
          </button>
          <button
            onClick={() => setPage(2)}
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            2
          </button>

          <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
            ...
          </span>
          <button
            onClick={() => setPage(8)}
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            8
          </button>
          <button
            onClick={() => setPage(9)}
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            9
          </button>
        </div>
      </nav>
    </>
  );
};
