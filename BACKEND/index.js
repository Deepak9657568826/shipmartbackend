const express = require("express");
const { connection } = require("./config/database");
const jwt = require("jsonwebtoken");
const { blackList } = require("./blacklist/blacklisUser");
const {userRouter} = require("./routes/userRoutes");
const userRoutes =  require("./routes/userRoutes");
const { middleware } = require("./middleware/authMiddleware");
const { accessMiddleware } = require("./middleware/accesszUser");

const app = express()
app.use(express.json())
app.use(express.text())
app.use("/try", userRouter)

// acces by buyer and seller
app.get("/product", middleware,  (req, res)=>{
    res.send("product data")
})



// acces by buyer and seller
app.get("/sales",middleware,  (req, res)=>{
    res.send("sales data")
})

// acces by seller
app.patch("/product/:id",middleware,  (req, res)=>{
    res.send("product data updated")
})

// acces by seller
app.delete("/product/:id",middleware, (req, res)=>{
    res.send("product data deleted")
})




app.listen(8080, async () => {
    try {
        await connection;
        console.log("connected to db");
        console.log("Server is conneted to DB");
    } catch (error) {
        console.log(error);
    }
})