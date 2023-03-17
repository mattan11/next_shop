import { ActiveLink } from "./ActiveLink";

export const Header = () => {
  return (
    <header className="max-w-7xl mx-auto w-full">
      <nav className="px-4 py-2 bg-gray-700 text-white">
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
    </header>
  );
};
