import React from 'react'
import UseAnimations from 'react-useanimations'
import PropTypes from 'prop-types'

export default function Loader ({ animation, size, className, fillColor, color }) {
  return (
    <UseAnimations
      animation={animation}
      size={size}
      fillColor={fillColor}
      color={color}
      className={className}
    />
  )
}

Loader.propTypes = {
  animation: PropTypes.object,
  size: PropTypes.number,
  className: PropTypes.string,
  fillColor: PropTypes.string,
  color: PropTypes.string
}
