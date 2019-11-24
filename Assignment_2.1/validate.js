var validate = require("validate.js");
var constraints = {
    username: {
      presence: true,
      exclusion: {
        within: ["nicklas"],
        message: "'%{value}' is not allowed"
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    }
  };
  
  validate({}, constraints, {format: "flat"});
  // => ["Username can't be blank", "Password can't be blank"]
  
  validate({username: "nicklas", password: "bad"}, constraints, {format: "detailed"});
  // => [
  //   {
  //     "attribute": "username",
  //     "value": "nicklas",
  //     "validator": "exclusion",
  //     "globalOptions": {
  //       "format": "detailed"
  //     },
  //     "attributes": {
  //       "username": "nicklas",
  //       "password": "bad"
  //     },
  //     "options": {
  //       "within": [
  //         "nicklas"
  //       ],
  //       "message": "'%{value}' is not allowed"
  //     },
  //     "error": "Username 'nicklas' is not allowed"
  //   },
  //   {
  //     "attribute": "password",
  //     "value": "bad",
  //     "validator": "length",
  //     "globalOptions": {
  //       "format": "detailed"
  //     },
  //     "attributes": {
  //       "username": "nicklas",
  //       "password": "bad"
  //     },
  //     "options": {
  //       "minimum": 6,
  //       "message": "must be at least 6 characters"
  //     },
  //     "error": "Password must be at least 6 characters"
  //   }
  // ]
  
  validate.formatters.custom = function(errors) {
    return errors.map(function(error) {
      return error.validator;
    });
  };
  
  validate({username: "nicklas", password: "bad"}, constraints, {format: "custom"});
  // => ["exclusion", "length"];