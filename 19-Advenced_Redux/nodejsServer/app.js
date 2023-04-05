const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

mongoose.connect("mongodb://localhost:27017/cartReduxDB");

const mealSchema = new mongoose.Schema({
  items: [{
    id: String,
    title: String,
    price: Number,
    quantity: Number,
    totalPrice: Number
  }],
  totalQuantity: Number
});

const cart = mongoose.model('Cart', mealSchema);


// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.get('/cart', (req, res, next) => {
  cart.findById({_id: '64044ba33317b757cb74f0ba'}, (err, foundCart) => {
    if(!err) {
      if(foundCart) {
        res.send(foundCart);
      }
    } else {
      console.log(err);
    }
  });
});

app.post('/cart', (req, res, next) => {
  const cartReceived = req.body;

  const filter = {};
  const update = {items: cartReceived.items, totalQuantity: cartReceived.totalQuantity};

  cart.findOneAndUpdate(filter, update, {new: true}).then(cart => {
    if(cart) {
      res.send("Done");
    }
  });
});


app.listen(4000, () => {
    console.log("Listening on port 4000");
});






