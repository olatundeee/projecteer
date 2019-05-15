var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = require('../models/users.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// add a new user

router.post('/register', function(req, res) {

  // hash password to hide real password with encryption
  var hashedPassword = bcrypt.hashSync(req.body.user.password, 8);

  // create new user using the users model
  users.create({
    email: req.body.user.email,
    username: req.body.user.username,
    password: hashedPassword,
    role: 'User'
  }, function(err, user){
    // if there is an error return status 500
    if(err) {
      // res.sendStatus(500);
      console.log(err);
  }

  // if user registration is succesful return the user in json format
  res.json(user)
  });
})

// log user in

router.post('/login', function(req, res) {

  // confirm user existence by comparing provided username with usernames in the database

  users.findOne({
    email: req.body.email
  }, function(err, user) {
    console.log(user);
    // if an error is encounter 500 status is returned

    if(err) {
      return res.status(500).send('Server error encountered');
    }

    // if user does not exist 404 status is returned

    if(!user) {
      console.log('User not found');

      return res.status(404).send('User not found');
    }

    // check if password is valid with the available password in the database

    var passwordisValid = bcrypt.compareSync(req.body.password, user.password);

    // if password is not valid 401 status is returned

    if (!passwordisValid) {
      return res.status(401).send({
        auth: false,
        token: null
      })
    }

    // create token and store in token variable

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });

    // if user authentication is successful send auth confirmation, token and user data as response

    res.status(200).send({
      auth: true,
      token: token,
      user: user
    });
  });
})

// log user out

router.get('/logout', function(req, res){
  // send response to falsify authentication and nullify token

  res.status(200).send({ 
    auth: false,
    token: null
  })
})

// // update role of the user with username administrator, new role is `administrator`

router.post('/create-admin', function(req, res) {
  users.updateOne({
    username: 'administrator'
  },{ 
    $set: {
    role: 'Administrator'
  }
}, function(err, user){
  console.log(user);
  console.log('Admin role updated');
})
})

// get all registered users

router.get('/all-users', function(req, res) {
  // search the database to return an array of all users in the collection

  users.find({}, function(err, users) {
    // if an error is encounter 500 status is returned

    if(err) {
      return res.status(500).send('Server error encountered');
    }

    // return all users in json format

    res.json(users)
  })
})

module.exports = router;
