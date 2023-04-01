import React from 'react';

const CartContext = React.createContext({
    products: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

export default CartContext;