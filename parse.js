// {"data":"10028337002a006f0048","sigfoxId":"41762D","time":"1598945628","type":"IAQ","seqNumber":"328"}

var str = "1002964c008d009e0095";
var sln = str.length;

//function fToC(fahrenheit) 
//{
//  var fTemp = fahrenheit;
//  var fToCel = (fTemp - 32) * 5 / 9;
//  return fToCel;
//} 

function hex2bin(hex){
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
}

var header = str.slice(0,2); // length=2
var temp = str.slice(2,6); // length=4
var humi = str.slice(6,8); // length=2
var minTVOC = str.slice(8,12); //length=4
var maxTVOC = str.slice(12,16); //length=4
var aveTVOC = str.slice(16,); //length=4

console.log("----------- start -------------------")

console.log("input length of", str, "is", sln);
if (hex2bin(header).slice(5,6) == 1) {
    console.log("Transmit power is True")
} else {
    console.log("Transmit power is False")
}
if (hex2bin(header).slice(4,5) == 1) {
    console.log("Power control is On")
} else {
    console.log("Power control is Off")
}
console.log("Firmware version", parseInt(hex2bin(header).slice(0,4), 2));
console.log("temperature decimal in celsius", (((parseInt(temp, 16))/10)-40));
console.log("humidity decimal", parseInt(humi, 16), "%");
console.log("Min TVOC decimal", parseInt(minTVOC, 16), "ppb");
console.log("Max TVOC decimal", parseInt(maxTVOC, 16), "ppb");
console.log("Average TVOC decimal", parseInt(aveTVOC, 16), "ppb");

console.log("----------- end -------------------")

