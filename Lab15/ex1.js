var fs = require('fs');
var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');

app.use(session({secret: "ITM352 rocks!"}));

var filename = 'user_data.json';

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var fs = require('fs');
var myParser = require("body-parser");
var qs = require('querystring');
var session = require('express-session');

app.use(session({secret: "ITM352 rocks!"}));
app.use(myParser.urlencoded({ extended: true }));

var filename = 'user_data.json';

// Load in user information
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + ' characters');

    data = fs.readFileSync(filename, 'utf-8');


    users_reg_data = JSON.parse(data);

    
    } else {
        console.log(filename + ' does not exist!');
    }
    
    var user_product_quantities = {};
    
    app.get("/login", function (request, response) {
        // Present a simple login form
        console.log("GET login");
        if (typeof request.cookies.username != 'undefined') {
            response.send(`Welcome back ${request.cookies.username}` +
            '<BR>' + `You last logged in on ${request.session.last_login}`);
        } else {
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
        }
    });

    app.post("/login", function (request, response) {
        // Process login form POST and redirect to logged in page if ok, back to login page if not
        console.log(user_product_quantities);
        the_username = request.body.username;
        if (typeof users_reg_data[the_username] != 'undefined') {
            if (users_reg_data[the_username].password == request.body.password) {
                // make the query string of prod quant needed for invoice
                theQuantQuerystring = qs.stringify(user_product_quantities);
                //response.redirect('/invoice.html?' + theQuantQuerystring);
    
                if (typeof request.session.last_login != 'undefined')
                {
                    var msg = `You last logged in at ${request.session.last_login}`;
                    var now = new Date();
                } else {
                    var msg = '';
                    var now = 'first login';
                }
                request.session.last_login = now;
                response.send(`${msg} <BR>${the_username} logged in at ${now}`);
            } else {
                response.redirect('/login');
            }
    }});
    app.get('/use_session', function(request, response) {
        response.send(`Your session ID is: ${request.sessionID}`);
    });
    
    
    app.get('/set_cookie', function(request, response) {
        response.cookie('myname', 'Rick Kazman', {maxAge: 10000}).send('cookie set');

        app.get("/use_session", function (request, response) {
            response.send(`Your session ID is: ${request.sessionID}`);
            request.session.destroy();
        });
        
        
        app.get("/set_cookie", function (request, response) {
            response.cookie('myname', 'Rick Kazman', { maxAge: 10000 }).send('cookie set');

        });

        app.get('/use_cookie', function(request, response) {
            output = "No myname cookie found";
            if (typeof request.cookies.myname != 'undefined') {
                output = `Welcome to the Use Cookie Page ${request.cookies.myname}` ;
            }
            response.send(output);

        });

        app.get('/del_cookie', function(request, response) {
            response.clearCookie('myname');
            response.send('cookie myname cleared');
        });
        app.get('/del_cookie', function (request, response) {
            response.clearCookie('myname');
            response.send('cookie myname cleared');
        })});
