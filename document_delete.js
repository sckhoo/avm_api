var client = require('./connection.js');

client.delete({  
  index: 'iotpoc',
  id: 'ICBLTnQBy8E1kXY_uUXj',
  type: 'IAQ'
},function(err,resp,status) {
    console.log(resp);
});