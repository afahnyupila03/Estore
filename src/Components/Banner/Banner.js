import watch from './watch.png.webp';

const Banner = () => {

    return (
        <div className=' bg-red-50 mb-2'>
            <div className='container flex justify-center items-center mx-auto grid lg:grid-cols-2 gap-80'>
                {/* Banner Text */}
                <div className="justify-center">
                    <span className="font-bold text-xl mb-10 uppercase text-red-500">
                        select your new perfect style
                    </span>
                    <br />
                    <span className='uppercase mb-7 text-red-500'>
                        enjoy up to 20% off select pre-owned with code 
                        <span className='font-bold'> MARCH4103'</span>
                    </span>
                    <div className='flex justify-center mt-4'>
                        <button className='
                        text-red-500
                        animate-bounce
                        rounded-full border-4 border-red-500 
                        hover:bg-red-500 hover:text-white 
                        cursor-pointer uppercase font-bold 
                        transition:ease-out duration-300 
                        tracking-widest p-2'
                        >
                            shop now
                        </button>
                    </div>
                </div>
                {/* Banner Image */}
                <div className='hidden lg:block'>
                    <img src={watch} alt='rolex_watch' />
                </div>
            </div>
        </div>
    );

};

export default Banner;