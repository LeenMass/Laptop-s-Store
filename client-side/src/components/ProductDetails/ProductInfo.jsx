import React from "react";
import { useParams } from "react-router-dom";
import "./productinfostyle.css";
export default function ProductInfo() {
  const [list, setList] = React.useState({});
  let id = useParams();

  const getProduct = async () => {
    try {
      let res = await fetch(`http://localhost:4000/products/${id.id}`);
      console.log(id)
      let resj = await res.json();
      setList(resj);
      console.log(resj)
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getProduct();
  }, []);

  const addToCart = async () => {
    try {
      // console.log(result.name);

      list.quantity = 1;

      let res = await fetch("http://localhost:4000/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(list),
      });

      console.log(res);
    } catch (err) {
      console.log(err);
      //alert("Eshi enfajar"); // <- Mario wrote this
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Product Details</h2>

      <div className="card">
        <img src={list.img} />
        <h3>{list.name}</h3>
        <p>{list.description}</p>
        <p>{list.price} $</p>
        <input
          type="submit"
          className="btn"
          value="add to cart"
          onClick={addToCart}
        />
      </div>
    </div>
  );
}
