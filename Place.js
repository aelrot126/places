const mongoose = require('mongoose');

const db = 'mongodb://placesdb2018:placesdb2018@ds221271.mlab.com:21271/placesdb2018';
//mongoose.Promise = global.Promise;
const appname='placesdb2018';
const collection ='placesappcollection';
mongoose
  .connect(db)
  .then(() => {
    console.log('mongoose connected to mongodb');
  })
  .catch(error => {
    console.log('mongoose connection error: ', error);
  });

const placeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  photo_reference: {
    type: String
  },
  comiclink: {
    type: String
  },
  hero: {
    type: String
  }

});

// if no specify collectioname, it will create places collection
// ie lowercase Place and pluralize it
const Place = mongoose.model('Place', placeSchema, 'placesappcollection');

module.exports = Place;
