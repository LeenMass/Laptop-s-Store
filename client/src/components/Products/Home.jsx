import React from "react";
import "./homestyle.css";
import { Link } from "react-router-dom";

const brands = [
  "all",
  "HP",
  "Dell",
  "Apple",
  "Samsung",
  "Microsoft",
  "Acer",
  "Asus",
  "Lenovo",
];
export default function Home() {
  const [list, setList] = React.useState([]);
  const [filprice, setFilprice] = React.useState([300.0, 1999.99]);
  const [brand, setBrand] = React.useState("all");
  const [minp, maxp] = filprice;
  console.log(filprice);
  const Data = async () => {
    try {
      let res = await fetch("http://localhost:4000/Products");
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
  let arr = list
    .filter((b) => brand === "all" || brand === b.brand)
    .filter((x) => x.price >= minp && x.price <= maxp)
    .map((e) => (
      <div className="card" key={e.id}>
        <div key={e.id}>
          <img src={e.img} alt="rel" />
          <h4>{e.name}</h4>
          <p>{e.price}$</p>
          <Link to={`/Products/${e.id}`}>Show More</Link>
        </div>
      </div>
    ));

  return (
    <>
      <h2>Laptop's</h2>
      <div className="page">
        <div className="filters">
          <form>
            <fieldset>
              <legend>Filter Price</legend>
              <label>Min Price </label>
              <input
                type="range"
                name="minPrice"
                value={filprice[0]}
                min="499.99"
                max="1999.99"
                step="100"
                onChange={(e) => setFilprice([e.target.value, filprice[1]])}
              />
              <br />
              <br />
              <label>Max Price</label>
              <input
                type="range"
                name="maxPrice"
                min="499.99"
                max="1999.99"
                step="100"
                value={filprice[1]}
                onChange={(e) => setFilprice([filprice[0], e.target.value])}
              />
            </fieldset>
          </form>

          <fieldset>
            <legend>Brands</legend>
            {brands.map((el) => (
              <label htmlFor={el} key={el}>
                <br />

                {el}
                <input
                  type="radio"
                  name="brands"
                  id={el}
                  value={el}
                  checked={el === brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </label>
            ))}
          </fieldset>
        </div>
        <div className="container">{arr}</div>
      </div>
    </>
  );
}
