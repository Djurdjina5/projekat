const mongoose = require("mongoose");
const e = require("express");
const User = mongoose.model("user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import bcrypt from 'bcrypt'

module.exports.login = function (req, res) {
  console.log(req.body);
  console.log("in login");

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isCorrect) => {
        if (isCorrect) {
          //generisanje jwt tokena
          const payload = {
            id: user._id,
            username: user.username,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              console.log("i am in jwt");
              if (err) return res.json({ message: err });
              User.findOneAndUpdate(
                { username: req.body.username, token: token },
                { $set: { isActive: true } },
                function (err, data) {}
              );
              user.isActive = true;
              user.token = "Bearer " + token;
              res.status(200).json(user);
            }
          );
        }
      });
    } else {
      res.status(401).json("Wrong username or password!");
    }
  });
};

module.exports.registration = async function (req, res) {
  console.log("in registration");
  User.findOne({ username: req.body.username }).then(async (user) => {
    if (!user) {
      //ukoliko korisnik sa istim imenom ne postoji
      console.log(req.body);
      var user = new User();
      const hashedPsw = await bcrypt.hash(req.body.password, 12);
      user.username = req.body.username;
      user.fullname = req.body.fullname;
      user.password = hashedPsw;
      user.email = req.body.email;
      user.city = req.body.city;
      user.type = req.body.type;
      user.save();
      res.json({ msg: "User registered succesfully" });
    } else {
      res.status(401).json({ error: "User with that username already exsist" });
    }
  });
};

module.exports.logout = function (req, res) {
  console.log("i am in logout");
  User.findOneAndUpdate(
    { username: req.body.username },
    { $set: { isActive: false } },
    (err, doc) => {
      if (err) {
        res.status(401);
      } else {
        res.status(200);
      }
    }
  );
  res.json({ msg: "User logged out" });
};

module.exports.changepassword = function (req, res) {
  console.log(req.body);
  User.findOneAndUpdate(
    { username: req.body.username, password: req.body.oldPassword },
    { $set: { password: req.body.newPassword } }
  ).then((user) => {
    if (user) {
      user.password = req.body.newPassword;
      res.status(200).json(user);
    } else {
      res.status(404).json("Wrong password");
    }
  });
};

module.exports.deleteAcc = function (req, res) {
  const username = req.body.username;
  User.remove({ username: username }, (err, doc) => {
    if (err) {
      res.status(401);
    } else {
      res.status(200);
    }
  });
  res.json({ msg: "User removed from app" });
};
