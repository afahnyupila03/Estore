

import CartIcon from './../UI/CartIcon';
import { useSelector } from 'react-redux';

const HeaderCartButton = props => {

    const cartCounter = useSelector(
        state => state.cart.totalQuantity
    );

    return <button className='bg-red-500 items-center flex p-2 rounded-full' onClick={props.onOpen}>
        <span className="ml-2 mr-3 text-white">
            <CartIcon />
        </span>
        <span className="font-bold text-xl text-white mr-3">Cart</span>
        <span className="mr-4 bg-red-400 text-xl text-white p-2 font-bold rounded-full">
            {cartCounter}
        </span>
    </button>

};

export default HeaderCartButton ;