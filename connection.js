var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client( {  
    hosts: 'http://admin:abcd1234@10.101.2.20:9200/'
  });

module.exports = client;  
