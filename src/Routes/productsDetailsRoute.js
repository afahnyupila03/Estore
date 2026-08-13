import ProductDetails from '../Pages/ProductDetails/ProductDetails'
import React from 'react'

export const ProductDetailsRoute = [
  {
    path: 'product-details/:id/:title',
    element: <ProductDetails />
  }
]
