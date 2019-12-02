//Description: json array that contains all five products with their respective price, description and image. Above is a variable called products that defines the array that is used in the invoice and flowershop html page.
//Jayla Kaita & Melissa Yago 12/1/19- Code is used from previous Assignment 1
var products = [
    { 
     "flower" : "Catharanthus",
     "price" : 4.00,
     "image" : "./images/cath.jpg"
     },
     
     {
      "flower" : "Lantana",
      "price" : 3.00,
      "image" : "./images/lantana.jpg"
     },
    
     {
      "flower" : "Marigold",
      "price" : 5.00,
      "image" : "./images/marigold.jpg"
     },
    
     {
      "flower" : "Petunia",
      "price" : 8.00,
      "image" : "./images/petunia.jpg"
     },
    
     {
      "flower" : "Rose",
      "price" : 5.00,
      "image" : "./images/rose.jpg"
     }
 ];
 
 if(typeof module != 'undefined') {
     module.exports = products;
 }