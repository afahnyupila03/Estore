import PageNotFound from '../../Components/404Page'

const Contact = () => {
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
      </>
  );
};

export default Contact;
