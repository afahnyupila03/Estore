import React from 'react'
import { useSelector } from 'react-redux';

import Junghan from './../Components/Watches/Junghans.jpg'
import Maurice from './../Components/Watches/Maurice Lacroix.jpg'
import Polar from './../Components/Watches/Polar_Vantage-M2_frontleft_black_HR153.jpg'
import Unisex from './../Components/Watches/Unisex Marathon.jpg'


export default function CartPage() {

    const cartItems = useSelector(
        state => state.cart.products
    )

    const cartCounter = React.useState(0);

    let content;

    const cartContent = <React.Fragment>
        <div className="mx-auto container px-4">
            <div className="grid">
                <div className="cols-span-2">
                    {content}
                </div>
                <div className="cols-span-1">
                    { cartCounter }
                </div>
            </div>
        </div>
    </React.Fragment>

    const emptyCart = content = <p className="flex justify-center">Cart is Empty {cartCounter}</p>

    if ( cartItems.length > 0 ) {
        content = cartContent
    }   else {
        content = emptyCart
    }

    return <React.Fragment>
        <div>
            <div className="mx-auto container px-4">
                { content }
            </div>
            <div className="mx-auto container px-4">
                <h2 className="flex justify-start uppercase p-4 mt-40">
                    you might also like
                </h2>

                <div className="grid grid-cols-3 mt-20">
                    <div>
                        <img src={Polar} alt='polar_vantage_watch' style={{ height: '40.5rem', width: '20rem' }} />
                    </div>
                    <div>
                        <img src={Unisex} alt='unisex_marathon_watch' style={{ height: '40.5rem', width: '20rem' }} />
                    </div>
                    <div className='grid lg:grid-rows-2 gap-2'>
                        <div>
                            <img src={Junghan} alt='junghans_watch' style={{ height: '20rem', width: '20rem' }} />
                        </div>
                        <div>
                            <img src={Maurice} alt='maurice_lacroix' style={{ height: '20rem', width: '20rem' }} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </React.Fragment>
}