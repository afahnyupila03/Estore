import { useRef, useState } from 'react';

const useInput = validateValue => {

    const valueRef = useRef();
    const [ isTouched, setIsTouched ] = useState(false);

    const enteredValue = valueRef.current.value;

    const valueIsValid = validateValue(valueRef);
    const postalCodeIsValid = validateValue(valueRef)

    const valueIsInvalid = !valueIsValid && isTouched;
    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        valueRef.current.value = ' ';
        setIsTouched(false);
    }

    return {
        value: valueRef,
        enteredValue,
        valueIsValid,
        valueIsInvalid,
        postalCodeIsValid,
        inputBlurHandler,
        reset,
    }

};

export default useInput;