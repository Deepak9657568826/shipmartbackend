
const express = require("express")
const { registerUSer,
    loginUser,
    getAlluser,
    updateUser,
    deleteUser,
    logoutUser,
    moviesdata,
    seriesdata } = require("../controller/userController")
    
const { middleware } = require("../middleware/authMiddleware")

const userRouter = express.Router()

// register user
userRouter.post("/register", registerUSer)

// router for login
userRouter.post("/login", loginUser)
// get all user
userRouter.get("/user", getAlluser)
// update user
userRouter.put("/user/:id", updateUser)
// delete user
userRouter.delete("/user/:id", deleteUser)
//logout user
userRouter.get("/logout", logoutUser)


// private route
userRouter.get("/movies", middleware, moviesdata)

userRouter.get("/series", middleware, seriesdata)



module.exports = {
    userRouter
}