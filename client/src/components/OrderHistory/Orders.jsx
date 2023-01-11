import React from "react";
import "../OrderHistory/orderstyle.css";
export default function Orders() {
  const [orderDetails, setOrder] = React.useState([]);

  const getOrderHistory = async () => {
    try {
      const paidCart = await fetch("http://localhost:4000/payment", {
        credentials: "include",
      });
      const paidCartjson = await paidCart.json();
      console.log(paidCartjson);
      setOrder(paidCartjson);
    } catch (err) {
      console.error(err.message);
    }
  };
  React.useEffect(() => {
    getOrderHistory();
  }, []);
  return (
    <div>
      {orderDetails.map((order) => (
        <div key={order.id}>
          <div className="orderContainer">
            {order.products.map((e) => (
              <div className="order" key={e.id}>
                <h2>{e.name}</h2>
                <p>{e.price}$</p>
                <p>Quantity : {e.quantity}</p>
                <img src={e.img} alt="" />
              </div>
            ))}{" "}
            <br />
            <div className="priceDiv">
              <div>Total price : </div>
              <div>{order.total_price}$</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
