import React from 'react'
import { IonIcon } from '@ionic/react'
import PropTypes from 'prop-types'

export default function ActionButton ({ actionButton, icon, style }) {
  return <IonIcon icon={icon} style={style} onClick={actionButton} />
}

ActionButton.propTypes = {
  actionButton: PropTypes.func,
  icon: PropTypes.string,
  style: PropTypes.object
}
