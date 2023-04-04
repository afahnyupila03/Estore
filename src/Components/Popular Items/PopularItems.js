import React, { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';


const PopularItemsCard = props => {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    

    const fetchData = useCallback(async () => {
        
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(
                'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/popular.json'
            );
            if (!response.ok) {
                throw new Error('Request failed');
            };
            const data = await response.json();
            const loadedItems = [];

            for (const key in data) {
                loadedItems.push({
                    id: key,
                    image: data[key].image,
                    name: data[key].name,
                    price: data[key].price
                });
                setIsLoading(false);
                setItems(loadedItems);
            };

        } catch (err) {
            setError(err.message);
        }

    }, [])

    useEffect(() => {
        fetchData();

    }, [fetchData]);

    const popularCard = items.map(popular => (
        <Card
            key={popular.id}
            image={popular.image}
            name={popular.name}
            price={`$${popular.price.toFixed(2)}`}
        />
    ));

    let content;

    if (error) {
        content = <p>
            {error}
        </p>
    }
    if (isLoading) {
        content = <p>Fetching Products...</p>
    }

    return (
        <div className='container mx-auto px-4' style={{ marginTop: '8rem', marginBottom: '8rem' }}>
            <div className='flex'>
                <h3 className=" border-red-500 border-b-2 text-red-500 font-bold uppercase" style={{ fontSize: '3rem' }}>popular items</h3>
            </div>
            <div className="font-bold text-red-500 flex justify-center" style={{ marginTop: '5rem', marginBottom: '5rem', fontSize: '1.5rem' }}>
                {error && content}
                {isLoading && content}
            </div>
            <div className="grid md:grid-cols-3 gap-10" style={{ marginTop: '5rem' }}>
                {items && popularCard}
            </div>
            <div className="flex justify-center">
                {
                    !error && isLoading && <button
                        className="
                        rounded-full cursor-pointer text-red-500 border-red-500 border-2 p-2 flex items-center uppercase
                        font-bold mt-8 hover:bg-red-500 hover:text-white transition:ease-out duration-200
                        "
                    >view more products</button>
                }
            </div>
        </div>
    );

};

export default PopularItemsCard;