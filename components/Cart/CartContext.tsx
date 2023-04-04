import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem {
  readonly id: number;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[] | undefined;
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem["id"]) => void;
}

const CartStateContext = createContext<CartState | null>(null);

const getCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem("nextShopCartItems");

  console.log(cartItems, "cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const setCartItemsToLocalStorage = (cartItems: CartItem[]) => {
  return localStorage.setItem("nextShopCartItems", JSON.stringify(cartItems));
};

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }

    console.log(cartItems, "cartItems");
    setCartItemsToLocalStorage(cartItems);
  }, [cartItems]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevState) => {
      const existingItem = prevState?.find(
        (cartItem) => cartItem.id === item.id
      );

      if (!existingItem && prevState) {
        return [...prevState, item];
      }

      return prevState?.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            count: cartItem.count + 1,
          };
        }

        return cartItem;
      });
    });
  };

  const removeItemFromCart = (id: CartItem["id"]) => {
    setCartItems((prevState) => {
      prevState?.find((cartItem) => {
        if (cartItem.count <= 1) {
          setCartItems(prevState.filter((cartItem) => cartItem.id !== id));
        }
      });

      return prevState?.map((cartItem) => {
        if (cartItem.id === id) {
          return {
            ...cartItem,
            count: cartItem.count - 1,
          };
        }

        return cartItem;
      });
    });
  };

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const context = useContext(CartStateContext);
  if (!context) {
    throw new Error("useCartState must be used within a CartStateContext");
  }
  return context;
};
