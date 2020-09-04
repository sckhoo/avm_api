var d = new Date(1598953867876);
//var d = Date.now();


let [day, month, year]    = ( d.toLocaleDateString().split("/"));
let [hour, minute, second] = ( d.toLocaleTimeString().slice(0,7).split(":"));

console.log(year, month, day);
console.log(d.toLocaleTimeString());
console.log(hour, minute, second);

console.log(d);

console.log("Date now", Date.now());