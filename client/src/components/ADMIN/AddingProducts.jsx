import React from "react";
export default function AddingProducts() {
  const [form, setForm] = React.useState({
    name: "",
    brand: "",
    img: "",
    color: "",
    price: "",
    model: "",
    category: "",
  });
  // key -> 'name'
  const onChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  async function add() {
    try {
      const body = form;
      console.log(body);
      const res = await fetch("http://localhost:4000/Products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div style={{ marginTop: "40px" }}>
      <form onSubmit={add}>
        <fieldset style={{ width: "30%", margin: "auto" }}>
          <legend>Insert Data</legend>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={onChange("name")}
          />
          <br />
          <br />
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={form.brand}
            onChange={onChange("brand")}
          />
          <br />
          <br />
          <label htmlFor="img">Image:</label>
          <input
            type="text"
            id="img"
            name="img"
            value={form.img}
            onChange={onChange("img")}
          />
          <br />
          <br />
          {/* <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={form.color}
            onChange={onChange("color")}
          />
          <br />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={form.price}
            onChange={onChange("price")}
          />
          <br />
          <br />
          / */}
          <input type="submit" value="submit" />
        </fieldset>
      </form>
    </div>
  );
}
