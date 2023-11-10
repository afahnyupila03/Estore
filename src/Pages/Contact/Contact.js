import { useState } from 'react';
import PageNotFound from '../../Components/404Page'
import ProductModal from '../../Components/ProductModal';

const Contact = () => {

  const [openModal, setOpenModal] = useState(false)
  function handleOpenModal() {
    setOpenModal((prevState) => !prevState)
  }

  return (
    <>
        <PageNotFound 
          messageHeader='404'
          pageAlert='Page Not Found'
          contactSupport='Contact Support'
          homeRoute='/home'
          homeNavigation='Home'
          messageBody='Coming Soon ㊗️'
        />
        <button className='b-2 p-4 bg-red-300' onClick={handleOpenModal}>Open  Modal</button>
        {
          openModal && <ProductModal 
            name='Pila'
            price='200'
            location='Limbe'
            actionButton='Close Modal'
            onCloseModal={handleOpenModal}
          />
        }
      </>
  );
};

export default Contact;
