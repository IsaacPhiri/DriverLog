const Admin = require('../models/Admin');
const Driver = require('../models/Driver');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createJWT = require("../utils/auth");

const signinDriver = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      throw new Error('Please enter all fields');
  }

  try {
    const driver = await Driver.findOne({ email: email });

    if (!driver) {
        throw new Error('Driver Not Found');
    } else {
      const isMatch = await bcrypt.compare(password, driver.password);

      if (!isMatch) {
          throw new Error('Incorrect Email or Password');
      } else {
        createJWT(res, driver.email, driver._id, driver.role);

        return res.status(200).json({
          _id: driver._id,
          firstName: driver.firstName,
          lastName: driver.lastName,
          licenseNumber: driver.licenseNumber,
          nationalId: driver.nationalId,
          contactNumber: driver.contactNumber,
          email: driver.email,
          homeAddress: driver.homeAddress,
          licenseExpiryDate: driver.licenseExpiryDate,
          role: driver.role,
        });
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// Logout driver
const logout = asyncHandler(async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    })
    res.status(200).json('User Logged out');
  } catch (err) {
    res.status(500);
    throw(new Error('Internal server error'));
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
   res.status(500);
   throw(new Error('Internal server error'));
});
});

module.exports = {
    signinDriver,
    signinAdmin,
    logout
};