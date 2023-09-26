import { Link } from "react-router-dom";
import CartIcon from './CartIcon'


export default function () {
    return (
        <Link to='/cart'>
            <CartIcon />
        </Link>
    )
}