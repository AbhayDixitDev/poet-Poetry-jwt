const bcrypt = require('bcrypt')
const PoetMOdel = require("../Models/poetModel")

const register = async(req,res) => {
  const {name,email,password} = req.body


  try {
    const poet = await PoetMOdel.findOne({email})
    if(poet){
      res.json({
        msg:"Poet already exists"
      })
    }
    else{
      const hashedPassword = await bcrypt.hash(password,10)
      const poet = await PoetMOdel.create({
        name,
        email,
        password:hashedPassword
      })
      res.json({
        msg:"Poet created successfully"
      })
    }
    
  } catch (error) {
    console.log(error);
    res.json({
      msg:"Something went wrong"
    })
    
  }
    
}

module.exports = {
  register
}