const jwt = require("jsonwebtoken");
const { blackList } = require("../blacklist/blacklisUser");
const { UserModel } = require("../model/userSchame");


const middleware = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
      if(token){
        if(blackList.includes(token)){
            res.json({msg:"Please login first"})
        }
          jwt.verify(token, 'masai', async function(err, decoded) {
              if(err){
                  res.json({msg:err});
              }
              else{
                  console.log(decoded) ;
                 next();
              }
            });
      }
      else{
          res.json({msg:"You are not authorized"})  
      }
    } catch (error) {
       res.json({msg:error})
    }
}
module.exports = {
    middleware
}