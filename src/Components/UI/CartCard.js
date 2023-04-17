
import { useDispatch } from 'react-redux';
import { cartAction } from '../../Store/cart-slice';

const CartCard = props => {

    const { image, name, quantity, price, id } = props

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(cartAction.addItemToCart({
            name, price, id
        }))
    }

    const removeFromCartHandler = () => {
        dispatch(cartAction.removeItemFromCart(id))
    }

    return <>
        <div className="font-bold text-lg mx-auto flex justify-between mt-4">
            <img src={image} alt='cart_img' className='w-20' />
            <div className="flex justify-between">
                <span>{name}</span>
                <span className="ml-2 text-red-500">{quantity}</span>
                <span className="ml-2">x</span>
                <span className="ml-2 mr-2 text-red-500">{price}</span>
                
            </div>
            <div className="">
                <button onClick={addToCartHandler}
                className="
                    rounded border-red-500 border-2 w-10 p-2
                    font-bold bg-red-500 text-white tracking-widest
                    uppercase items-center
                ">+</button>
                <button onClick={removeFromCartHandler}
                className="
                    rounded border-red-500 border-2 w-10 p-2
                    font-bold bg-red-500 text-white tracking-widest
                    uppercase items-center ml-4
                ">-</button>
            </div>
        </div>
    </>
};

export default CartCard;