import { ReactNode } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/*<Head>*/}
      {/*  <title>Sklep testowy</title>*/}
      {/*  <meta name="description" content="Sklep testowy oparty o Next.js 13" />*/}
      {/*</Head>*/}
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
