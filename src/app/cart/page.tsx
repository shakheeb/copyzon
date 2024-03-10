import { getCart } from "@/lib/db/carts";
import React from "react";
import CartEntry from "./CartEntry";
import formatPrice from "@/lib/format";
export const metadata = {
  title: "My Cart-Copyzon",
};

const CartPage = async () => {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">My Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry cartItem={cartItem} key={cartItem.id} />
      ))}
      {!cart?.items.length && <p> No produts in Cart</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subTotal || 0)}
        </p>
        <button className="btn btn-secondary sm:w-[200px]">CheckOut</button>
      </div>
    </div>
  );
};

export default CartPage;
