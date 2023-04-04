import CartContext from './cart-context';
import cartReducer, { defaultState } from './Reducers';
import { useReducer } from 'react';

const CartProvider = props => {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultState);

    const addItemHandler = item => {
        dispatchCart({
            type: 'ADD',
            item: item,
        })
    }

    const removeItemHandler = id => {
        dispatchCart({
            type: 'REMOVE',
            id: id,
        })
    }

    const clearCartHandler = () => {
        dispatchCart({
            type: 'CLEAR'
        });
    }

    const cartValue = {
        products: cartState.products,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartValue}>
        {props.children}
    </CartContext.Provider>

};

export default CartProvider;