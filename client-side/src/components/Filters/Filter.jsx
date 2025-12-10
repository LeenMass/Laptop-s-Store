import React from "react";
export default function Filter({ filter, setFilter }) {
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
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(9000);
  const [brand, setbrand] = React.useState("all");
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };
  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };
  const handleTypeChange = (event) => {
    setbrand(event.target.value);
  };
  React.useEffect(() => {
    setFilter({
      minPrice,
      maxPrice,
      brand,
    });
  }, [minPrice, maxPrice, brand, setFilter]);
  return (
    <div className="filters">
      <form>
        <fieldset>
          <legend>Filter Price</legend>
          <label>Min Price </label>
          <input
            type="range"
            name="minPrice"
            value={minPrice}
            min="0"
            max="9000"
            step="100"
            onChange={handleMinPriceChange}
          />
          <br />
          <br />
          <label>Max Price</label>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="9000"
            step="100"
            value={maxPrice}
            onChange={handleMaxPriceChange}
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
              onChange={handleTypeChange}
            />
          </label>
        ))}
      </fieldset>
    </div>
  );
}
