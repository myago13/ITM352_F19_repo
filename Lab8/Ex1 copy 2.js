var age= 20;
var number=0;
while(number <age){
    
    number++;

if(number > (age/2) ){
    console.log("I'm old!");
  process.exit();
}
console.log(`Are you ${number} years old?`);
}
console.log(`You must be ${number} years old`);