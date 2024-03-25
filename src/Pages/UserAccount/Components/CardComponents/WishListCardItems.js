export default function WishListCardItems({
  addToCartHandler,
  removeHandler,
  wishListProducts,
}) {
  const { title, price, discountPercentage, thumbnail } = wishListProducts;

  return (
    <div>
      <p>title</p>
      <button onClick={addToCartHandler}>Add to bag</button>
      <button onClick={removeHandler}></button>
    </div>
  );
}
