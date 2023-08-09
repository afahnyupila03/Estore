import { NavLink } from 'react-router-dom';

import instagram from './instagram.png';
import twitter from './twitter.png';
import facebook from './facebook.png';


const FooterNavbar = () => {

    const scrollToTop = () => {
        window.scrollTo(0,0);
    }

    return (
        <div className="bg-red-100" style={{ padding: '0.1rem' }}>
            <div className='container mt-20  mb-10 mx-auto px-4'>

                {/* Footer Navbar */}
                <div className='px-4 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
                    
                    {/* Footer Brand */}
                    <div>
                        <NavLink to="/" onClick={scrollToTop} className="font-bold text-4xl cursor-pointer">
                            <span>Time</span>
                            <span className="text-red-500">Zone</span>
                        </NavLink>

                        {/* Footer Media Pages */}
                        <div className="mt-10">
                            <ul className="flex">
                                <li>
                                    <NavLink to="/" onClick={scrollToTop} className=" mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000">
                                        <img src={twitter} alt="twitter_img" className="h-12 mr-4" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/" onClick={scrollToTop} className="mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000">
                                        <img src={facebook} alt="facebook_img" className="h-12 mr-4" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/" onClick={scrollToTop} className="mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000">
                                        <img src={instagram} alt="instagram_img" className="h-12 mr-4" />
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        {/* Header */}
                        <div>
                            <h4 className="text-red-500 mb-10 font-bold text-4xl">
                                Quick Links
                            </h4>
                        </div>
                        {/* Links */}
                        <div>
                            <ul>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/about" onClick={scrollToTop}>About</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/offers-&amp;-discounts" onClick={scrollToTop}>Offers &amp; Discounts</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/get-coupons" onClick={scrollToTop}>Get Coupon</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/contact" onClick={scrollToTop}>Contact Us</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* New Product Links */}
                    <div>
                        {/* Header */}
                        <div>
                            <h4 className="text-red-500 mb-10 font-bold text-4xl">
                                New Products
                            </h4>
                        </div>
                        {/* Links */}
                        <div>
                            <ul>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/woman-cloth" onClick={scrollToTop}>Woman Cloth</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/fashion-accessories" onClick={scrollToTop}>Fashion Accessories</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/man-accessories" onClick={scrollToTop}>Man Accessories</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <NavLink to="/time-zone/rubber-toys" onClick={scrollToTop}>Rubber made Toys</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div>
                        {/* Header */}
                        <div>
                            <h4 className="text-red-500 mb-10 font-bold text-4xl">
                                Support
                            </h4>
                        </div>
                        {/* Links */}
                        <div>
                            <ul>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition ease-in-out  duration-300">
                                    <NavLink to="/time-zone/faq" onClick={scrollToTop}>FAQ</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-300">
                                    <NavLink to="/time-zone/terms-&amp;-conditions" onClick={scrollToTop}>Terms &amp; Conditions</NavLink>
                                </li>
                                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-300">
                                    <NavLink to="/time-zone/privacy-policy" onClick={scrollToTop}>Privacy Policy</NavLink>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer text-2xl hover:text-red-500 transition:ease-in duration-300">
                                    <NavLink to="/time-zone/report-payment-issue" onClick={scrollToTop}>Report a Payment Issue</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='container border-red-500 border-3 mb-5 mx-auto' />
            <div className='container flex justify-center font-bold text-2xl tracking-wildest text-red-500 mx-auto mb-10'>
                All copyrights reserved &copy;{new Date().getFullYear()}
            </div>
        </div>
    );
};

export default FooterNavbar;