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