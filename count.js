var client = require('./connection.js');

client.count({index: 'iotpoc',type: 'IAQ'},function(err,resp,status) {  
    console.log("constituencies",resp);
  });