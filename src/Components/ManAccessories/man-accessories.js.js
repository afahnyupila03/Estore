import React from "react";
import { Link } from 'react-router-dom'

const MenAccessories = ({ menData }) => {
  const { name, price } = menData || [];
  return (
    <React.StrictMode>
      <div>
        <p>{name}</p>
        <p>{price}</p>
        <Link to={`/product-details/${name}`}>View product</Link>
      </div>
    </React.StrictMode>
  );
};

export default MenAccessories;
