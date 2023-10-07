import { useState, useCallback } from "react";


const useHttp = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const requestHandler = useCallback(

        async (request, applyData) => {

            setIsLoading(false);
            setError(null);

        try {
            const response = await fetch(request.url, {
                method: request.method ? request.method : 'GET',
                headers: request.headers ? request.headers : {},
                body: request.body ? JSON.stringify(request.body) : null,
            });

            if (!response.ok) {
                throw new Error('request failed');
            }

            const data = await response.json();
            applyData(data);
            
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Something went wrong');
        }

    }, []);

    return {
        requestHandler,
        error,
        isLoading,
    }

};

export default useHttp;