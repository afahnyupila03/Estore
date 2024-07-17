"use client";
import { Modal } from "flowbite-react";

export function ModalComponent({
  isOpen,
  onClose,
  modalHeader,
  modalBody,
  modalFooter,
  size,
  position,
  className,
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
  );
}
