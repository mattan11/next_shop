import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Product } from "@/components/Product";

const DATA = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto distinctio dolor enim exercitationem harum impedit incidunt ipsum, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto distinctio dolor enim exercitationem harum impedit incidunt ipsum",
  thumbnail: "https://picsum.photos/id/1060/536/354",
  thumbnailAlt: "Barista nalewa kawę",
  rating: 4.5,
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <Product data={DATA} />
      </Main>
      <Footer />
    </div>
  );
}
