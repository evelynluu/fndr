var express = require('express');
var router = express.Router();

var axios = require('axios');
var ineed = require('ineed');

var models = require('../models');
var RestaurantModel = models.Restaurants;

/**
 *  GET restaurants
 */
router.get('/search', function(req, res, next){
    
    var apiKey = 'bc1fTxY3oPnC0ckGwOc254QAmwE0_C3Fu-0-Ym56gunmqyfmeUwdC6tOXJPREKtxBqVbIKXQVBoAhZ4rjUa2UtTAdRR7MSFS4jySZTbNTojfArHp35rL41HpZc3UWnYx';
   
    axios.get('https://api.yelp.com/v3/businesses/search?latitude=33.650769&longitude=-117.840469&categories=restaurants', 
    {
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    })
    .then((response) => {

        var restaurantsArray = response.data.businesses;

        restaurantsArray.forEach((restaurant) => {

            // Create an entry for the restaurant in the database
            RestaurantModel.create(restaurant)
            .then((createdRestaurant) => {
                console.log('Restaurant entry created');
            })
            .catch((error) => {
                console.log(error)
            }) 
        })
        res.json(restaurantsArray);
    })
    .catch((error) => {
      console.log(error)
    })
});

// GET 30 photos from the Yelp restaurant
router.get('/search/photos', function(req, res, next){
    RestaurantModel.find((err, array) => {
        if(err){
            console.log(error)
        }
        
        array.forEach((restaurant) => {
            // Put together the URL for photos
            var url = restaurant.url;
            var messyURL = url.split('?');
            var cleanUrl = messyURL[0];
            var newUrl = cleanUrl.split('biz');
            var photosUrl = newUrl[0] + 'biz_photos' + newUrl[1] + '?start=0&tab=food';

            console.log(photosUrl);

            var imageLinks = [];
            let restaurantId = restaurant.id;
           
            // Scrape the business page for photos
            ineed.collect.images.from(photosUrl,
                function (err, response, result) {

                var images = result.images;
                var substring = "Photo of";

                // Grab the original size of each photo
                images.forEach((image) => {
                    var imgSrc = image.src;
                    var imgAlt = image.alt;
                    if(imgAlt.includes(substring)){
                        var splitSrcUrl = imgSrc.split('/');
                        var newImgSrc = "";

                        for(var i = 0; i < splitSrcUrl.length; i++){
                            if(i == (splitSrcUrl.length-1)){
                                newImgSrc += "o.jpg";
                            }
                            else {
                                newImgSrc += splitSrcUrl[i] + '/';
                            }
                        }
                        imageLinks.push(newImgSrc);  
                    }
                });
                restaurant.images = imageLinks;
                restaurant.save();
             });
        });
    })
    console.log('Finished grabbing images');
});


module.exports = router;