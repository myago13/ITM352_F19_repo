//Description: Server for Golden Key International Honour Society Points System
//Jayla Kaita, Preetha Pant & Melissa Yago 12/19/2019-Code was learned from Lab 13,14,15 Stack Exchange and through Mr. Kazman & Mr. Port's Help
const querystring = require('querystring');
var express = require('express'); //initializes express to set up web server
var myParser = require("body-parser"); //initializes body-parser to set up web server
var filename = 'user_data.json' //Defines the user_data.json array as an object
var app = express(); //Executes Express
var qs = require('querystring'); //cannot change anything within the querstring
var cookieParser = require('cookie-parser'); //Executes Cookie-parser
var session = require("express-session"); //Executes Sessions
var events = require("./public/events_pts.js"); //require the events to be shown with their respective points and pictures
app.use(session({secret: "ITM352 rocks!"})); //initiate session use

fs = require('fs'); //Use the file system module 
app.use(myParser.urlencoded({ extended: true }));
app.use(cookieParser()); //Use Cookies!!
//returns a boolean (true or false) (Opens file only if it exists)
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets the stats of your file


    data = fs.readFileSync(filename, 'utf-8'); //Reads the file and returns back with data and then continues with code as requested.
   
    users_reg_data = JSON.parse(data); //Parses data in order to turn string into an object
}



//*************************** Redirects to General Member Page so they can calculate their points ****************************************

// Process login form POST and redirect to general pts page. If incorrect login info is inputted, show error
app.post("/login.html", function (request, response) {
    the_username = request.body.username; //makes username 
    //Validation of Login Data
    if (typeof users_reg_data[the_username] != 'undefined') {   //To check if the username exists in the json data
        if (users_reg_data[the_username].password == request.body.password) { //If the password inputted is = to the password in the json array

            response.redirect('/gen_ptpg.html?' + `&username=${the_username}`); //Send user to general member page to calculate points along with their username
        }

        else {
            response.send('Invalid Login: Please hit the back button and try again'); //if password isn't equal to password existing in jsonn data, show error message

        }
     

    }

});



//*************************** When Webmaster logins, validate and send to the Webmaster Main Page ****************************************

app.post("/webmasterLogin.html", function (request, response) {
    the_username = request.body.username; //makes username 
    //Validate login data
    if (typeof users_reg_data[the_username] != 'undefined') {   //To check if the username exists in the json data
        the_usertype = users_reg_data[the_username].usertype; //Defines the_usertype that is in the json file
        if (the_usertype == 'Webmaster') {   //If the usertype is Webmaster for the login user that is in the json file, then...

   
            response.redirect("/master_mainpg.html?");//redirect to the master main page
        }
        else {
           response.send('Invalid Login: Please hit the back button and try again'); //if username/password does not exist in json data, show error message
        
       }
       
   }
   if (response.send('Invalid Login: Please hit the back button and try again ')){ //if username/password does not exist in json data, show error message
    
    }
        
        }
    
);




//*************************** GEN MEMBER PG TO CALCULATE POINTS ****************************************
app.use(myParser.urlencoded({ extended: true }));
app.get("/process_page", function (request, response) { //check if quantity data is valid
   //look up request.query
   params = request.query;
   console.log(params); //Diagnostic
   if (typeof params['purchase_submit'] != 'undefined') {
      has_errors = false; // assume quantities are valid from the start
      total_qty = 0; // need to check if something was selected so we will look if the total > 0
      for (i = 0; i < events.length; i++) {
         if (typeof params[`quantity${i}`] != 'undefined') {
            a_qty = params[`quantity${i}`]; //makes textboxes sticky in case of invalid data
            total_qty += a_qty; //Adds up all quantities
            if (!isNonNegInt(a_qty)) {
               has_errors = true; // Invalid quantity
            }
         }
      }
      qstr = querystring.stringify(request.query);  // Now respond to errors or redirect to invoice if all is ok
      if (has_errors || total_qty == 0) {
         //if quantity data is not valid, send them back to event display
         qstr = querystring.stringify(request.query);
         response.redirect("gen_ptpg.html?" + qstr);
      } else { // if quantity data is valid, send them to the general member points total page
         response.redirect("gen_pttotal.html?" + qstr);
      }
   }
});



