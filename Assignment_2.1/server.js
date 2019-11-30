//server acts as a middle man
const querystring = require('querystring'); //Cannot change anything within the querystring

var express = require('express'); //initializes express to set up web server
var myParser = require("body-parser"); //initializes body-parser to set up web server
var products = require("./public/product.js"); //uses flower products listed in the product.js file
var filename = 'user_data.json' //Defines the user_data.json array as an object
var app = express(); //Executes Express
var qs = require('querystring');
var qstr =  {};
var flowerquant = {};





app.use(myParser.urlencoded({ extended: true }));
//intercept purchase submission form, if good give an invoice, otherwise send back to order page
app.get("/process_page", function (request, response) {
   //check if quantity data is valid
   //look up request.query
   flowerquant = request.query;
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



fs = require('fs'); //Use the file system module 

//returns a boolean (true or false) (Opens file only if it exists)
if (fs.existsSync(filename)) {
   stats=fs.statSync(filename) //gets the stats of your file
  

data=fs.readFileSync(filename, 'utf-8'); //Reads the file and returns back with data and then continues with code as requested.
console.log(typeof data); //shows on the console the type of data
users_reg_data = JSON.parse(data); //Parses data in order to turn string into an object
}
/*
username = 'newuser';
users_reg_data[username] = {};
users_reg_data[username].password = 'newpass';
users_reg_data[username].email = 'newuser@user.com';
fs.writeFileSync(filename, JSON.stringify(users_reg_data));
*/



//GETS TO LOGIN PAGE
app.get("/login.html", function (request, response) {
   // Give a simple login form (responds by generating a login page) and requests information inputted by this form 
   str = `
   <html lang="en">
   <link href="pretty.css" rel="stylesheet">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
</head>
<h1>Sunrise Flower Shop</h1>
<h2>To continue purchasing, please login below!</h2>
<body>
<form action="" method="POST"> 
   <div>
   <input type="text" name="username" size="40" placeholder="enter username" ><br /> 
   <input type="password" name="password" size="40" placeholder="enter password"><br />
   <input type="submit" value="Submit" id="submit">  </div>
   </form>  
</body>
<h2>Are you a new user? Click below to register on our site!</h2>
<body>
<div>
<form action="./registration.html">
<input type="submit" value="Register Here" id="register_here" name="register_here">
</form>
</div>
</body>
</html>
   `;
   response.send(str);
});



app.post("/login.html", function (request, response) {
   // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(flowerquant);
    the_username= request.body.username;
    console.log(the_username, "Username is", typeof (users_reg_data[the_username]));
    //validate login data
    if(typeof users_reg_data[the_username] != 'undefined'){ 
       //To check if the username exists in the json data
        if( users_reg_data[the_username].password ==request.body.password){
                 //make the query string of prod quant needed for invoice
                 theQuantQuerystring = qs.stringify(flowerquant); 
                 response.redirect('/invoice.html?' + theQuantQuerystring + `&username=${the_username}`); 
                 //ADDS USERNAME INFO TO INVOICE
        } else {
            response.redirect('/login.html?') 
            //IN ASSIGNMENT, SHOW THERE IS AN ERROR
        }
    }
});

app.get("/registration.html", function (request, response) {
   // Give a simple register form
   
   str = `
   <html lang="en">
   <link href="pretty.css" rel="stylesheet">
<head>
   <h1>Sunrise Flower Shop</h1>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
</head>
<body>
<body>
<div>
<form  method="POST" action="" onsubmit=validatePassword() >
<input type="text" name="fullname" size="40" pattern="[a-zA-Z]+[ ]+[a-zA-Z]+" maxlength="30" placeholder="Enter First & Last Name"><br/>
<input type="text" name="username" size="40" pattern=".[a-z0-9]{4,10}" required title="Length must be 4-10 '<p>" placeholder="Enter Username" ><br />
<input type="email" name="email" size="40" placeholder="Enter Email" pattern="[a-z0-9._]+@[a-z0-9]+\.[a-z]{3,}$" required title="invalid email address"><br />
<input type="password" id="password" name="password"  size="40" pattern=".{6,}" required title="6 characters minimum" placeholder="Enter Password" ><br />
<input type="password" id="repeat_password" name="repeat_password" size="40" pattern=".{6,}" required title="6 characters minimum" placeholder="Enter Password Again"><br />
<input type="submit" value="Submit" id="submit">
</form></div>
</body>
</html>
   `;
   response.send(str);
});

app.post("/registration.html", function (request, response) {
   // process a simple register form
   console.log(flowerquant);
   the_username= request.body.username;
   the_password = request.body.password;
    console.log(the_username, "Username is", typeof (users_reg_data[the_username]));
   
   username = request.body.username;//Save new user to file name (users_reg_data)
   
   errors = [];//Checks to see if username already exists
 
if (typeof users_reg_data[username] != 'undefined'){
errors.push("Username is Already in Use");
}

console.log(errors, users_reg_data);

if (errors.length == 0){
   users_reg_data[username] = {};
   users_reg_data[username].username = request.body.username
   users_reg_data[username].password = request.body.password;
   users_reg_data[username].email = request.body.email;
 
fs.writeFileSync(filename, JSON.stringify(users_reg_data));
theQuantQuerystring = qs.stringify(flowerquant);
   response.redirect("/invoice.html?" + theQuantQuerystring + `&username=${the_username}`);

} else { 
   response.redirect('/registration.html?' + 'try again');
}
   
});







app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path); //respond to HTTP request by sending type of request and the path of request
   next(); //calls the middleware function
});
app.use(express.static('./public')); //sets up a request to respond to GET and looks for the file from public (sets up static web server)
app.listen(8080, () => console.log(`listening on port 8080`)); //listens on Port 8080