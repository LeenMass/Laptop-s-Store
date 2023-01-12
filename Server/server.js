const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();
const cookieParser = require("cookie-parser");
server.use(cookieParser());
const router = require("./router");
const PORT = process.env.PORT || 4000;
server.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(router)
server.listen(PORT, () => { console.log(`listening http://localhost:${PORT}`) })