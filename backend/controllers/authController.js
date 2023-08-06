const Admin = require('../models/Admin');
const Driver = require('../models/Driver');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createJWT = require("../utils/auth");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Description: Controller for authentification
const signinDriver = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
      let errors = [];
      if (!email) {
        errors.push({ email: "required" });
      }
      if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
      }
      if (!password) {
        errors.push({ passowrd: "required" });
      }
      if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
      }

     Driver.findOne({ email: email })
     .then(driver => {
       if (!driver) {
         return res.status(404).json({
           errors: [{ driver: "not found" }],
         });
       } else {
          bcrypt.compare(password, driver.password).then(isMatch => {
             if (!isMatch) {
              return res.status(400).json({ errors: [{ password: "incorrect" }] });
             }

       let access_token = createJWT(driver.email, driver._id, 3600, driver.role);
       jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
         if (err) {
            res.status(500).json({ erros: err });
         }
         if (decoded) {
             return res.status(200).json({ success: true, token: access_token, message: driver });
           }
         });
        }).catch(err => {
          res.status(500).json({ erros: err });
          console.log(err);
        });
      }
   }).catch(err => {
      res.status(500).json({ erros: err });
   });
});

const signinAdmin = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
   let errors = [];
   if (!email) {
     errors.push({ email: "required" });
   }
   if (!emailRegexp.test(email)) {
     errors.push({ email: "invalid email" });
   }
   if (!password) {
     errors.push({ password: "required" });
   }
   if (errors.length > 0) {
     return res.status(422).json({ errors: errors });
   }

  Admin.findOne({ email: email })
  .then(admin => {
    if (!admin) {
      return res.status(404).json({
        errors: [{ admin: "not found" }],
      });
    } else {
       bcrypt.compare(password, admin.password).then(isMatch => {
          if (!isMatch) {
           return res.status(400).json({ errors: [{ password: "incorrect" }] });
          }

    let access_token = createJWT(admin.email, admin._id, 3600, admin.role);
    jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
         res.status(500).json({ erros: err });
      }
      if (decoded) {
          return res.status(200).json({ success: true, token: access_token, message: admin });
        }
      });
     }).catch(err => {
       res.status(500).json({ erros: err });
       console.log(err);
     });
   }
}).catch(err => {
   res.status(500).json({ erros: err });
});
});

module.exports = {
    signinDriver,
    signinAdmin
};