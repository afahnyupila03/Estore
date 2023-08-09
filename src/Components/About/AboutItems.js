

const AboutItems = props => {

    const { image, title, text, button, alt, id } = props.about

    return <div className="cursor-pointer bg-red-50 mt-20 p-4 overflow-hidden rounded" key={id}>
        <div className='flex justify-center mt-4'>
            <img 
                src={image} 
                alt={alt} 
                className='overflow-hidden rounded'
            />
        </div>
        <div className='flex justify-center mt-4 font-bold tracking-widest'>
            <h3 className='mb-4text-2xl'>
                {title}
            </h3>
        </div>
        <div className='flex justify-center mt-4 font-bold tracking-widest'>
            <h3 className='mb-4text-2xl'>
                {text}
            </h3>
        </div>
        <div className='flex justify-center mt-4 mb-4'>
            <button className='
                tracking-widest uppercase font-bold
                border-red-500 border-2ar items-center
                p-2 rounded cursor-pointer text-red-500
                hover:bg-red-500 hover:text-white
                transition:ease-in-out duration-500 
                hover:animate-bounce
            '>
                {button}
            </button>
        </div>
    </div>

}

export default AboutItems;