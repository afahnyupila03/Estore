import Modal from "../../Components/UI/Modal";

const Login = () => {

    const path = window.location.pathname

  return (
    <div style={{ backgroundImage: path === "/login" || path === "/signup" ?  'url("./auth-bgImage.jpeg")' : null }}>
        <Modal>
      <h1>login page</h1>
    </Modal>
    </div>
  );
};

export default Login;
