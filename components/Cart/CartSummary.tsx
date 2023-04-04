import { useCartState } from "@/components/Cart/CartContext";

const CartSummary = () => {
  const cartState = useCartState();

  const itemsCount = cartState.items?.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  return (
    <div className="col-span-1">
      Podsumowanie koszyka: {itemsCount} produktów
    </div>
  );
};

export default CartSummary;
