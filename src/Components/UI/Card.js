import { useContext } from 'react';
import CartContext from '../../Store/cart-context';

const Card = props => {

    const cartCtx = useContext(CartContext);

    const addItemHandler = (item) => {
        cartCtx.addItem({
            key: props.id,
            image: props.image,
            name: props.name,
            amount: item.amount,
            price: props.price
        });
    }


    return <div className="
        font-bold cursor-pointer
        rounded-xl overflow-hidden
        justify-self-center
    ">
        <div className="flex justify-center">
            <img src={props.image} alt='' className="overflow-hidden" />
        </div>
        <div className="font-bold flex justify-center mt-4 tracking-wide text-xl">
            <span className="text-sm">{props.name}</span>
        </div>
        <div className="flex justify-end tracking-wide mt-3">
            <span className="text-red-500 text-sm">
                {props.price}
            </span>
        </div>
        <div className="
            flex justify-center tracking-wide
        ">
            <button
                className="border-2 rounded font-bold bg-red-500 text-white tracking-widest border-red-500 p-4"
                onClick={addItemHandler}
            >Add to Cart</button>
        </div>
    </div>

};

export default Card;