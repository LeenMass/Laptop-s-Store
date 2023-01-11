import React from "react";
export default function Payment() {
  const [details, setDetails] = React.useState([]);

  const getDetails = async () => {
    try {
      let cartInfo = await fetch("http://localhost:4000/cart", {
        credentials: "include",
      });
      let cartInfojson = await cartInfo.json();
      console.log(cartInfojson);
      setDetails(cartInfojson);
    } catch (err) {
      console.error(err.message);
    }
  };
  React.useEffect(() => {
    getDetails();
  }, []);

  // key -> 'name'
  const paidCart = async () => {
    try {
      const cartInfo = await fetch("http://localhost:4000/payment", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(details),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      {details.map((cart) => (
        <div key={cart.id}>
          <div>
            {cart.products.map((e) => (
              <div key={e.id}>
                <h2>{e.name}</h2>
                <p>{e.price}$</p>
                <img src={e.img} />
                <p>Quantity : {e.quantity}</p>
              </div>
            ))}
          </div>
          <div>Total price : {cart.total_price}$</div>
        </div>
      ))}

      <input type="submit" value="Pay" onClick={paidCart} />
    </div>
  );
}
