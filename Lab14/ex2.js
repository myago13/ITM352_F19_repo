fs = require('fs');  
var filename = 'user_data.json';



//returns a boolean (true or false)
if (fs.existsSync(filename)) {
    stats=fs.statSync(filename)
 console.log(filename +' has '+ stats.size  +' characters');   

data =fs.readFileSync(filename, 'utf-8'); 
users_reg_data = JSON.parse(data); //parses data so that the data from the json file can be read. 
console.log(users_reg_data);

} else { 
    console.log(filename+ 'does not exist ')
}