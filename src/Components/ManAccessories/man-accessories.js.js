import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import useHttp from '../../Hooks/use-fetch';

const MenAccessories = props => {

    const [men, setMen] = useState([]);
    const { error, isLoading, requestHandler: fetchHandler } = useHttp()

    // useEffect function to handle the fetch-api command
    useEffect(() => {
        const fashionManItems = manObj => {
            const loadedItems = [];
            for (const item in manObj) {
                loadedItems.push({
                    id: item,
                    image: manObj[item].image,
                    name: manObj[item].name,
                    price: manObj[item].price
                });
                setMen(loadedItems);
            }
        }
        fetchHandler({
            url: 'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/men.json'
        }, fashionManItems );
    }, [fetchHandler]);

    const arrivalProducts = men.map(menAcc => (
        <Card
            key={menAcc.id}
            image={menAcc.image}
            name={menAcc.name}
            price={menAcc.price}
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
        </React.Fragment>;
    }
    if (isLoading) {
        content = <p>Fetching Products...</p>
    }

    return <React.StrictMode>
        <div className='container mx-auto px-4' style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            
            <div className="font-bold text-red-500 flex justify-center" style={{ marginTop: '5rem', marginBottom: '5rem', fontSize: '1.5rem' }}>
                {error && content}
                {isLoading && content}
            </div>
            <div className='grid grid-cols-4 gap-10'>
                {men && arrivalProducts}
            </div>
        </div>
    </React.StrictMode>

}

export default MenAccessories;