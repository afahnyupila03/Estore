import React from 'react';

const CartContext = React.createContext({
    products: [],
    purchase: [],
    wishList: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

export default CartContext;