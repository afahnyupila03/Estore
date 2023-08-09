import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import useHttp from './../../Hooks/use-fetch';


import { getProd } from './new-data';
import Card from '../UI/Card';


const NewArrivals = (props) => {

    const [arrival, setArrival] = useState([]);

    const { error, isLoading, requestHandler: fetchHandler } = useHttp();

    // useEffect function to handle the fetch-api command.
    useEffect(() => {
        const arrivalItems = arrivalObj => {
            const loadedItems = [];
            for (const arrivalKey in arrivalObj) {
                loadedItems.push({
                    id: arrivalKey,
                    image: arrivalObj[arrivalKey].image,
                    name: arrivalObj[arrivalKey].name,
                    price: arrivalObj[arrivalKey].price
                });
                setArrival(loadedItems);
            }
        };
        fetchHandler(
            {
                url: 'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/arrivals.json'
            }, arrivalItems
        );
    }, [fetchHandler]);

    const arrivalProducts = arrival.map(itemA => (
        <Card
            key={itemA.id}
            image={itemA.image}
            name={itemA.name}
            price={`$${itemA.price.toFixed(2)}`}
        />
    ));

    let content;

    if ( error ) {
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
        </React.Fragment>;
    }
    if ( isLoading ) {
        content = <p>Fetching Products...</p>
    }

    let prod = getProd()

    return (
        <React.StrictMode>
            <div className='container mx-auto px-4' style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                <div className="flex md:justify-start sm:justify-center">
                    <h2 className=" 
                    border-red-500 border-b-2 overflow-hidden
                    text-red-500 font-bold uppercase
                    md:text-3xl sm:text-xl ml-10
                    ">
                        new arrivals
                    </h2>
                </div>
                <div className="font-bold text-red-500 flex justify-center" style={{ marginTop: '5rem', marginBottom: '5rem', fontSize: '1.5rem' }}>
                    {error && content}
                    {isLoading && content}
                </div>
                <div className="grid lg:grid-cols-4 gap-10">
                    {arrival && arrivalProducts}
                    

                    {/* Test */}
                    {
                        prod.map(
                            prods => (
                                <div key={prods.number}>
                                    <p>{prods.name}</p>
                                    <p>{prods.due}</p>
                                    <p>{prods.amount}</p>
                                    <Link 
                                        to={`/time-zone/product-details/${prods.number}`}
                                    >
                                        {prods.number}
                                    </Link>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </React.StrictMode>
    );

};

export default NewArrivals;