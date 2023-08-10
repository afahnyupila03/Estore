import { useRef } from 'react';

const useInput = validateValue => {

    const valueRef = useRef();

    const enteredValue = valueRef.current.value;

    const valueIsValid = validateValue(valueRef);

    return {
        value: valueRef,
        enteredValue,
        valueIsValid,
    }

};

export default useInput;