var express = require('express'); //initializes express to set up web server
var myParser = require("body-parser");
var app = express(); //Executes express
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); //code to respond to any HTTP request by sending back the type of request and the URL path from the request
   next(); //invokes the next middleware function
  
});
app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
   let POST = request.body;
   console.log(request.query);
   response.send(POST); 

});

 app.use(express.static('./public')); //sets up a request to respond to GET and looks for the file from public (sets up static web server)
app.listen(8080, () => console.log(`listening on port 8080`)); //listens on Port 8080

