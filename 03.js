'use strict'

// Saved online as:
// http://codepen.io/anon/pen/adjPNB?editors=0012#0

// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600,851,475,143 ?

var bigNum = 13195; // we know the answer to this should be 5,7,13,29
var bigNum = 600851475143;
var divisors = [];
var primeDivisors = [];

// According to https://en.wikipedia.org/wiki/Trial_division
// we only need to test would-be divisors that are <= the sqrt of the big number!
// Testing ALL 600-billion numbers takes a few minutes to calculate as far as
// 8,462,696,833 - then takes even longer, so isn't efficient?!

var sqrtOfBigNum = Math.floor(Math.sqrt(bigNum));
console.log("Testing up to the square root of " + bigNum + " (" + sqrtOfBigNum + ")");

//console.time('Finding Divisors');
var loopIndexA = 2; // start at 2 as we don't want to include 1
for (loopIndexA; loopIndexA <= sqrtOfBigNum; loopIndexA++) {
    if ((bigNum % loopIndexA) === 0) {
        // console.log(i + " is a divisor!");
        divisors.push(loopIndexA);
    }
}
var divisorsStr = divisors.join([","]);
console.log("All divisors are: " + divisorsStr);
//console.timeEnd('Finding Divisors');

//console.time('Finding Primes');
var loopIndexB = 0;
for (loopIndexB; loopIndexB < divisors.length; loopIndexB++) {
    //console.log('Testing to see if ' + divisors[loopIndexB] + ' is a prime number...')
    if (isAPrimeNumber(divisors[loopIndexB])) {
        primeDivisors.push(divisors[loopIndexB]);
    }
}
var primeDivisorsStr = primeDivisors.join([","]);
console.log("Of which, primes: " + primeDivisorsStr);
//console.timeEnd('Finding Primes');

function isAPrimeNumber(testNumber) {
    var loopIndexC = 2;
    for (loopIndexC; loopIndexC < testNumber; loopIndexC++) {
    // careful not to use <= above, otherwise any number will be divided by itself and evaluated as non-prime!
        //console.log(testNumber + ' divided by ' + loopIndexC + '...');
        if ((testNumber % loopIndexC) === 0) {
            //console.log(testNumber + ' IS NOT a prime number');
            return false;
        }
    }
    // if we end up here, nothing has divided into it, so it must be a prime number
    //console.log(testNumber + ' IS a prime number.');
    return true;
}

var largestPrimeDivisor = 0;
largestPrimeDivisor = getMaxOfArray(primeDivisors);
// Following function to find max number in an array, from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
function getMaxOfArray(theArray) {
  return Math.max.apply(null, theArray);
}
console.log('The largest prime divisor of ' + bigNum + ' is ' + largestPrimeDivisor );
