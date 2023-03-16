import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <p>About</p>
      </Main>
      <Footer />
    </div>
  );
}
