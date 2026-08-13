import React from 'react'
import PropTypes from 'prop-types'

export default function Divider ({ style }) {
  return <hr style={style} />
}

Divider.propTypes = {
  style: PropTypes.object
}
