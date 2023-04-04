

const CartCard = props => {

    

    return <>
        <div className="font-bold text-lg mx-auto flex justify-between mt-4">
            <img src={props.image} alt='cart_img' className='w-20' />
            <div className="flex justify-between">
                <span>{props.name}</span>
                <span className="ml-2 text-red-500">{props.amount}</span>
                <span className="ml-2">x</span>
                <span className="ml-2 mr-2 text-red-500">{props.price}</span>
                
            </div>
            <div className="">
                <button onClick={props.onAdd}
                className="
                    rounded border-red-500 border-2 w-10 p-2
                    font-bold bg-red-500 text-white tracking-widest
                    uppercase items-center
                ">+</button>
                <button onClick={props.onRemove}
                className="
                    rounded border-red-500 border-2 w-10 p-2
                    font-bold bg-red-500 text-white tracking-widest
                    uppercase items-center ml-4
                ">-</button>
            </div>
        </div>
    </>
};

export default CartCard;