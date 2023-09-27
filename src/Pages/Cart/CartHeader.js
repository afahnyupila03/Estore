import { Fragment } from "react";

export default function ({itemsCounter, amount}) {
  return (
    <Fragment>
      <div>
        <h3>Items:  {itemsCounter}</h3>
        <p>Amount: {amount} XAF</p>
      </div>
    </Fragment>
  );
}
