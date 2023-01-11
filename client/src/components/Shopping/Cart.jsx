import React from "react";
export default function Cart() {
  const [cartDetails, setDetails] = React.useState([]);

  const getCart = async () => {
    try {
      const cartInfo = await fetch("http://localhost:4000/cart", {
        credentials: "include",
      });
      const cartInfojson = await cartInfo.json();
      console.log(cartInfojson);
      setDetails(cartInfojson);
    } catch (err) {
      console.error(err.message);
    }
  };
  React.useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      {cartDetails.map((cart) => (
        <div key={cart.id}>
          <div>
            {cart.products.map((e) => (
              <div key={e.id}>
                <h2>{e.name}</h2>
                <p>{e.price}$</p>
                <img src={e.img} alt="rel"/>
                <p>Quantity : {e.quantity}</p>
              </div>
            ))}
          </div>
          <div>Total price : {cart.total_price}$</div>
          <a href="/Payment">Payment</a>
        </div>
      ))}
    </div>
  );
}
