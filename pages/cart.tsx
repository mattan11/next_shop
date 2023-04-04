import { Main } from "@/components/Main";
import CartSummary from "@/components/Cart/CartSummary";
import CartContent from "@/components/Cart/CartContent";

const CartPage = () => {
  return (
    <Main>
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CartSummary />
      </div>
    </Main>
  );
};

export default CartPage;
