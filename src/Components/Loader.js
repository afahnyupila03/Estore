import React from 'react'
import UseAnimations from "react-useanimations"

export default ({animation, size, color}) => {
    return (
        <UseAnimations animation={animation} size={size} color={color} />
    )
}