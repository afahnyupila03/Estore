import React from 'react'
import { IonIcon } from '@ionic/react'
import PropTypes from 'prop-types'

export default function Icon ({ size, color, icon, style, actionButton }) {
  return (
    <IonIcon
      icon={icon}
      style={style}
      color={color}
      size={size}
      onClick={actionButton}
    />
  )
}

Icon.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.number,
  actionButton: PropTypes.func
}
