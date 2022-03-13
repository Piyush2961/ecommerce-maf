const cloudinary = require('cloudinary').v2;
const User = require('./../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

cloudinary.config({ 
  cloud_name: 'piyush-cloud-storage', 
  api_key: '184275488619829', 
  api_secret: '6dfz1LtbvzaZLdEwP242BeHhLyM' 
});


exports.uploadCloud = async (req, res) =>{

    try {
      const file = req.files.photo
      const result = await cloudinary.uploader.upload(file.tempFilePath, (err, result) =>{});
      res.status(200).json({
        status: "success",
        url: result.url
      })
     }
   catch(err)
   {
        res.status(404).json({
          status: "fail",
          message: err.message
      })
   }
 
  }

const signToken = (id) =>{
     return jwt.sign( {id} , process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN} )
}

exports.signup = async (req, res) => {

    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            role: 'user'
        })

        const token = signToken(newUser._id)
       
        res.status(201).json({
            status: "success",
            token,
            data: {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    _id: newUser._id,
                    role: newUser.role
                }
            }
        })
    }
    catch(err)
    {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
    
}

exports.login = async (req,res) =>{

   try{

       const { email , password }= req.body
        // if email and password exist
       if(!email || !password){
           throw new Error ('Please proviode email and password')
       }
  
       // if user exists and password is correct
       const user = await User.findOne({email})
       
       const correct = await bcrypt.compare(password , user.password)

       if(!user || !correct)
       {
        throw new Error ('Incorrect email or password')
       }

       const token = signToken(user._id)
       res.status(200).json({
           status: 'success',
           token,
           role: user.role
       });
   }
   catch(err)
   {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
   }

}

exports.upload = async (req, res) =>{
    
     try {
        //   console.log(req.file);
          res.status(400).json({
              message: "success",
              link: req.file.path
          });
     }
     catch(err)
     {
        res.status(404).json({
            message: "fail",
            message: err.message
        })
     }
}

// admin CRUD operations for users

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          user
        }
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };
  

  exports.removeUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
        status: "success",
        data: {
          user
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      res.status(200).json({
        status: "success",
        data: {
            updatedUser,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };
  