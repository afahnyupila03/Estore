import { forwardRef } from "react";

// Add forwardRef property and use in CheckoutForm Component.
// As well as in the New and Popular Products Components.

const Input = forwardRef((props, ref) => {

    return <div className="items-center">
        <div className="mb-2">
            <label className="text-xl text-red-500 ml-6" htmlFor={props.input.id}>
                {props.label}:
            </label>
        </div>
        <input
            className="
                bg-gray-200 font-bold text-red-500 rounded text-xl p-2 justify-center
            "
            ref={ref}
            {...props.input}

        />
    </div>
} );

export default Input;