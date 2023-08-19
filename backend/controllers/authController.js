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

       createJWT(res, driver.email, driver._id, driver.role);
       return res.status(200).json({
        _id: driver._id,
        email: driver.email,
        role: driver.role,
       });
        }).catch(err => {
          res.status(500);
          throw new Error('Internal server error');
        });
      }
   }).catch(err => {
      res.status(500).throw(new Error('Internal server error'));
   });
});

// Logout driver
const logoutDriver = asyncHandler(async (req, res) => {
  try {
    localStorage.removeItem('userInfo');
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}
);

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

    createJWT(res, admin.email, admin._id, admin.role);
    return res.status(200).json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    });
     }).catch(err => {
       res.status(500).json({ erros: err });
       console.log(err);
     });
   }
}).catch(err => {
   res.status(500).throw(new Error('Internal server error'));
});
});

module.exports = {
    signinDriver,
    signinAdmin,
    logoutDriver
};