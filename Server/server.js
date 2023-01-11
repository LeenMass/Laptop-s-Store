const express = require("express");
const cors = require("cors");
const db = require("./DataBase/connection");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const bcrypt = require("bcrypt")
const server = express();
const cookieParser = require("cookie-parser");
server.use(cookieParser());

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { console.log(`listening http://localhost:${PORT}`) })
const saltRounds = 10;

server.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

server.get("/Products", async (req, res) => {
    try {
        let jsond = await db.query(`SELECT * FROM products`);
        res.json(jsond.rows);

    }
    catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})
server.post("/Products", async (req, res) => {
    try {
        const { name, brand, img, color, price, model } = req.body;
        let json = await db.query(`INSERT INTO products (name, brand, img, color, price, model) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [name, brand, img, color, price, model])
        res.json(json.rows);

    }
    catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }


})
server.post("/users", async (req, res) => {
    try {

        const { username, email, address, password, phonenumber } = req.body;
        bcrypt
            .hash(password, saltRounds)
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        let json = await db.query(`INSERT INTO users (username, email, address, password, phonenumber) 
           VALUES ($1, $2, $3, $4, $5) RETURNING *`, [username.trim(), email, address, hash, phonenumber])
        res.json(json.rows);

    }
    catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }


})



server.get("/Products/:id", async (req, res) => {
    try {

        let result = await db.query(`SELECT * FROM products `);
        let pro = result.rows.find((e) => e.id === parseInt(req.params.id));

        res.json(pro)

    }

    catch (err) {
        res.status(404).send(`${err}`)

    }

})
server.get("/users/:id", async (req, res) => {
    try {

        if (!req.params.id) {
            res.send({
                message: 'Please provide an id'
            })
            return
        }

        let result = await db.query(`SELECT * FROM users WHERE id = $1 `, [req.params.id]);

        res.json(result.rows[0])

    }
    catch (err) {
        res.status(404).send(`${err}`)

    }

})
server.get("/users", async (req, res) => {
    try {
        let jsond = await db.query(`SELECT * FROM users`);
        res.json(jsond.rows);

    }
    catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
})
server.post("/LogIn", async (req, res) => {

    try {

        let username = req.body.username;
        let password = req.body.password;

        let userData = await db.query(`SELECT  * FROM users WHERE username = $1 `, [username.trim()]);///
        let pass = userData.rows.map(e => e.password);
        let usersid = userData.rows.map(e => e.id);
        let userId = usersid[0];
        console.log("test 4:", userId)
        res.cookie("userId", userId, { maxAge: 6000000000000 });

        let users = await db.query(`SELECT  username FROM users WHERE username = $1 `, [username.trim()]);
        let newusers = users.rows.map(e => e.username);
        let comparepass = await bcrypt.compare(password, pass[0]);

        if (newusers.length === 0) {
            res.json({ status: false, message: "something..." });
        }

        else if (comparepass) {
            res.json({ status: true, message: "welcome.." });
        }

        else {
            res.json({ status: false, message: "try again" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send(`not found1`)
    }

});

server.get("/cart", async (req, res) => {
    try {

        let result = await db.query(`SELECT * FROM cart WHERE user_id=$1 and paid=false`, [req.cookies.userId]);
        console.log(req.cookies.userId)
        console.log(result.rows)
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
    }

});




server.post("/addToCart", async (req, res) => {
    console.log(req.body)
    const product = req.body;

    delete product.description
    delete product.brand
    //delete product.img
    console.log("user_id ", req.cookies.userId)

    try {
        //res.send(req.body);
        let result = await db.query(`SELECT * FROM cart where user_id = $1 and paid=false`, [req.cookies.userId]);
        //let productIndex = isUserExist.rows[0].quantity.length();
        if (!result.rows.length) {
            const products = JSON.stringify([product])
            const totalPrice = product.quantity * product.price

            await db.query("INSERT INTO cart (user_id, total_price, products) Values ($1,$2,$3)", [req.cookies.userId, totalPrice, products]);
        }
        else {
            // console.log(product)
            let isProductExist = result.rows[0].products.find((currProduct) => currProduct.id === product.id)
            console.log({ isProductExist })
            if (isProductExist) {
                let newProducts = result.rows[0].products.map((currProduct) => {
                    if (currProduct.id === product.id) {
                        currProduct.quantity += product.quantity
                        return currProduct
                    }
                    return currProduct
                })
                let total_price = 0;
                newProducts.map((product) => total_price += product.price * product.quantity)

                newProducts = JSON.stringify(newProducts)
                await db.query(`update cart set products=$1, total_price=$2   where user_id = $3 and paid=false  `, [newProducts, total_price, req.cookies.userId]);
            }
            else {
                let newProducts = result.rows[0].products.concat(product)
                let total_price = 0;
                newProducts.map((product) => total_price += product.price * product.quantity)

                newProducts = JSON.stringify(newProducts)
                await db.query(`update cart set products=$1, total_price=$2   where user_id = $3 and paid=false  `, [newProducts, total_price, req.cookies.userId]);
            }
        }
    }

    catch (error) {
        console.log(error);
    }

    // const leen = new Error('asdasd')
    // res.status(500).send(leen)

    // res.send({success: false})

});

server.get('/logout', (req, res) => {
    res.clearCookie("userId");
    res.send('success')
});


server.post('/payment', async (req, res) => {

    await db.query(`update cart set paid=true where user_id = $1 and paid=false `, [req.cookies.userId]);
    res.json('mabrook')

})
server.get('/payment', async (req, res) => {
    let data = await db.query(`select * from cart where user_id=$1 and paid=true`, [req.cookies.userId])
    res.json(data.rows)
})
// 1. make the payment form
// 2. on payment submit send a fetch to the server /pay
// 3. pay the card -> paid will become true -> SQL update statement to the cart
// await db.query(`update cart set paid = true  where user_id = $1 and paid=false  `, [req.cookies.userId]);
// payment is done rawe7 3l bet

// Let's say people already paid their cart, now they want to see their order history
// 1. make a page for order history
// 2. on useEffect with ([]) fetch the paid for the user carts
// select * from carts where user_id = x and paid = true
// 3. on click 1 order history show the details or products
// select products from carts where id = cartId