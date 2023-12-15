import finePens from './new-fine-pens-copy.jpg';

import { Link } from 'react-router-dom'

const FinePens = () => {
    return (
        <div className='container mx-auto px-4'>
            <div className="flex justify-center">
                <img src={finePens} alt='fine_pens' />
            </div>
            <div className="flex justify-center">
                <Link to="/time-zone/shop"
                    className="
                    rounded-full cursor-pointer 
                    text-red-500 border-red-500 
                    border-2 p-2 flex items-center 
                    uppercase font-bold mt-8 
                    hover:bg-red-500 hover:text-white 
                    transition:ease-out duration-1000
                    tracking-widest
                    "
                    onClick={
                        () => { window.scrollTo(0, 0) }
                    }>
                    shop corporate gifts
                </Link>
            </div>
        </div>
    )
};

export default FinePens;