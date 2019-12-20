/*Description: json array that contains all four events with their respective points, 
description and image. 
The variable called events defines the array that is used in the Points Calculated 
and Total Points html page.
Code is borrowed from previous Assignment 1
Jayla Kaita & Melissa Yago & Preetha Pant 12/19/19 */
var events = [
    { 
     "Event" : "Community Service",
     "Points" : 400,
     "image" : "./images/comsrv.jpg"
     },
     
     {
      "Event" : "Fundraiser Participation",
      "Points" : 500,
      "image" : "./images/fundrs.jpg"
     },
    
     {
      "Event" : "General Meeting",
      "Points" : 500,
      "image" : "./images/GEN.jpg"
     },
    
     {
      "Event" : "Socials",
      "Points" : 375,
      "image" : "./images/social.jpg"
     }
 ];

 if(typeof module != 'undefined') {
    module.exports = events;
}