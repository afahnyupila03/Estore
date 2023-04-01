import { useState, useCallback } from "react";


const useFetch = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const sendRequest = useCallback(

        async (request, applyData) => {

        try {
            const response = await fetch('request.url', {
                method: request.method ? request.method : 'GET',
                body: JSON.stringify(request.body ? request.body : null),
                headers: request.headers ? request.headers : {},
            })
            if (!response.ok) {
                throw new Error('request failed');
            }
            const data = await response.json();
            applyData(data);
            
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
            setIsLoading(false);

    }, []);

    return {
        sendRequest,
        error,
        isLoading
    }

};

export default useFetch;