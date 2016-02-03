/*
A palindromic number reads the same both ways.
The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two 3-digit numbers.
*/
'use strict'

var numMin = 100;
var numMax = 999;

var numA = numMax;
var numB = numMax; // set both sides of sum equation to max num first

var currentProduct = 0;
var currentSum = 0;
var numberOfDigits = 0;
var foundAPalindrome = false;

var palindromesFound = [];
var palindromesFoundSorted = [];

console.log('Looking for palindromic products of A and B between ' + numMin + ' and ' + numMax + '...');
console.time('Find Palindromes');
findAllPalindromes();
console.log('DONE! Found ' + palindromesFound.length + ' palindromes!');
console.timeEnd('Find Palindromes');
console.log('  First palindrome found = ' + palindromesFound[0]);
console.log('   Last palindrome found = ' + palindromesFound[palindromesFound.length - 1]);

// Finally, we need to sort the numbers BUT WATCH OUT!
// Normal .sort would sort by unicode point order
// var scores = [1, 10, 2, 21];
// scores.sort(); // [1, 10, 2, 21]
// 10 comes before 2 because '10' comes before '2' in Unicode code point order.
//
// Syntax: arr.sort([compareFunction])
// If compareFunction is supplied, the array elements are sorted according to the return value of the compare function.
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

function compareNumbers(a, b) {
  return a - b;
}
palindromesFoundSorted = (palindromesFound.sort(compareNumbers));
console.log('LARGEST palindrome found = ' + palindromesFoundSorted[palindromesFoundSorted.length - 1]);

/* ---------------------------------------------------------------------------- */

function findAllPalindromes(){
    while (numB >= numA && numA >= numMin && numB >= numMin) { // first equation will be max x max
        currentProduct = getProduct(numA, numB);
        currentSum = numA + numB;
        //console.log('Investigating ' + numA + 'x' + numB + ' ' + currentProduct + ' --- ' + currentSum);
        foundAPalindrome = isNumPalindromic(currentProduct);
        //console.log('...answer: ' + foundAPalindrome);
        if (foundAPalindrome === true) {
            //break; // we found one, we can stop!
            //console.log('Found a palindrome: ' + currentProduct);
            palindromesFound.push(currentProduct);
        }
        if (numB === numA) {
            numB = numMax; // reset numB to the max value
            numA--; // decrease numA by 1, and go around again...
            //console.log('numA now ' + numA);
        } else {
            numB--;
        }
    }
}

function getProduct(a,b) {
    return a * b;
}

function isNumPalindromic(theNumber) {
    var theNumberString = theNumber.toString();
    numberOfDigits = theNumberString.length;
    //console.log(theNumber + ' has ' + numberOfDigits + ' digits.');
    // we need to iterate Math.floor(numberOfDigits/2) times,
    // so a 6-digit number we'll do 3 loops, and a 5-digit number will be 2 loops.
    var positionA = 0;
    var positionB = numberOfDigits - 1;
    var digitA = '';
    var digitB = '';
    var loopIndexA = 0;
    var timesToIterate = 0;
    timesToIterate = Math.floor(numberOfDigits/2);
    //console.log('We are going to iterate ' + timesToIterate + ' times.');
    var palindromicStatus = true; // start assuming it IS a palindrome, our first test will set to false if it isn't
    for (loopIndexA; loopIndexA < timesToIterate; loopIndexA++) {
        digitA = theNumberString.charAt(positionA);
        digitB = theNumberString.charAt(positionB);
        //console.log('Comparing ' + digitA + ' with ' + digitB + '...');
        if (digitA === digitB) {
            // palindromicStatus = true;
            // just leave it as true, so we do nothing here (we started off assuming true)
            // don't immediately exit, need ALL tests to match
            //console.log('Yes! Continuing to evaluate...');
        } else {
            // palindromicStatus = false;
            //console.log('No! No need to evaluate further.');
            return false; // immediately exit and return false
        }
        positionA++;
        positionB--;
    }
    //console.log('********************** WINNER! **********************');
    return true; // if we get this far, we've done all checks and it IS a palindrome.
}
