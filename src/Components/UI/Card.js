import { useDispatch } from 'react-redux';
import ProductForm from '../Products/ProductItem/Product Form/ProductForm';
import { cartAction } from '../../Store/cart-slice';

const Card = props => {

    const dispatch = useDispatch();

    const { name, price, image, id } = props;

    const addItemToCartHandler = amount => {
        dispatch(
            cartAction.addItemToCart({
                id,
                image,
                name,
                price,
                amount
            })
        )
    }

    return <div className="
        font-bold cursor-pointer
        rounded-xl overflow-hidden
        justify-self-center
    ">
        <div className="flex justify-center">
            <img src={image} alt='' className="overflow-hidden" />
        </div>
        <div className="font-bold flex justify-center mt-4 tracking-wide text-xl">
            <span className="text-2l text-red-500">{name}</span>
        </div>
        <div className="flex justify-between tracking-wide mt-3">
            <span className="text-red-500 text-5l font-bold">
                {price}
            </span>
            <ProductForm onAddToCart={addItemToCartHandler} />
        </div>
        
    </div>

};

export default Card;