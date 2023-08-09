import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import useHttp from './../../Hooks/use-fetch';



const PopularItemsCard = props => {

    const [popularItems, setPopularItems] = useState([]);
    const { error, isLoading, requestHandler: fetchHandler } = useHttp()

    // useEffect function to handle the fetch-api command.
    useEffect(() => {
        const popularProducts = popularObj => {
            const loadedItems = [];
            for (const popularKey in popularObj) {
                loadedItems.push({
                    id: popularKey,
                    image: popularObj[popularKey].image,
                    name: popularObj[popularKey].name,
                    price: popularObj[popularKey].price
                });
                setPopularItems(loadedItems);
            };
        }
        fetchHandler(
            {
                url: 'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/popular.json'
            }, popularProducts
        );

    }, [fetchHandler]);

    const popularCard = popularItems.map(popular => (
        <Card
            key={popular.id}
            image={popular.image}
            name={popular.name}
            price={`$${popular.price.toFixed(2)}`}
        />
    ));

    let content;

    if (error) {
        content = <React.Fragment>
            <div className='grid overflow-hidden'>
                <p className='mb-4'>
                    {error}
                </p>
                <button
                    onClick={fetchHandler}
                    className="
                border-red-500 border-2 rounded-full
                p-2 text-lg font-bold hover:bg-red-500
                hover:text-white transition:ease-in-out
                duration-800
                ">
                    Try again
                </button>
            </div>
        </React.Fragment>
    }
    if (isLoading) {
        content = <p>Fetching Products...</p>
    }

    return (
        <div className='container mx-auto px-4' style={{ marginTop: '8rem', marginBottom: '8rem' }}>
            <div className='flex'>
                <h3 className="
                border-red-500 border-b-2 overflow-hidden
                text-red-500 font-bold uppercase
                md:text-3xl sm:text-xl ml-10
                ">
                    popular items
                </h3>
            </div>
            <div className="font-bold text-red-500 flex justify-center" style={{ marginTop: '5rem', marginBottom: '5rem', fontSize: '1.5rem' }}>
                {error && content}
                {isLoading && content}
            </div>
            <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: '5rem' }}>
                {popularItems && popularCard}
            </div>
            <div className="flex justify-center">
                {
                    !error && !isLoading && <button
                        className="
                        rounded-full cursor-pointer text-red-500 border-red-500 border-2 p-3 flex items-center uppercase
                        font-bold mt-8 hover:bg-red-500 hover:text-white transition:ease-out duration-200 mt-20
                        "
                    >view more products</button>
                }
            </div>
        </div>
    );

};

export default PopularItemsCard;