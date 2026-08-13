import SinglePurchasePage from '../Pages/UserAccount/SinglePurchasePage'
import React from 'react'

export const InvoiceRoute = [
  { path: 'purchases/:id/:purchaseId', element: <SinglePurchasePage /> }
]
