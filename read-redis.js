var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

const promiseBinance = new Promise(function(resolve, reject) {
    client.hgetall('binance', function(err, results) {
       if (err) {
           // do something like callback(err) or whatever
       } else {
          // do something with results
          //console.log('binance: ', results)
          resolve(results)
       }
    });
});

const promiseGateio = new Promise(function(resolve, reject) {

    client.hgetall('gateio', function(err, results) {
       if (err) {
           // do something like callback(err) or whatever
       } else {
          // do something with results
          //console.log('gateio: ', results)
          resolve(results)
       }
    });
});

promiseBinance.then(function(value) { console.log('=> received from binance:\n', value); });
promiseGateio.then(function(value) { console.log('=> received from gateio:\n', value); });

Promise.all([promiseBinance, promiseGateio]).then(function(values) {
  console.log('=> received all market values:\n', values);
});

client.quit()
