import instagram from './instagram.png';
import twitter from './twitter.png';
import facebook from './facebook.png';


const FooterNavbar = () => {
    return (
        <div className="bg-red-100 p-2">
            <div className='container mt-40 mb-40 mx-auto px-4'>

                {/* Footer Navbar */}
                <div className='px-4 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
                    {/* Footer Brand */}
                    <div>
                        <a href="/#" className="font-bold text-xl cursor-pointer">
                            <span>Time</span>
                            <span className="text-red-500">Zone</span>
                        </a>

                        {/* Footer Media Pages */}
                        <div className="mt-10">
                            <ul className="flex">
                                <li>
                                    <a href="/#" className=" mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000">
                                        <img src={twitter} alt="twitter_img" className="h-8 mr-4" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/#" className="mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000">
                                        <img src={facebook} alt="facebook_img" className="h-8 mr-4" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/#" className="mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000">
                                        <img src={instagram} alt="instagram_img" className="h-8 mr-4" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        {/* Header */}
                        <div>
                            <h4 className="text-red-500 mb-10 font-bold text-xl">
                                Quick Links
                            </h4>
                        </div>
                        {/* Links */}
                        <div>
                            <ul>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">About</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">Offers &amp; Discounts</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">Get Coupon</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* New Product Links */}
                    <div>
                        {/* Header */}
                        <div>
                            <h4 className="text-red-500 mb-10 font-bold text-xl">
                                New Products
                            </h4>
                        </div>
                        {/* Links */}
                        <div>
                            <ul>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">Woman Cloth</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">Fashion Accessories</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">Man Accessories</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                                    <a href="/#">Rubber made Toys</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Support Links */}
                    <div>
                        {/* Header */}
                        <div>
                            <h4 className="text-red-500 mb-10 font-bold text-xl">
                                Support
                            </h4>
                        </div>
                        {/* Links */}
                        <div>
                            <ul>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition ease-in-out  duration-300">
                                    <a href="/#">Frequently Asked Questions</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-300">
                                    <a href="/#">Terms &amp; Conditions</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-300">
                                    <a href="/#">Privacy Policy</a>
                                </li>
                                <li className="mb-4 font-bold cursor-pointer hover:text-red-500 transition:ease-in duration-300">
                                    <a href="/#">Report a Payment Issue</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterNavbar;