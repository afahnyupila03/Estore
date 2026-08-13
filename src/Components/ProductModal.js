'use client'
import React from 'react'
import { Modal } from 'flowbite-react'
import PropTypes from 'prop-types'

export function ModalComponent ({
  isOpen,
  onClose,
  modalHeader,
  modalBody,
  modalFooter,
  size,
  position,
  className
}) {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className={className}
      size={size}
      position={position}
    >
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>{modalFooter}</Modal.Footer>
    </Modal>
  )
}

ModalComponent.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  modalHandler: PropTypes.func,
  modalHeader: PropTypes.element,
  modalBody: PropTypes.element,
  modalFooter: PropTypes.element,
  size: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string
}
