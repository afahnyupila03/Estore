import Input from "../../../UI/Input";
import { useState, useRef } from 'react';



const ProductForm = props => {

    const amountRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(false);

    const submitFormHandler = event => {
        event.preventDefault();

        const enteredAmount = amountRef.current.value;
        const quantity = +enteredAmount;

        props.onAddToCart(quantity);
        console.log(quantity);

        if (enteredAmount.trim().length === 0 || quantity < 1) {
            setAmountIsValid(false);
            return;
        }

    }

    return <form onSubmit={submitFormHandler}>
        <Input
            ref={amountRef}
            label='Amount'
            input={{
                id: 'amount',
                type: 'number',
                min: 1,
                step: '1',
                defaultValue: 1
            }}
        />
        {amountIsValid && <p>Please at least 1 must be added to cart</p>}
        <button className='
        rounded tracking-wilder font-bold text-white
        text-l bg-red-500 p-2 mt-4
        '>Add to Cart</button>
    </form>

}

export default ProductForm;