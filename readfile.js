var client = require('./connection.js');
var fs = require('fs');
var obj;

fs.readFile('ingestfile.txt', 'utf8', function (err, data) {
  if (err) throw err;
  var array = data.toString().split("\n");
  for (i in array) {
      //console.log("-------------new data------------")
      //console.log("Data:", JSON.parse(array[i]).data);
      //console.log("sigfoxId:", JSON.parse(array[i]).sigfoxId);
      //console.log("Time:", JSON.parse(array[i]).time);
      //console.log("Type:", JSON.parse(array[i]).type);
      //console.log("seqNumber:", JSON.parse(array[i]).seqNumber);
      //console.log("-------------detail data ------------");
      //console.log(extract(JSON.parse(array[i]).data));
      obj = extract(JSON.parse(array[i]).data);
      obj.data = JSON.parse(array[i]).data;
      obj.sigfoxId = JSON.parse(array[i]).sigfoxId;
      obj.time = JSON.parse(array[i]).time;
      obj.type = JSON.parse(array[i]).type;
      obj.seqNumber = JSON.parse(array[i]).seqNumber;
      //console.log("sigfoxId:", obj.sigfoxId)
      //console.log("time:", obj.time)
      //console.log("type:", obj.type)
      //console.log("seqNumber:", obj.seqNumber)
      //console.log("Firmware version:", obj.firmware)
      //console.log("Transmit:", obj.transmit)
      //console.log("Control:", obj.control)
      //console.log("Temperature:", obj.temp)
      //console.log("Huminity:", obj.humi)
      //console.log("Min TVOC:", obj.minTVOC)
      //console.log("Max TVOC:", obj.maxTVOC)
      //console.log("Average TVOC:", obj.aveTVOC)

      write_es(obj);
  }
});

function write_es(obj) {
    //console.log("inside write_es function")
    //console.log(obj.data)
    client.index({  
        index: 'iotpoc',
        type: obj.type,
        body: {
          "sigfoxId": String(obj.sigfoxId),
          "datatime": new Date(Number(obj.time)*1000),
          "rawtime": Number(obj.time),
          "seqNumber": Number(obj.seqNumber),
          "Firmware": obj.firmware,
          "Transmit": Number(obj.transmit),
          "Control": Number(obj.control),
          "Temperature": Number(obj.temp),
          "Humidity": Number(obj.humi),
          "MinTVOC": Number(obj.minTVOC),
          "MaxTVOC": Number(obj.maxTVOC),
          "AverageTVOC": Number(obj.aveTVOC),
          "RawData": obj.data,
        }
    },function(err,resp,status) {
          console.log(resp.result);
    });
}

function extract(str) {
    var header = str.slice(0,2); // length=2
    var temp = (((parseInt(str.slice(2,6), 16))/10)-40); // length=4, convert into Celcius
    var humi = parseInt(str.slice(6,8), 16); // length=2
    var minTVOC = parseInt(str.slice(8,12), 16); //length=4
    var maxTVOC = parseInt(str.slice(12,16), 16); //length=4
    var aveTVOC = parseInt(str.slice(16,), 16); //length=4

    if (hex2bin(header).slice(5,6) == 1) {
        var transmit = 1;
    } else {
        var transmit = 0;
    }
    if (hex2bin(header).slice(4,5) == 1) {
        var control = 1;
    } else {
        var control = 0;
    }
    var firmware = parseInt(hex2bin(header).slice(0,4), 2);
    var obj = {
        firmware: firmware,
        transmit: transmit,
        control: control,
        temp: temp.toFixed(1),
        humi: humi,
        minTVOC: minTVOC,
        maxTVOC: maxTVOC,
        aveTVOC: aveTVOC
    };
    return (obj);
}

function hex2bin(hex){
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
}