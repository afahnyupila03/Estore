import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import CheckoutForm from "./CheckoutForm";
import Modal from '../UI/Modal';
import CartCard from "../UI/CartCard";


import { cartAction } from "../../Store/cart-slice";
import { uiAction } from "../../Store/ui-slice";
import useHttp from './../../Hooks/use-fetch';

const Cart = props => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const items = useSelector(
        state => state.cart.products
    )
    const hasItems = items.length > 0;

    // Function
    const dispatch = useDispatch();
    const closeCart = () => {
        dispatch(
            uiAction.toggle()
        )
    }

    // TotalAmount Function
    const updatedTotalAmount = useSelector(
        state => state.cart.totalAmount
    );
    
    // const totalAmount = `$${updatedTotalAmount.toFixed(2)}`
    // TotalAmount Function
    console.log(updatedTotalAmount);
    

    // Items Counter
    const itemsCounter = useSelector(
        state => state.cart.totalQuantity
    )
    const totalAmount = updatedTotalAmount * itemsCounter;
    const amount = +totalAmount;
    console.log(amount);

    const products = useSelector(
        state => state.cart
    )

    // Post API function
    const { requestHandler: postRequest } = useHttp();

    const postHandler = async(userData) => {
        setIsSubmitting(true);
        postRequest({
            url: 'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userData,
                orderedItems: products
            }),
        });
        setIsSubmitting(false);
        setIsSubmitted(true);
        dispatch(
            cartAction.clearCart()
        )
    }

    // Displayed Cart Items
    const cartItems = (
        <ul>{
            items.map(item=> (
                <CartCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                />
            ))
        }</ul>
    );
    // Displayed Cart Items

    const modalContent = <Fragment>

        {/* totalAmount and Items Counter */}
        <div className="flex mx-auto justify-between mb-2">
            {/* TotalAmount */}
            <div id="totalAmount">
                <span className="text-red-500 text-xl font-bold mr-4">Total Amount: </span>
                <span className="font-bold text-red-500 text-xl">{updatedTotalAmount}</span>
            </div>

            {/* TotalCart Items */}
            <div id="cart-items">
                <span className="text-red-500 text-xl font-bold mr-4">Total Items: </span>
                <span className="font-bold text-red-500 text-xl">{itemsCounter}</span>
            </div>
        </div>
        <hr className="border-2 border-red-500" />
        {/* totalAmount and Items Counter */}
        
        {/* Cart Items */}
        <div className="mt-4 mb-4">
            {cartItems}
        </div>
        

        {isChecked && <CheckoutForm onPost={postHandler} />}

        {
            !isChecked &&
            <div className="flex justify-end">
                {hasItems && <button onClick={() => {setIsChecked(true)}} className="uppercase tracking-widest bg-red-500 rounded-full p-2 w-20 mr-3 font-bold text-white">Order</button>}
                    {!isChecked && <button onClick={closeCart} className="uppercase tracking-widest font-bold text-red-500 border-red-500 border-2 transition ease-in-out hover:bg-red-500 hover:text-white rounded-full p-2 w-20" >
                        Close
                    </button>
                    }
            </div>
        }
        
    </Fragment>

    const isSubmittedContent = <Fragment>
        <p className='text-red-500 font-bold text-3xl'>Orders successfully completed...!</p>
        <button 
            onClick={closeCart} 
            className="
                uppercase tracking-wide 
                font-bold text-red-500 
                border-red-500 border-2 
                transition ease-in-out 
                hover:bg-red-500
                hover:text-white mt-4
                rounded-full p-2 w-20
            " 
        >
            Close
        </button>
    </Fragment>

    const isSubmittingContent = <p className='text-red-500 font-bold text-3xl'>Sending orders items...</p>

    return (
        <Modal className="mx-auto box-border p-20 max">
            { !isSubmitting && !isSubmitted && modalContent }
            { isSubmitted && isSubmittedContent }
            { isSubmitting && isSubmittingContent }
        </Modal>
    );

};

export default Cart