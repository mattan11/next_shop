import Link from "next/link";

export const Header = () => {
  return (
    <header className="max-w-7xl mx-auto w-full">
      <nav className="px-4 py-2 bg-gray-700 text-white">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
      </nav>
    </header>
  );
};
