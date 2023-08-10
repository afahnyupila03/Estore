import React, { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';


const NewArrivals = (props) => {

    const [arrival, setArrival] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {

        setError(null);
        setIsLoading(true);
        
        try {
            const response = await fetch(
                'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/arrivals.json'
            );
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const data = await response.json();

            const loadedItems = [];
            for (const item in data) {
                loadedItems.push({
                    id: item,
                    image: data[item].image,
                    name: data[item].name,
                    price: data[item].price
                });
                setIsLoading(false);
                setArrival(loadedItems);
            }
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }, []);

    useEffect( () => {
        fetchData();
    }, [fetchData]);

    const arrivalProducts = arrival.map(itemA => (
        <Card
            key={itemA.id}
            image={itemA.image}
            name={itemA.name}
            price={`$${itemA.price.toFixed(2)}`}
        />
    ));

    let content;

    if (error) {
        content = <p>
            {error}
        </p>;
    }
    if (isLoading) {
        content = <p>Fetching Products...</p>
    }

    return (
        <React.StrictMode>
            <div className='container mx-auto px-4' style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                <div className="flex">
                    <h2 className=" border-red-500 border-b-2 text-red-500 font-bold uppercase" style={{ fontSize: '3rem' }}>
                        new arrivals
                    </h2>
                </div>
                <div className="font-bold text-red-500 flex justify-center" style={{ marginTop: '5rem', marginBottom: '5rem', fontSize: '1.5rem' }}>
                    {error && content}
                    {isLoading && content}
                </div>
                <div className="grid lg:grid-cols-3 gap-10">
                    {arrival && arrivalProducts}
                </div>
            </div>
        </React.StrictMode>
    );

};

export default NewArrivals;