function isNonNegInt(q, returnErrors = false) {
   errors = []; // assume no errors at first
   if (q == "") { q = 0; } //handle blank inputs as if they are 0
   if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
   if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
   if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
   return returnErrors ? errors : (errors.length == 0); //returns as an error
}


//*************************** At the Webmaster Main Page, the user is allowed to see when the last eb member logged in ****************************************
app.post("/master_mainpg.html", function (request, response) {
    
        if (typeof request.session.last_login != 'undefined') //Verifies user logged in for sessions
            {
                var msg = `You last logged in at ${request.session.last_login}`; //variable that says when the user last logged in
                var now = new Date(); //defines the date the user last logged in
                var back = `Click the back button to go to main page`; //Message Display if the user wants to go back to the main page
            } else {
                var msg = '';
                var now = 'first visit'; //Defines if it is the first visit of ebmember
            }
            request.session.last_login = now; //requests session
            response.send(`${msg} <BR>${back} <BR>${the_username} logged in at ${now}<BR> `); //sends the username 
            response.send("Click the back button to go back to main page.") //sends the following message
           

});
//***************************Once the webmaster has added a user's points, redirect to the members list showcasing ALL members points****************************************

app.post("/ptsadditionpage.html", function (request, response) {
    the_username = request.body.username; //makes username 
    errors= {};
    
    //Validate Points data
    if (Object.keys(errors).length == 0){
users_reg_data[the_username].username = request.body.username //makes sure that the username corresponds to the username in the json data
users_reg_data[the_username].points = request.body.points //requests the users points that is typed in
response.redirect("/Total_ptpg.html?");
fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Overwrites points info into the userdata json file
   response.redirect("/Total_ptpg.html?" ); //If all good, send to the GK Members List containing all names/points.
        }
    }
);



    //*************************** REGISTER NEW USER *******************
    app.post("/registration.html", function (request, response) {
        // process a simple register form
        username = request.body.username;//retrieves the username data
        errors = {};//Checks to see if username already exists
      
        //Username Validation
     if (typeof users_reg_data[username] != 'undefined'){
     errors.username_error="Username is Already in Use"; //if username is in json file, say username is already in use
     }
     if ((/[a-z0-9]+/).test(request.body.username) ==false){ //only allows numbers and letters for the username
        errors.username_error="Only numbers/letters";
     }
     if ((username.length > 10) ==true){
        errors.username_error = "Please make your username shorter"; //if length is more than 10, show error to make the username shorter
     }
     if ((username.length < 4) ==true){
        errors.username_error = "Please make your username longer"; //if length is less than 4, show error to make the username longer
     }
     
     
     
     
     //Fullname Validation // got help for the first fullname validation from Mr. Port
     fullname = request.body.fullname;//retrieves the fullname data
     if ((/[a-zA-Z]+[ ]+[a-zA-Z]+/).test(request.body.fullname) == false){ //Makes sure that the full name has a space between the names written
     errors.fullname_error="Only use letters and a space";
     }
     
     if ((fullname.length > 30) ==true){
        errors.fullname_error = "Please make your full name shorter. 30 characters max"; //if length is greater than 30, send error that 30 characters are max
     }
     
     
     //Email Validation//
     if ((/[a-z0-9._]+@[a-z0-9]+\.[a-z]+/).test(request.body.email) == false) {
     errors.email_error="Please enter proper email";
     }
     
     
     
     
     console.log(errors, users_reg_data);
     //If there are 0 errors, request all registration info
     if (Object.keys(errors).length == 0){
        users_reg_data[username] = {};
        users_reg_data[username].username = request.body.username
        users_reg_data[username].password = request.body.password;
        users_reg_data[username].email = request.body.email;
        users_reg_data[username].fullname = request.body.fullname;
        users_reg_data[username].points = request.body.points;
      
     fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Writes registration info into the userdata json file
     
        response.redirect("/Total_ptpg.html?" + `&username=${username}`); //If all good, send to the total point page with username/quantity info
     } else { 
        qstring= qs.stringify(request.body)+"&"+qs.stringify(errors); 
        response.redirect('/registration.html?' + qstring ); //if there are errors, send back to registration page to retype
     }
        
     });








app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path, request.session.id); //respond to HTTP request by sending type of request and the path of request
    next(); //calls the middleware function
});
app.use(express.static('./public')); //sets up a request to respond to GET and looks for the file from public (sets up static web server)
app.listen(8080, () => console.log(`listening on port 8080`)); //listens on Port 8080




