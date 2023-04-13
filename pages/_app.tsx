import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "@/next-seo.config";
import { CartStateContextProvider } from "@/components/Cart/CartContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/apolloClient";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateContextProvider>
        <Layout>
          <DefaultSeo {...SEO} />
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />{" "}
          </QueryClientProvider>
        </Layout>
      </CartStateContextProvider>
    </ApolloProvider>
  );
}
