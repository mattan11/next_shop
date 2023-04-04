import Link from "next/link";
import { useCartState } from "@/components/Cart/CartContext";

export const CartBar = () => {
  const cartState = useCartState();

  const itemsCount = cartState.items?.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  return (
    <Link href="/cart" className="text-white relative block">
      <span
        className="absolute text-gray-700 w-4 h-4 text-xs radius-10 bg-white rounded-full flex items-center justify-center"
        style={{ bottom: "-0.3rem", right: "-0.3rem" }}
      >
        {itemsCount}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </Link>
  );
};
