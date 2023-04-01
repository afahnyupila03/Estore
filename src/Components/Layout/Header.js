import HeaderCartButton from "./HeaderCartButton";


const Header = props => {

    return (
        <>
            <div className='fixed bg-black font-bold text-xl p-4' style={{ top: '0', left: '0', width: '100%' }}>
                <div className='flex items-center justify-around'>
                    {/* Navbar Brand */}
                    <div className='navbar-header'>
                        <a href="/#" className="cursor-pointer">
                            <span className='text-white'>Time</span>
                            <span className='text-red-500'>Zone</span>
                        </a>
                    </div>
                    {/* Navbar Links */}
                    <div className="navbar-links hidden lg:block">
                        <ul className='text-white flex' id="navbar-links">
                            <li className='nav-item mr-4'>
                                <a href='//' className='nav-link'>Home</a>
                            </li>
                            <li className='nav-item mr-4'>
                                <a href='//' className='nav-link'>Shop</a>
                            </li>
                            <li className='nav-item mr-4'>
                                <a href='//' className='nav-link'>About</a>
                            </li>
                            <li className='nav-item mr-4'>
                                <a href='//' className='nav-link'>Latest</a>
                            </li>
                            <li className='nav-item mr-4'>
                                <a href='//' className='nav-link'>Blog</a>
                            </li>
                            <li className='nav-item mr-4'>
                                <a href='//' className='nav-link'>Pages</a>
                            </li>
                            <li className='nav-item mr-4'>
                                <a href='//' className='nav-link'>Contact</a>
                            </li>
                        </ul>
                    </div>
                    {/* Menu Text */}
                    {/* <div className='text-white uppercase hidden sm:block' id="menu">
                    <a href="#/">menu</a>
                </div> */}
                    {/* Cart Icon */}
                    <div className='navbar-button hidden lg:block'>
                        <HeaderCartButton onOpen={props.onOpen} id='navbar-links' />
                    </div>
                </div>
            </div>
        </>
    );

}

export default Header;