var Customer = require('../models/customerModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var findUser = Q.nbind(Customer.findOne, Customer);
    findUser({email: email})
      .then(function (customer) {
        if (!customer) {
          next(new Error('Customer does not exist'));
        } else {
          return Customer.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(customer, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No customer'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
    var create;
    var newUser;

    var findOne = Q.nbind(Customer.findOne, Customer);

    // check to see if customer already exists
    findOne({email: email})
      .then(function(customer) {
        if (customer) {
          next(new Error('Customer already exist!'));
        } else {
          // make a new customer if not one
          create = Q.nbind(Customer.create, Customer);
          newUser = {
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
            phone_number: phone
          };
          return create(newUser);
        }
      })
      .then(function (customer) {
        // create token to send back for auth
        var token = jwt.encode(customer, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var customer = jwt.decode(token, 'secret');
      var findUser = Q.nbind(Customer.findOne, Customer);
      findUser({email: customer.email})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};