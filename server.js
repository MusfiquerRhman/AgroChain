let express = require('express');
let next = require('next');
let dev = process.env.NODE_ENV !== "production";
let app = next({dev});
let handle = app.getRequestHandler()
let bodyParser = require('body-parser');
let path = require("path");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let PORT = process.env.PORT || 3000;

app.prepare().then(() => {
    let server = express();

    server.use(express.static(path.join(__dirname, 'public')));
    server.use(bodyParser.json()); 
    server.use(bodyParser.urlencoded({ extended: true })); 
    server.use(express.json())

    const productRoute = require("./server/products");
    server.use("/api/products", productRoute);

    const userRoute = require("./server/user");
    server.use("/api/user", userRoute);

    server.get("/", (req, res) => {
        app.render(req, res, "/")
    })

    server.get("*", (req, res) => {
        return handle(req, res);
    })

    server.listen(PORT, err => {
        if(err) throw err;
        console.log("server jas started");
    })
})
