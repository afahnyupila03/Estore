import { useContext } from 'react';
import CartContext from '../../Store/cart-context';

const CartCard = props => {

    const cartCtx = useContext(CartContext);

    const addItemHandler = (item, amount) => {
        cartCtx.addItem({
            amount,
            image: props.image,
            name: props.name,
            price: props.price,
        });
    }
    const removeItemHandler = (id, amount) => {
        cartCtx.removeItem(id);
    }

    return <>
        <div key={props.id} className="font-bold text-lg mx-auto flex justify-between mt-4">
            <img src={props.image} alt='cart_img' className='w-20' />
            <div className="flex justify-between">
                <span>{props.name}</span>
                {/* <span className="ml-2 text-red-500">{amount}</span> */}
                <span>x</span>
                <span className="ml-2 mr-2">{props.price}</span>
                
            </div>
            <div className="">
                <button onClick={addItemHandler}
                className="
                    rounded border-red-500 border-2 w-10 p-2
                    font-bold bg-red-500 text-white tracking-widest
                    uppercase items-center
                ">+</button>
                <button onClick={removeItemHandler}
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