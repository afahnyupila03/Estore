import CartProvider from "./Providers/CartProvider";

export default function AppState({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
