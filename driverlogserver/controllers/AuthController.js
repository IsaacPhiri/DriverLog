const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT, } = require("../utils/auth");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const signup = (req, res, next) => {
  let { firstName,
        lastName,
        licenseNumber,
        nationalId,
        contactNumber,
        email,
        homeAddress,
        licenseExpiryDate,
        password,
        password_confirmation
    } = req.body;
    let errors = [];
    if (!firstName) {
      errors.push({ firstName: "required" });
    }
    if (!lastName) {
      errors.push({ lastName: "required" });
    }
    if (!licenseNumber) {
      errors.push({ licenseNumber: "required" });
    }
    if (!nationalId) {
      errors.push({ nationalId: "required" });
    }
    if (!contactNumber) {
      errors.push({ contactNumber: "required" });
    }
    if (!email) {
      errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
      errors.push({ email: "invalid" });
    }
    if (!homeAddress) {
      errors.push({ homeAddress: "required" });
    }
    if (!licenseExpiryDate) {
      errors.push({ licenseExpiryDate: "required" });
    }
    if (!password) {
      errors.push({ password: "required" });
    }
    if (!password_confirmation) {
      errors.push({
        password_confirmation: "required",
      });
    }
    if (password != password_confirmation) {
      errors.push({ password: "passwords don't match" });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

  Driver.findOne({ email: email })
   .then(driver => {
      if (driver) {
         return res.status(422).json({ errors: [{ driver: "email already exists" }] });
      }else {
         const driver = new driver({
            firstName,
            lastName,
            licenseNumber,
            nationalId,
            contactNumber,
            email,
            homeAddress,
            licenseExpiryDate,
            password,
            password_
         });
         bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         driver.password = hash;
         driver.save()
             .then(response => {
                res.status(200).json({ success: true, result: response })
             })
             .catch(err => {
               res.status(500).json({ errors: [{ error: err }] });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}

const signin = (req, res) => {
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

     driver.findOne({ email: email }).then(driver => {
       if (!driver) {
         return res.status(404).json({
           errors: [{ driver: "not found" }],
         });
       } else {
          bcrypt.compare(password, driver.password).then(isMatch => {
             if (!isMatch) {
              return res.status(400).json({ errors: [{ password: "incorrect" }] });
             }

       let access_token = createJWT(driver.email, driver._id, 3600);
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
        });
      }
   }).catch(err => {
      res.status(500).json({ erros: err });
   });
}

// Register a new admin user
const registerAdmin = async (req, res) => {
    // Check if any admin user already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }
    try {
    const { username, password } = req.body;

    // Check if the admin user already exists
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    // Create a new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    // Save the admin user to the database
    await admin.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update admin user
const updateAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password } = req.body;
  
      // Find the admin user by ID
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin user not found' });
      }
  
      // Update the admin user properties
      admin.username = username;
      admin.password = await bcrypt.hash(password, 10);
  
      // Save the updated admin user to the database
      await admin.save();
  
      res.json({ message: 'Admin user updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = { signup, signin, registerAdmin, updateAdmin }