//Description: The server for the cookie store
//Melissa Yago 11/14/19-Code was learned from Lab13 & Stack Exchange

var express = require('express'); //initializes express to set up web server.
var myParser = require("body-parser"); //initializes body-parser to set up web server.
var app = express(); //Executes express.

const querystring = require('querystring'); //Cannot change anything within querystring. 

app.use(myParser.urlencoded({ extended: true })); //Uses Parser package.

 //Check if quantity data is valid
app.get("processed_quantity", function (request, response) {
   params = request.query;//Looks up request.query
   console.log(params);
   if (typeof params['purchase_submit'] != 'undefined') {
      has_errors = false; // assume quantities are valid from the start
      total_qty = 0; // Checks to see if quantity is > 0
      for (i = 0; i < products.length; i++) {
         if (typeof params[`quantity${i}`] != 'undefined') {
            a_qty = params[`quantity${i}`]; // make textboxes sticky in case of invalid data
            total_qty += a_qty; //Adds up all quantities
            if (!isNonNegInt(a_qty)) {
               has_errors = true; // Invalid quantity
            }
            
         }
      }
        // Responds to errors or redirect to invoice if all is ok
      qstr = querystring.stringify(request.query);
      //if quantity data is not valid, send them back to product display
      if (has_errors || total_qty == 0) {  
         qstr = querystring.stringify(request.query);
         response.redirect("products_display.html?" + qstr);
      } else { //if quantity data valid, send them to the invoice
         response.redirect("invoice.html?" + qstr);
      }
      console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));
   }
});




 app.use(express.static('./public')); //sets up a request to respond to GET and looks for the file from public (sets up static web server)
app.listen(8080, () => console.log(`listening on port 8080`)); //listens on Port 8080

    //Ensures data inputted is not a negative number, does not contain letters and is not a decimal.
    function isNonNegInt(q, return_errors = false) {
      errors = []; // assume no errors at first
      if(q == '') q =0; // handle blank inputs as if they are 0
      if (Number(q) != q) errors.push('<font color="red">*Not a number!</font>'); // Check if string is a number value
      else if (q < 0) errors.push('<font color="red">*Negative value!</font>'); // Check if it is non-negative
      else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
      return return_errors ? errors : (errors.length == 0); //returns as error
}




 
