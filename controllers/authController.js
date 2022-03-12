const multer = require('multer');
const User = require('./../models/userModel');
const jwt = require("jsonwebtoken");
const Item = require('../models/itemModel');
const bcrypt = require('bcryptjs');
const req = require('express/lib/request');
const res = require('express/lib/response');

const multerStorage = multer.diskStorage({
    destination: (req, file , cb)=>{
         cb(null, 'public/img/users')
    },
    filename: (req, file, cb) => {

        const ext=file.mimetype.split('/')[1];
        cb(null, `user-${Date.now()}.${ext}`);
    }
})

const multerFilter = (req, file, cb) => {
    try{

        if (file.mimetype.startsWith('image')) {
          cb(null, true);
        } else {
          cb(new Error('Not an image! Please upload only images.', 400), false);
        }
    }
    catch(err)
    {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

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