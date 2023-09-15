import React from "react";

const MenAccessories = ({ menData }) => {
  const { name, price } = menData || [];
  return (
    <React.StrictMode>
      <div>
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </React.StrictMode>
  );
};

export default MenAccessories;
