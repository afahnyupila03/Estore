import React from 'react'
import PropTypes from 'prop-types'

export default function PurchaseItemsCard ({ purchaseData }) {
  const { title, category, brand } = purchaseData

  return (
    <div>
      <p>title: {title}</p>
      <p>category: {category}</p>
      <p>Brand: {brand}</p>
    </div>
  )
}

PurchaseItemsCard.propTypes = {
  purchaseData: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    brand: PropTypes.string
  })
}
