import { useContext } from "react";
import AuthProvider from "./Providers/AuthProvider";
import CartProvider from "./Providers/CartProvider";
import { AuthContext } from "./Context/AuthContext";
import { CartContext } from "./Context/CartContext";
import { WishListContext } from "./Context/WishListContext";
import WishListProvider from "./Providers/WishListProvider";

export default function AppState({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishListProvider>{children}</WishListProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
export const useWishList = () => useContext(WishListContext);
