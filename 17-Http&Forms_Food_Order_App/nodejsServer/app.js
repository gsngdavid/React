const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

mongoose.connect("mongodb://localhost:27017/mealsDB");

const mealSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const meal = mongoose.model('Meal', mealSchema);

const DUMMY_MEALS = [
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.delete('/meal', (req, res, next) => {
//   meal.deleteOne({_id: '63d97b6208f7d08b959c161d'}, (err, item) => {
//     if(!err) {
//       console.log("Deleted");
//     } else {
//       console.log(err);
//     }
//   })
// });

// Get all meals
app.get('/meals', (req, res, next) => {
    // res.send(DUMMY_MEALS);
    meal.find({}, (err, foundMeals) => {
      if (!err) {
        res.send(foundMeals);
      } else {
        console.log(err);
      }
    });
});

// Adding meal
app.post('/meal', (req, res, next) => {
  const newMeal = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }
  meal.insertMany(newMeal);
  res.send(newMeal);
  console.log("Meal successfully inserted");
});

app.post("/order", (req, res, next) => {
  const order = {
    names: req.body.names,
    items: req.body.items
  }
  console.log(order);

  var notFound = false;
  order.items.forEach(item => {
    meal.findById(item.id, (err, foundItem) => {
      if(!err) {
        if(foundItem) {
          console.log("NOT FOUND!");
          console.log(notFound);
        } else if(!foundItem) {
          console.log("NOT FOUND!");
          notFound = true;
          console.log(notFound)
          // message = "Some items was not found!";
          return;
        }
      } else {
        console.log(err);
      }
    });
  });

  console.log("++++++++++++++++++", notFound);
  if(notFound) {
    res.send({"message": "Some items was not found!"});
  } else {
    res.send({"message": "Your order has been received successfully"});
  }
});


app.listen(4000, () => {
    console.log("Listening on port 4000");
});