var express = require('express');
var fs = require('fs');
var open = require('open');
var zxSoapConnect = require('./zxSoapConnect');
var https = require('https');


var RestaurantRecord = require('./model').Restaurant;
var MemoryStorage = require('./storage').Memory;

var API_URL = '/api/restaurant';
var API_URL_ID = API_URL + '/:id';
var API_URL_ORDER = '/api/order';

var removeMenuItems = function(restaurant) {
  var clone = {};

  Object.getOwnPropertyNames(restaurant).forEach(function(key) {
    if (key !== 'menuItems') {
      clone[key] = restaurant[key];
    }
  });

  return clone;
};


exports.start = function(PORT, STATIC_DIR, DATA_FILE) {
  var app = express();
  var storage = new MemoryStorage();

  // log requests
  app.use(express.logger('dev'));

  // serve static files for demo client
  app.use(express.static(STATIC_DIR));

  // parse body into req.body
  app.use(express.bodyParser());

  // zxConnect API
  var ZX_CONNECT_API_URL = '/api/zxConnect';
  var ZX_CONNECT_API_URL_AUTHTOKEN = ZX_CONNECT_API_URL + '/:id';
  app.get(ZX_CONNECT_API_URL_AUTHTOKEN, function(req, res, next) {
    // get the session from the zanox connect API
    var authtoken = req.params.id;
    zxSoapConnect(authtoken, res);
    //res.send(200, 'got connect session for authtoken: ' + authtoken);
  });

  // publisher API (profiles as first try)
  var ZX_PUBLISHER_API_BASE_URL = '/api/publisher/*';
  app.get(ZX_PUBLISHER_API_BASE_URL, function(req, res, next) {
    // get the session from the zanox connect API
    //var authtoken = req.params.id;
    //zxSoapConnect(authtoken, res);
    console.log('publisher API call: ', req.url);

    // parse URL: '/api/publisher/profiles?connectid=7C800204645B3065D201&date=Sun,+10+Feb+2013+19:12:20+GMT&nonce=bee2314a1af663354dbd5b04aab71dee&signature=M4hoV6ze9kYjUycbYmY4Ph4GzCo%3D'
    var targetUrl = req.url.substr(14, req.url.length);
    //targetUrl = targetUrl.replace('?', '/');
    targetUrl = 'https://api.zanox.com/json/2011-03-01' + targetUrl;
    console.log(targetUrl);

    https.get(targetUrl, function(res1) {
      var data = '';

      res1.on('data', function (chunk){
        data += chunk;
      });

      res1.on('end',function(){
        var obj = JSON.parse(data);
        console.log(obj);
        res.send(200, data);
      });

    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

/*    var options = {
      hostname: 'https://api.zanox.com',
      port: 80,
      path: 'json/2011-03-01' + targetUrl,
      method: 'GET'
    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });*/

  });

  // API
  app.get(API_URL, function(req, res, next) {
    res.send(200, storage.getAll().map(removeMenuItems));
  });


  app.post(API_URL, function(req, res, next) {
    var restaurant = new RestaurantRecord(req.body);
    var errors = [];

    if (restaurant.validate(errors)) {
      storage.add(restaurant);
      return res.send(201, restaurant);
    }

    return res.send(400, {error: errors});
  });

  app.post(API_URL_ORDER, function(req, res, next) {
    console.log(req.body)
    return res.send(201, { orderId: Date.now()});
  });


  app.get(API_URL_ID, function(req, res, next) {
    var restaurant = storage.getById(req.params.id);

    if (restaurant) {
      return res.send(200, restaurant);
    }

    return res.send(400, {error: 'No restaurant with id "' + req.params.id + '"!'});
  });


  app.put(API_URL_ID, function(req, res, next) {
    var restaurant = storage.getById(req.params.id);
    var errors = [];

    if (restaurant) {
      restaurant.update(req.body);
      return res.send(200, restaurant);
    }

    restaurant = new RestaurantRecord(req.body);
    if (restaurant.validate(errors)) {
      storage.add(restaurant);
      return res.send(201, restaurant);
    }

    return res.send(400, {error: errors});
  });


  app.del(API_URL_ID, function(req, res, next) {
    if (storage.deleteById(req.params.id)) {
      return res.send(204, null);
    }

    return res.send(400, {error: 'No restaurant with id "' + req.params.id + '"!'});
  });


  // start the server
  // read the data from json and start the server
  fs.readFile(DATA_FILE, function(err, data) {
    JSON.parse(data).forEach(function(restaurant) {
      storage.add(new RestaurantRecord(restaurant));
    });

    app.listen(PORT, function() {
      open('http://localhost:' + PORT + '/');
      // console.log('Go to http://localhost:' + PORT + '/');
    });
  });


  // Windows and Node.js before 0.8.9 would crash
  // https://github.com/joyent/node/issues/1553
  try {
    process.on('SIGINT', function() {
      // save the storage back to the json file
      fs.writeFile(DATA_FILE, JSON.stringify(storage.getAll()), function() {
        process.exit(0);
      });
    });
  } catch (e) {}

};
