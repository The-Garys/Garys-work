const Users= require('../models/User');
const bcrypt = require('bcrypt');

const userCtrl={
    register: async(req, res)=>{
        try {
            console.log('test request', req.body)
            const {firstName, lastName, userName, email, password, repeatedPassword,phoneNumber }= req.body
            if(!firstName || !lastName || !userName || !email || !password || !repeatedPassword || !phoneNumber){
                return res.status(400).json({msg: "please fill all the fields"});
            }
            if(password.length<8){
                return res.status(400).json({msg: "your password must be at least 8 characters"});
            }
            if(password!==repeatedPassword){
                return res.status(400).json({msg: "make sure to confirm your password correctly"})
            }

            const user = await Users.findOne({email});
            if(user){
                return res.status(400).json({msg:"sorry this email already exists"});
            }
            const hashPassword = await bcrypt.hash(password.toString(),10);
            const newUser =  new Users({firstName,lastName, userName,phoneNumber,email,password:hashPassword});
            await newUser.save();
            console.log('make sure', newUser)
            

            res.status(200).json({msg:"successfully registred"});
        } catch (err) {
            console.log(err)
          res.status(500).json({msg:err.msg});
        }
    }
}

module.exports = userCtrl;