import ProductForm from '../Products/ProductItem/Product Form/ProductForm';
import CartContext from './../../Store/cart-context';
import { useContext } from 'react';

const Card = props => {

    const cartCtx = useContext(CartContext);
    const addItemToCartHandler = amount => {
        cartCtx.addItem({
            key: props.id,
            image: props.image,
            name: props.name,
            amount,
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
        <ProductForm onAddToCart={addItemToCartHandler} />
    </div>

};

export default Card;