const express = require('express');
const app = express();
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.listen(3000, () => {
    console.log('Listening on port 3000');
  });



  //Be Polite, Greet the User
  app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello there, ${name}! I am delighted to have you here today!`);
  });

  //Run for #1: http://localhost:3000/greetings?name=yelnats if I used query with this code: 
//     app.get('/greetings/', (req, res) => {
//     // Accessing query parameters from the request
//     const name = req.query.name;

//     // Using the query parameters to customize the response
//     res.send(`Hello there, ${name}! I am delighted to have you here today!`);
//   });





//Rolling the Dice
  app.get('/roll/:number', (req, res) => {
    //Without the parseInt, the random number was picking any and all numbers instead of staying within the range of the selected number in the URL.
    let number = parseInt(req.params.number);
    //Need to check for an actual number
    if(isNaN(number)) {
        res.send('You must specify a number');
    }
    //Here is how I will generate that random number roll. Adding the +1 allows the selected number to be in the selection pool as well.
    const randomRoll = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${randomRoll}!`)
  });




  //I Want THAT One!
app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    //check to see if index is in the array
    if (index < 0 || index >= collectibles.length || isNaN(index)) {
        res.send("This item is not yet in stock. Check back soon!");
      }
      //ties the objects together under their own index
      const collectible = collectibles[index];
    res.send(`So, you want the ${collectible.name}? For ${collectible.price}, it can be yours!`)
});




//Filter Shoes by Query Parameters (ChatGPT)
app.get('/shoes', (req, res) => {
    let filteredShoes = [...shoes];

    // Filter by min-price
    if (req.query['min-price']) {
      const minPrice = parseInt(req.query['min-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
  
    // Filter by max-price
    if (req.query['max-price']) {
      const maxPrice = parseInt(req.query['max-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
  
    // Filter by type
    if (req.query.type) {
      const type = req.query.type.toLowerCase();
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    // Respond with the filtered list of shoes
  res.send(filteredShoes);
});