import React, { useContext } from 'react'

import { AuthContext } from './Context/AuthContext'
import { CartContext } from './Context/CartContext'
import { WishListContext } from './Context/WishListContext'

import AuthProvider from './Providers/AuthProvider'
import CartProvider from './Providers/CartProvider'
import WishListProvider from './Providers/WishListProvider'
import PropTypes from 'prop-types'

export default function AppState ({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishListProvider>{children}</WishListProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export const useAuth = () => useContext(AuthContext)
export const useCart = () => useContext(CartContext)
export const useWishList = () => useContext(WishListContext)

AppState.propTypes = {
  children: PropTypes.node
}
