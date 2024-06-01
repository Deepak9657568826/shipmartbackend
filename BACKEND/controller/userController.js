const { UserModel } = require("../model/userSchame");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const registerUSer = (req, res) => {
    const { name, email, password , role} = req.body;
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
         if(err){
            res.json({err})
         }
         else{
             const user = new UserModel({
                 name,
                 email,
                 password:hash, 
                 role
             });
             await user.save();
             res.json({ msg: "user register successfull" , user})
         }
        });
    } catch (error) {
        res.json({ msg: error })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await UserModel.findOne({email})
        if(!user){
            res.json({msg:"user not found"})
        }
        else{
            bcrypt.compare(password, user.password, function(err, result) {
              if(err){
                res.json({err});
              }
              else if(result){
                res.json({mag:"login Successfullt", token:jwt.sign({data:"foo" }, 'masai')});
              }
              else{
                res.json({mag:"invalid credetials"});
              }
            });
        }
           
    } catch (error) {
        res.json({ msg: error })
    }
}





const getAlluser= async(req, res)=>{

    try {
        const  user = await UserModel.find({})
        
        res.json({msg:"list of all user", user})
    } catch (error) {
        res.json({error})
    }
}


const updateUser =  async(req, res)=>{
    const payload = req.body;
    const {id} = req.params
    try {
        const  user = await UserModel.findByIdAndUpdate({_id:id}, payload)
        res.json({msg:"user update successfull", user})
    } catch (error) {
        res.json({error})
    }
}

const deleteUser = async(req, res)=>{
    const payload = req.body;
    const {id} = req.params
    try {
        const  user = await UserModel.findByIdAndDelete({_id:id})
        res.json({msg:"user delete successfull"})
    } catch (error) {
        res.json({error})
    }
}
const logoutUser = (req, res)=>{
    const token =  req.headers.authorization;
    blackList.push(token);
    res.json({msg:"user logout succcesfull"})
}

const moviesdata = (req, res)=>{
    res.json({msg:"This is movies data"})
}

const seriesdata =  (req, res)=>{
    res.json({msg:"This is series data"})
}

module.exports = {
    registerUSer, 
    deleteUser, 
    updateUser, 
    getAlluser, 
    loginUser, 
    logoutUser, 
    moviesdata, 
    seriesdata
}
