import React from 'react'
import UseAnimations from "react-useanimations"

export default ({animation, size, fillColor, color}) => {
    return (
        <UseAnimations animation={animation} size={size} fillColor={fillColor} color={color} />
    )
}