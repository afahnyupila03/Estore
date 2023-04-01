import { forwardRef } from "react";

// Add forwardRef property and use in CheckoutForm Component

const Input = forwardRef((props, ref) => {

    return <div className="p-2">
        <div className="mb-2">
            <label className="text-xl text-red-500" htmlFor={props.input.id}>{props.label}:</label>
        </div>
        <input
            className='
                bg-gray-300 ml-4 
                form-input px-4 
                py-3 rounded-full'
            ref={ref}
            {...props.input}

        />
    </div>
} );

export default Input;