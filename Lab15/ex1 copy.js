var express = require('express');
var app = express();
var myParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(session({secret: "ITM 352 rocks"}));
app.use(myParser.urlencoded({ extended: true }));

fs = require('fs'); 

var filename = 'user_data.json';

//returns a boolean (true or false)
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



app.get("/login", function (request, response) {
    if(typeof request.cookies.username != 'undefined'){
        response.send(`Welcome back ${request.cookies.username}!` + '<br>'
        + `you last logged in on ${request.cookies.last_login}`);
    }
    // Give a simple login form (responds by generating a login page)
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

    // Process login form POST and redirect to logged in page if ok, back to login page if not. Action is executed when button is submitted
    console.log(request.body);
    the_username= request.body.username;
    
    if(typeof users_reg_data[the_username] != 'undefined'){
        if( users_reg_data[the_username].password ==request.body.password){
            theQuantQuertystring= qs.stringify(users_reg_data);
          if(typeof request.session.last_login != 'undefined'){
            var msg =`you last logged in on ${request.session.last_login}`; 
            var now = new Date();   
          } else{
              now = 'first login';
          }
         
            request.session.last_login = now;
            response //chain method
            .cookie('username', the_username, {maxAge: 60*1000})
            .send(msg + '<br>' + `${the_username} is logged in at ${now}`);
        } else {
            response.redirect('/login') //IN ASSIGNMENT, SHOW THERE IS AN ERROR
        }
    }
});

app.get("/register", function (request, response) {
    // Give a simple register form
    
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form

    //Validate

    //Save new user to file name (users_reg_data)
    username = request.body.username;
    
    //Checks to see if username already exists
    errors = [];
  
if (typeof users_reg_data[username] != 'undefined'){
errors.push("Username is Already in Use");
}

console.log(errors, users_reg_data);
if (errors.length == 0){
    users_reg_data[username] = {};
    users_reg_data[username].password = request.body.password;
    users_reg_data[username].email = request.body.email;

    fs.writeFileSync(filename, JSON.stringify(users_reg_data));
    
    response.redirect("/register");
   
    
} else {
    response.redirect("/register");
}
    
 });

 app.get('/use_session', function (request, response){
     response.send('Welcome your session ID is ${request.session.id}');
 })
 
 app.get('/set_cookie', function (request,response) {
response.cookie('myname', 'Melissa Yago', {maxAge: 5*1000}).send('cookie set');
 });

 app.get('/use_cookie', function (request,response) {
     output = "No cookie with myname";
     if(typeof request.cookies.myname != 'underfined') {
  output = `Welcome to the Use Cookie page ${request.cookies.myname}`;
  response.send(output);
     }});

app.listen(8080, () => console.log(`listening on port 8080`));
app.use(cookieParser());
app.use(session({secret: "ITM352 rocks!"}));