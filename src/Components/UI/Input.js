import { forwardRef } from "react";

// Add forwardRef property and use in CheckoutForm Component.
// As well as in the New and Popular Products Components.

const Input = forwardRef((props, ref) => {

    return <div className="flex p-2 justify-self-center">
        {/* <div className="mb-2 ml-8">
            <label className="" htmlFor={props.input.id}>
                {props.label}:
            </label>
        </div> */}
        <input
            className="
                text-red-500 bg-gray-200 font-bold
                text-2l w-10 p-1 items-center
            "
            ref={ref}
            {...props.input}

        />
    </div>
});

export default Input;