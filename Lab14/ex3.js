var express = require('express');
var app = express();
var myParser = require("body-parser");

app.use(myParser.urlencoded({ extended: true }));

fs = require('fs'); 

var filename = 'user_data.json';

//returns a boolean (true or false)
if (fs.existsSync(filename)) {
    fs.statSync(filename)
   

data=fs.readFileSync(filename, 'utf-8'); 
users_reg_data = JSON.parse(data);

} else {
    console.log(filename+ 'does not exist ')
}



app.get("/login", function (request, response) {
    // Give a simple login form when URL has /login in
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    the_username= request.body.username;
    if(typeof users_reg_data[the_username] != 'undefined'){ //To check if the username exists in the json data
        if( users_reg_data[the_username].password ==request.body.password){
            response.send(the_username + ' logged in')
        } else {
            response.redirect('/login') //IN ASSIGNMENT, SHOW THERE IS AN ERROR
        }
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));