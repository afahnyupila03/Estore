import Modal from "../../../Components/UI/Modal";

export default function CartFormModal({ showFormModal }) {
  return (
    <Modal>
      <h1>This is the Modal Form</h1>
      <button onClick={showFormModal}>Cancel</button>
    </Modal>
  );
}
