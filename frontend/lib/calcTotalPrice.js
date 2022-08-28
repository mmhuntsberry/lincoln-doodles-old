export default function calcTotalPrice(cart) {
  return cart.reduce((acc, curr) => {
    console.log(curr);
    if (!curr.product) return acc;

    return acc + curr.quantity * curr.product.price;
  }, 0);
}
