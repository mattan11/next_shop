import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <div>Home page</div>
      </Main>
      <Footer />
    </div>
  );
}
