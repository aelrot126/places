const axios = require ('axios');
const express = require ('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const server = express ();
const path =require('path');
const filemgr = require('./filemgr');
const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({extended:true}));
server.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
const PLACES_API_KEY = 'AIzaSyCs5CBfqYqi2C-nCOqG-Nhr4k4PX_Pa5OY';
var filteredResults;

hbs.registerHelper('list', (items, options)=>{
  items =filteredResults;
  var out = "<tr><th>Name</th><th>Address</th><th>photo</th></tr>";
  const length =items.length;
  for(i=0; i<length; i++){
    out = out + options.fn(items[i]);
  };
  return out
});
server.get('/historical',(req, res) =>{
  filemgr.getAllData().then((result)=>{
    filteredResults= result;
    res.render('historical.hbs');
  }).catch((errorMessage)=>{
    console.log(errorMessage);
  });

});
server.post('/Delete',(req, res)=>{
    filemgr.DeleteAll().then((result)=>{
      filteredResults = result;
      res.render('historical.hbs');
    }).catch((errorMessage)=>{
      console.log(errorMessage);
    });
});
server.get('/form',(req, res) =>{
  res.render('form.hbs');
});
server.use(express.static(path.join(__dirname, 'public')));

server.get('/',(req, res) =>{
  res.render('home.hbs');
});
server.post('/getplaces',(req,res)=>{
  const addr =req.body.address;
  const placetype=req.body.placetype;
  const name=req.body.name;
  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyDJfKPpzaHKGjanalWbZGkEUHu8LR9HNAg`;
  axios.get(locationReq).then((response)=> {
const locationData ={
  addr:response.data.results[0].formatted_address,
  lat:response.data.results[0].geometry.location.lat,
  lng:response.data.results[0].geometry.location.lng,
}
const placesReq =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=1500&types=${placetype}&name=${name}&key=${PLACES_API_KEY}`;

return axios.get(placesReq);
}).then((response)=>{
  filteredResults =extractedData(response.data.results);
  filemgr.saveData(filteredResults).then((result)=>{
    res.render('result.hbs');
  }).catch((errorMessage) =>{
    console.log(errorMessage);
  });
  // res.status(200).send(response.data.results);

}).catch((error)=>{
  console.log(error);
});

});
const extractedData = (originalResults) =>{
  var placesObj = {
    table : [],
  };
  const length =originalResults.length;
  for(var i=0; i<length; i++){
    if(originalResults[i].photos){
      const photoRef = originalResults[i].photos[0].photo_reference;
      const requestUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${PLACES_API_KEY}`

      tempObj={
        name: originalResults[i].name,
        address: originalResults[i].vicinity,
        photo: requestUrl,
      };

    }else{

      tempObj={
        name: originalResults[i].name,
        address: originalResults[i].vicinity,
        photo: '/no_image.png',

      }

    }

    placesObj.table.push(tempObj);
  }
  return placesObj.table;
};
server.listen(port,() => {
  console.log(`Server started on port ${port}`);
});
