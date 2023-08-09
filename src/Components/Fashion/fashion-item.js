import React from "react"
import Card from '../../Components/UI/Card'


const FashionItems = props => {

    const { image, name, price, id } = props.fashion

    return <React.Fragment>
        <Card 
            image={image}
            name={name}
            price={price}
            key={id}
        />
    </React.Fragment>

}

export default FashionItems