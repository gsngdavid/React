import { useCallback, useState } from "react";

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendRequest = useCallback(async (configureRequest, processData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(configureRequest.url, {
                method: configureRequest.method ? configureRequest.method : 'GET',
                body: configureRequest.body ? JSON.stringify(configureRequest.body) : null,
                headers: configureRequest.headers ? configureRequest.headers : {}
            });
            
            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            processData(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);

        }, []);
    return { isLoading, error, sendRequest }
}

export default useFetch;