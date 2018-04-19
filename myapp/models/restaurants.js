var mongoose = require('mongoose');

var RestaurantModel = mongoose.model('Restaurant', {
  id: {
    type: String,
    unique: true
  },
  alias: String,
  name: String,
  image_url: String,
  is_closed: Boolean,
  url: String,
  review_count: Number,
  categories: [{alias: String, title: String}],
  rating: Number,
  coordinates: {latitude: String, longitude: String},
  transactions: [String],
  price: String,
  location: {
    address1: String,
    address2: String,
    address3: String,
    city: String,
    zip_code: String,
    country: String,
    state: String,
    display_address: [String]
  },
  phone: String,
  display_phone: String,
  distance: String,
  images: [String]
});

module.exports = RestaurantModel