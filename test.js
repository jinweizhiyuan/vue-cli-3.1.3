// console.log(1);
// setImmediate(function () {
//   console.log(JSON.stringify(arguments))
// }, 1,2,3);
// console.log(2);

// const util = require('util')
// const setImmediatePromise = util.promisify(setImmediate)

// setImmediatePromise([1, 2, 3], 'ha').then(function(){
//   console.log(JSON.stringify(arguments));
// })

// const setTimeoutPromise = util.promisify(setTimeout)
// setTimeoutPromise(2000, 'arg').then(function () {
//   console.log(arguments);
// })

// var out = setTimeout(function(){
//   console.log(JSON.stringify(arguments))
// }, 2000, 1, 2)

// clearTimeout(out)

const url = require('url')
var u = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash')
console.log(u)
var u2 = url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');