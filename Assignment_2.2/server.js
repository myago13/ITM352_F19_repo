//server acts as a middle man
const querystring = require('querystring'); //Cannot change anything within the querystring

var express = require('express'); //initializes express to set up web server
var myParser = require("body-parser"); //initializes body-parser to set up web server
var products = require("./public/product.js"); //uses flower products listed in the product.js file
var filename = 'user_data.json' //Defines the user_data.json array as an object
var app = express(); //Executes Express




app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path); //respond to HTTP request by sending type of request and the path of request
   next(); //calls the middleware function
});

app.use(myParser.urlencoded({ extended: true }));
//intercept purchase submission form, if good give an invoice, otherwise send back to order page
app.get("/process_page", function (request, response) {
   //check if quantity data is valid
   //look up request.query
   params = request.query;
   console.log(params);
   if (typeof params['purchase_submit'] != 'undefined') {
      has_errors = false; // assume quantities are valid from the start
      total_qty = 0; // need to check if something was selected so we will look if the total > 0
      for (i = 0; i < products.length; i++) {
         if (typeof params[`quantity${i}`] != 'undefined') {
            a_qty = params[`quantity${i}`];
            total_qty += a_qty;
            if (!isNonNegInt(a_qty)) {
               has_errors = true; // oops, invalid quantity
            }
         }
      }
      qstr = querystring.stringify(request.query);
      // Now respond to errors or redirect to invoice if all is ok
      if (has_errors || total_qty == 0) {
         //if quantity data is not valid, send them back to product display
         qstr = querystring.stringify(request.query);
         response.redirect("flowershop.html?" + qstr);
      } else { // all good to go!
         response.redirect("login.html?" + qstr);
      }
   }
});
//if quantity data valid, send them to the invoice


function isNonNegInt(q, returnErrors = false) {
   errors = []; // assume no errors at first
   if (q == "") { q = 0; }
   if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
   if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
   if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
   return returnErrors ? errors : (errors.length == 0);
}

fs = require('fs'); 

//returns a boolean (true or false) (Opens file only if it exists)
if (fs.existsSync(filename)) {
   fs.statSync(filename)
  

data=fs.readFileSync(filename, 'utf-8'); 
users_reg_data = JSON.parse(data);
/*
username = 'newuser';
users_reg_data[username] = {};
users_reg_data[username].password = 'newpass';
users_reg_data[username].email = 'newuser@user.com';

fs.writeFileSync(filename, JSON.stringify(users_reg_data));
*/
console.log(users_reg_data);

} else {
   console.log(filename+ 'does not exist ')
}



app.get("/login", function (request, response) {// Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    the_username= request.body.username;
    if(typeof users_reg_data[the_username] != 'undefined'){ //To check if the username exists in the json data
        if( users_reg_data[the_username].password ==request.body.password){
            response.send('/Login_Succesful')
        } else {
            response.redirect('/login') //IN ASSIGNMENT, SHOW THERE IS AN ERROR
        }
    }
});




app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));