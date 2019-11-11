
attributes  =  "Melissa;20;20.5;-19.5" ;
theSeparator = ';'; 
parts = attributes.split(theSeparator);

//parts= ['Melissa',20,20.5,-19.5];

//for(i=0; i< parts.length; i++){
parts.forEach(printIT);

//}
function printIT(item, index) {
console.log( (typeof item == 'string' && item.length > 0)?true:false) 
   

}
console.log(parts.join(theSeparator));

function isNonNegInt (q,returnErrors =false) {
errors = []; // assume no errors at first
if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
return returnErrors ? errors : (errors.length == 0); 
    
}
//console.log(isNonNegInt(-2));

//console.log('hey! '+ q);