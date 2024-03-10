const formatPrice = (price: number) => {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
};

export default formatPrice;
