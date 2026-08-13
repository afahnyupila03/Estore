import CartContext from './cart-context'
import cartReducer, {
  defaultState
  // purchaseReducer,
  // purchaseState
  // wishlistReducer,
  // wishlistState
} from './Reducers'
import React, { useReducer } from 'react'
import PropTypes from 'prop-types'

export default function CartProvider ({ children }) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultState)
  // const [wishlist, dispatchWishlist] = useReducer(
  //   wishlistReducer,
  //   wishlistState
  // )
  // const [purchase, dispatchPurchase] = useReducer(
  //   purchaseReducer,
  //   purchaseState
  // )

  const addItemHandler = (item) => {
    dispatchCart({
      type: 'ADD',
      item
    })
  }

  const removeItemHandler = (id) => {
    dispatchCart({
      type: 'REMOVE',
      id
    })
  }

  const clearCartHandler = () => {
    dispatchCart({
      type: 'CLEAR'
    })
  }

  const cartValue = {
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node
}
