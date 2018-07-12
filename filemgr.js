const {MongoClient} = require('mongodb');
const fs =MongoClient;
//const database = 'mongodb://placesdb2018:placesdb2018@ds221271.mlab.com:21271/placesdb2018';
const database ='mongodb://localhost:27017';
const appname='placesdb2018';
const collection ='placesappcollection';
const saveData = (newdata) =>  {
  return new Promise((resolve, reject)=>{
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client)=> {
      if (err){
        reject('unable to connect to mongodb');
      }

    console.log('Successfull connected to mongodb');
    const db = client.db(appname);
    const length =newdata.length;
    for(var i=0;i<length;i++){
      db.collection(collection).insertOne(newdata[i],(err ,result)=> {
        if(err){
          reject('Cannot inserted to mongodb');
        }

      });
    }
    resolve(1);

    client.close();
  });
});
};

const getAllData = () =>{
  return new Promise((resolve,reject)=>{
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client)=> {
      if (err){
        reject('unable to connect to mongodb');
      }
      console.log('Successfull connected to mongodb');
      const db = client.db(appname);
      db.collection(collection).find().toArray().then((docs)=>{
        resolve(docs);
      }, (err)=>{
        reject('unable to fetch docs');
      });

      client.close();
    });

  });
};
const DeleteAll = () =>{
  return new Promise((resolve,reject)=>{
    MongoClient.connect(database,{useNewUrlParser: true}, (err, client)=> {
      if (err){
        reject('unable to connect to mongodb');
      }
      console.log('Successfull connected to mongodb');
      const db = client.db(appname);
      db.collection(collection).remove({}).then((result)=>{
        resolve(result);
      }, (err)=>{
        reject('unable to fetch docs');
      });

      client.close();
    });

  });
};


module.exports ={
  saveData,getAllData,DeleteAll
};
