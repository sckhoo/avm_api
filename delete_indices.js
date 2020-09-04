var client = require('./connection.js');

client.indices.delete({index: 'iotpoc'},function(err,resp,status) {  
  console.log("delete",resp);
});