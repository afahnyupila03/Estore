import React from 'react';
import Icon from 'react-icons-kit';

const IconName = ({size, color, icon, style}) => {
    return (
        <Icon 
            icon={icon}
            style={style}
            color={color}
            size={size}
        />
    );
}

export default IconName;