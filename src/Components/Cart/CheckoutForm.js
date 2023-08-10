import { useState, useRef } from "react";
// import Input from "../UI/Input";
// import useInput from '../../Hooks/use-input';

const isEmpty = value => value.trim() === " ";
const hasFiveChars = value => value.trim().length === 5;

const CheckoutForm = props => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: false,
        postalCode: true,
        city: true,
        street: true
    });

    const nameRef = useRef();
    const cityRef = useRef();
    const postalCodeRef = useRef();
    const streetAddressRef = useRef();

    const orderConfirmHandler = event => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredCity = cityRef.current.value;
        const enteredPostalCode = postalCodeRef.current.value;
        const enteredStreet = streetAddressRef.current.value;

        const nameIsValid = !isEmpty( enteredName );
        const cityIsValid = !isEmpty( enteredCity );
        const postalCodeIsValid = hasFiveChars( enteredPostalCode );
        const streetIsValid = !isEmpty( enteredStreet );

        setFormInputsValidity({
            name: nameIsValid,
            city: cityIsValid,
            postalCode: postalCodeIsValid,
            street: streetIsValid
        });

        const formIsValid = nameIsValid  && postalCodeIsValid && streetIsValid;
        if(!formIsValid) {
            return;
        }

        // const userData = {
        //     name: enteredName,
        //     city: enteredCity,
        //     postalCode: enteredPostalCode,
        //     street: enteredStreet
        // }

        props.onPost({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            postalCode: enteredPostalCode,
        });

    }

    return <form className="grid gap-10" onSubmit={orderConfirmHandler}>
        <div className='flex items-center'>
            <label className="text-xl tracking-wilder font-bold text-red-500 items-center">Enter Name:</label>
            <div className='grid'>
                <input
                    className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
                    ref={nameRef}
                    type="text"
                />
                { 
                    formInputsValidity.name && <p className='ml-6 text-red-400'>Please enter your name <span>*</span></p>
                }
            </div>
        </div>
        <div className="flex items-center">
            <label className="text-xl tracking-wilder font-bold text-red-500 items-center">City Address:</label>
            <div className='grid'>
                <input
                    className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
                    ref={cityRef}
                    type="text"
                />
                {
                    formInputsValidity.city && <p className='ml-6 text-red-400'>Please enter your city address <span>*</span></p>
                }
            </div>
        </div>
        <div className="flex items-center">
            <label className="text-xl tracking-wilder font-bold text-red-500 items-center">Street Address:</label>
            <div className='grid'>
                <input
                    className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
                    ref={streetAddressRef}
                    type="text"
                />
                {
                    formInputsValidity.street && <p className='ml-6 text-red-400'>Please enter your street address <span>*</span></p>
                }
            </div>
        </div>
        <div className="flex items-center">
            <label className="text-xl tracking-wilder font-bold text-red-500 items-center">Postal Code:</label>
            <div className='grid'>
                <input
                    className="
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full
                font-bold text-red-500'
            "
                    ref={postalCodeRef}
                    type="number"
                />
                {
                    !formInputsValidity.postalCode && <p className='ml-6 text-red-400'>Please enter your postal-code <span>*</span></p>
                }
            </div>
        </div>
        <div className="mt-4">
            <button     
                disabled={!formInputsValidity}
                className="
                bg-red-500 font-bold p-2 
                w-40 mr-3 rounded-full 
                text-white">
                Confirm
            </button>
            <button 
                type="button" 
                className="border-red-500 
                font-bold border-2 text-red-500 
                transition ease-in-out hover:bg-red-500 
                hover:text-white p-2 w-40 rounded-full" onClick={props.onClose}
                >
                    Close
                </button>
        </div>
    </form>

};

export default CheckoutForm;