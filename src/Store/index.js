import { useContext } from "react";
import AuthProvider from "./Providers/AuthProvider";
import CartProvider from "./Providers/CartProvider";
import { AuthContext } from "./Context/AuthContext";
import { CartContext } from "./Context/CartContext";

export default function AppState({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
