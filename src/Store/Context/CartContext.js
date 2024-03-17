import React from "react";


export const CartContext = React.createContext({
    products: [],
    totalAmount: 0,
    addProductHandler: (item) => {},
    removeProductHandler: (id) => {},
    clearProductHandler: () => {}
})