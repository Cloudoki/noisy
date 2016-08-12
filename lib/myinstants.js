"use strict"

const request = require('request'),
      fs = require('fs'),
      log = require('./logger')(__dirname);

const myinstanceAPI = "https://api.cleanvoice.ru/myinstants/";
const myinstanceAudio =  "https://www.myinstants.com/media/sounds/";

const downloadFile = (id, filename, callback) => {

  request.get(myinstanceAPI+"?type=file&id="+id)
        .on('end', function(err){
          callback(err, filename);
        })
        .pipe(fs.createWriteStream('./sounds/'+filename))
}

const parse = (respose) => {

  var object;
  try {
    object =  JSON.parse(respose);
  } catch(e){
    log.error(e);
  }
  return object;
};

const getSlackResponse = (item) => {

  var res = {
    "attachments": [
        {
          "title": item.title,
          "title_link": myinstanceAudio+item.filename,
        }
    ]
  }

  return res;
}

exports.list = (callback) => {

  request(myinstanceAPI+"?type=many&offset=0&limit=100",(err, res, body) =>{

    if( err )
      log.error(err);

    return callback(err, parse(body));
  });
}

exports.find = (text, callback) => {

  request(myinstanceAPI+"?type=many&search="+text+"&offset=0&limit=100",(err, res, body) =>{

    if( err )
      log.error(err);

    var objects = parse(body);
    var item;
    if( objects && objects.items ){
      item = objects.items[Math.ceil(Math.random()* 100)];

      return callback(err, getSlackResponse(item));
    }

    return callback(err, item);

  });
}

exports.random = (callback) => {

  request.get(myinstanceAPI+"?type=file")

        .on('end', function(err){
          console.log("end");
          return callback(null, {})
        }).pipe(fs.createWriteStream('music.mp3'))

}
