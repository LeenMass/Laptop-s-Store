import React from "react";
import "./homestyle.css";
import { Link } from "react-router-dom";
import Filter from "../Filters/Filter";
import { useState } from "react";

export default function Home() {
  const [list, setList] = React.useState([]);
  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 9000,
    brand: "all",
  });

  const Data = async () => {
    try {
      let res = await fetch("http://localhost:4000/products");
      let resj = await res.json();
      console.log(resj);
      setList(resj);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Test1", list);

  React.useEffect(() => {
    Data();
  }, []);
  console.log(list);

  return (
    <>
      <h2>Laptop's</h2>
      <div className="page">
        <div className="filters">
          <Filter filter={filter} setFilter={setFilter} />
        </div>
        <div className="container">
          {list.length > 0 ? (
            list
              .filter(
                (product) =>
                  filter.brand === "all" || filter.brand === product.brand
              )

              .filter((product) => product.price >= filter.minPrice)
              .filter((product) => product.price <= filter.maxPrice)
              .map((e) => (
                <div className="card" key={e.id}>
                  <div key={e.id}>
                    <img src={e.img} alt="rel" />
                    <h4>{e.name}</h4>
                    <p>{e.price}</p>
                    <Link to={`/products/${e.id}`}>Show More</Link>
                  </div>
                </div>
              ))
          ) : (
            <div>no data</div>
          )}
        </div>
      </div>
    </>
  );
}
