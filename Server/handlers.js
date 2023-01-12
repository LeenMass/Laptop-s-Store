const db = require('./DataBase/connection');
const bcrypt = require("bcrypt")
const saltRounds = 10;

const products = async (req, res) => {
    try {
        let jsond = await db.query(`SELECT * FROM products`);
        res.json(jsond.rows);

    }
    catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
}
const productInfo = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await db.query(`SELECT * FROM products where id=$1`, [id]);

        res.json(data.rows[0])

    }

    catch (err) {
        res.status(404).send(`${err}`)

    }
}

const AddToCart = async (req, res) => {
    const product = req.body;

    delete product.description
    delete product.brand

    try {
        const result = await db.query(`SELECT * FROM cart where user_id = $1 and paid=false`, [req.cookies.userId]);
        if (!result.rows.length) {
            const products = JSON.stringify([product])
            const totalPrice = product.quantity * product.price

            await db.query("INSERT INTO cart (user_id, total_price, products) Values ($1,$2,$3)", [req.cookies.userId, totalPrice, products]);
        }
        else {
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
}

const AddingProducts = async (req, res) => {
    try {
        const { name, description, price, img, brand } = req.body;
        const json = await db.query(`INSERT INTO products (name, description, price, img, brand) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, description, price, img, brand])
        res.json(json.rows);

    }
    catch (err) {
        res.status(500).send(`<h3>Failed to insert The Product </h3>`);
    }
}


const SignUp=async(req,res)=>{
  try {

        const { username, email, address, password, phonenumber } = req.body;
        bcrypt
            .hash(password, saltRounds)
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const json = await db.query(`INSERT INTO users (username, email, address, password, phonenumber) 
           VALUES ($1, $2, $3, $4, $5) RETURNING *`, [username.trim(), email, address, hash, phonenumber])
        res.json(json.rows);

    }
    catch (err) {
        res.status(500).send(`<h1>${err}</h1>`);
    }
}

const getCart =async(req,res)=>{
    try {

        const result = await db.query(`SELECT * FROM cart WHERE user_id=$1 and paid=false`, [req.cookies.userId]);
        console.log(req.cookies.userId)
        console.log(result.rows)
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
    }
}


const getUsers=async(req,res)=>{
    try {
        const jsond = await db.query(`SELECT * FROM users`);
        res.json(jsond.rows);

    }
    catch (err) {
        res.status(500).send(`<h3>User Not Found</h3>`);
    }
 

}


const LogIn= async(req,res)=>{
    try {

        let username = req.body.username;
        let password = req.body.password;

        let userData = await db.query(`SELECT  * FROM users WHERE username = $1 `, [username.trim()]);///
        let pass = userData.rows.map(e => e.password);
        let usersid = userData.rows.map(e => e.id);
        let userId = usersid[0];
        console.log("test 4:", userId)
        res.cookie("userId", userId, { maxAge: 6000000000000 });

        const users = await db.query(`SELECT  username FROM users WHERE username = $1 `, [username.trim()]);
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


}

 const getUserById=async(req,res)=>{
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
        res.status(404).send(`user not found`)

    }
 }

const logOut=async(req,res)=>{
        res.clearCookie("userId");
        res.json('log out')

}
    

const UpdatePayidCart=async(req,res)=>{
  try{
     const result=await db.query(`update cart set paid=true where user_id = $1 and paid=false `, [req.cookies.userId]);
    res.json(result.rows)

  }
   catch{
    res.status(404).json("Failed to pay")
   }

}

const getPaidCart=async(req,res)=>{
    try{
         let data = await db.query(`select * from cart where user_id=$1 and paid=true`, [req.cookies.userId])
         res.json(data.rows)
    }
    catch{
      res.status(400).json("paid ccat not found")
    }
}



module.exports = { products, productInfo, AddToCart,AddingProducts ,SignUp,getCart,getUsers,LogIn,getUserById,logOut,UpdatePayidCart,getPaidCart}