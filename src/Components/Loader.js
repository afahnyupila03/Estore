import React from "react";
import UseAnimations from "react-useanimations";

export default ({ animation, size, className, fillColor, color }) => {
  return (
    <UseAnimations
      animation={animation}
      size={size}
      fillColor={fillColor}
      color={color}
      className={className}
    />
  );
};
