import React from 'react'

export default function ProdDetails () {

    let newData = getProd()

    return <React.Fragment>
        <h3>{newData.name} : {newData.number}</h3>
        <p>Amount: {newData.amount} </p>
        <p>Due date: {newData.due} </p>
    </React.Fragment>
}