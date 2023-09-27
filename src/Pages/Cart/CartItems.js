

export default function ({cartData}) {

    const {name, price} = cartData || []

    return (
        <div>
            <p>{name}</p>
            <p>{price}</p>
        </div>
    )
}