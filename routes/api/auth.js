const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Item Model
const User = require("../../models/User");

//@route GET api/auth - authentication of a  user
router.post("/", (req, res) => {
  const { email, password } = req.body;
  //simple validation
  if (!email || !password)
    return res.status(400).json({ message: "wrong data" });

  //Check if user exists
  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(400).json({ message: "User does not exist" });

    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "invalid credentials" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

module.exports = router;
