import { useCartState } from "@/components/Cart/CartContext";

const CartSummary = () => {
  const cartState = useCartState();

  return <div className="col-span-1">Podsumowanie koszyka: {} produktów</div>;
};

export default CartSummary;
