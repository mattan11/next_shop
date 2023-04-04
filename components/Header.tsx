import { ActiveLink } from "./ActiveLink";
import { CartBar } from "@/components/Cart/CartBar";

export const Header = () => {
  return (
    <header className="px-4 py-2 flex items-center justify-between max-w-7xl mx-auto w-full bg-gray-700">
      <nav className="text-white flex items-center gap-4 ">
        <ActiveLink href={"/"}>
          <p>Home</p>
        </ActiveLink>
        <ActiveLink href={"/about/"}>
          <p>About</p>
        </ActiveLink>
        <ActiveLink href={"/products/"}>
          <p>Products</p>
        </ActiveLink>
      </nav>
      <CartBar />
    </header>
  );
};
