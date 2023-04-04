import { useContext } from 'react';
import CartContext from '../../Store/cart-context';
import CartIcon from './../UI/CartIcon';

const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext);

    const cartCounter = cartCtx.products.reduce(
        (acc, item) => {
            // acc += item.amount || 0
            return acc + item.amount;
        },
        0
    );

    return <button className='bg-red-500 items-center flex p-2 rounded-full' onClick={props.onOpen}>
        <span className="ml-2 mr-3">
            <CartIcon />
        </span>
        <span className="font-bold text-xl mr-3">Cart</span>
        <span className="mr-4 bg-red-400 text-xl text-white p-2 font-bold rounded-full">
            {cartCounter}
        </span>
    </button>

};

export default HeaderCartButton ;