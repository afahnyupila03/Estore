import { useContext } from "react";
import AuthProvider from "./Providers/AuthProvider";
import CartProvider from "./Providers/CartProvider";
import { AuthContext } from "./Context/AuthContext";

export default function AppState({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

export const useAuth = () => useContext(AuthContext);
