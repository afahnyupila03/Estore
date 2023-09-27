import React from "react";
import { Link } from 'react-router-dom'
import IconName from "../Icon";

const MenAccessories = ({ menData }) => {
  const { name, price } = menData || [];
  return (
    <React.StrictMode>
      <div>
        <p>{name}</p>
        <p>{price}</p>
        <div>
        <Link to={`/product-details/${name}`}>View product</Link>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default MenAccessories;
