import { Fragment, useState, useContext } from "react";
import CheckoutForm from "./CheckoutForm";
import CartContext from '../../Store/cart-context';
import Modal from '../UI/Modal';
import CartCard from "../UI/CartCard";

const Cart = props => {

    const cartCtx = useContext(CartContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const hasItems = cartCtx.products.length > 0;

    // Add and Remove Items from cart Function
    const addItemToCartHandler = item => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    }
    const removeItemFromCartHandler = id => {
        cartCtx.removeItem(id);
    }

    // TotalAmount Function
    const updatedTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    console.log(updatedTotalAmount);

    // Items Counter
    const itemsCounter = cartCtx.products.reduce(
        (acc, item) => {
            return acc + item.amount;
        }, 0
    )

    // Post API function
    const postHandler = async(userData) => {
        setIsSubmitting(true);
        
        await fetch(
            'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/orders.json', 
            {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.products,
            }),
            
        });

        setIsSubmitting(false);
        setIsSubmitted(true);
        cartCtx.clearCart();
    }

    // Displayed Cart Items
    const cartItems = (
        <ul>{
            cartCtx.products.map(item=> (
                <CartCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={addItemToCartHandler.bind(null, item)}
                    onRemove={removeItemFromCartHandler.bind(null, item.id)}
                />
            ))
        }</ul>
    );

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
        

        {isChecked && <CheckoutForm onClose={props.onClose} onPost={postHandler} />}

        {
            !isChecked &&
            <div className="flex justify-end">
                {hasItems && <button onClick={() => {setIsChecked(true)}} className="uppercase tracking-wide bg-red-500 rounded-full p-2 w-20 mr-3 font-bold text-white">Order</button>}
                    {!isChecked && <button onClick={props.onClose} className="uppercase tracking-wide font-bold text-red-500 border-red-500 border-2 transition ease-in-out hover:bg-red-500 hover:text-white rounded-full p-2 w-20" >
                        Close
                    </button>
                    }
            </div>
        }
        
    </Fragment>

    const isSubmittedContent = <Fragment>
        <p>Orders successfully completed...!</p>
        <button 
            onClick={props.onClose} 
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

    const isSubmittingContent = <p>Sending orders items...</p>

    return (
        <Modal className="mx-auto box-border p-20 max">
            { !isSubmitting && !isSubmitted && modalContent }
            { isSubmitted && isSubmittedContent }
            { isSubmitting && isSubmittingContent }
        </Modal>
    );

};

export default Cart