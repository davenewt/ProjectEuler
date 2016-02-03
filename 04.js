/*
A palindromic number reads the same both ways.
The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two 3-digit numbers.
-----
Method ?
Test all aaa x bbb ? Too many results !!!
We want the largest, so start with the largest calculation
999 = 999 x 999
998 = 998 x 999, 998 x 998
997 = 997 x 999, 997 x 998, 997 x 997
996 = 996 x 999, 996 x 998, 996 x 997, 996 x 996
...and so on... so we decrease b until b = a, then decrease a and reset b to 999

This doesn't work. But if we order them in terms of a+b, it does:

Investigating 999x999 998001 --- 1998 1
Investigating 998x999 997002 --- 1997 1
Investigating 998x998 996004 --- 1996
Investigating 997x999 996003 --- 1996 2
Investigating 997x998 995006 --- 1995
Investigating 996x999 995004 --- 1995 2
Investigating 997x997 994009 --- 1994
Investigating 996x998 994008 --- 1994
Investigating 995x999 994005 --- 1994 3
Investigating 996x997 993012 --- 1993
Investigating 995x998 993010 --- 1993
Investigating 994x999 993006 --- 1993 3
Investigating 995x997 992015 --- 1992
Investigating 994x998 992012 --- 1992
Investigating 993x999 992007 --- 1992 3
Investigating 995x996 991020 --- 1991
Investigating 994x997 991018 --- 1991
Investigating 993x998 991014 --- 1991
Investigating 992x999 991008 --- 1991 4
Investigating 995x995 990025 --- 1990
Investigating 994x996 990024 --- 1990
Investigating 993x997 990021 --- 1990
Investigating 992x998 990016 --- 1990
Investigating 991x999 990009 --- 1990 5
Investigating 994x995 989030 --- 1989
Investigating 994x994 988036 --- 1988
Investigating 993x996 989028 --- 1989
Investigating 993x995 988035 --- 1988
Investigating 993x994 987042 --- 1987
Investigating 993x993 986049 --- 1986
Investigating 992x997 989024 --- 1989
Investigating 992x996 988032 --- 1988
Investigating 992x995 987040 --- 1987
Investigating 992x994 986048 --- 1986
Investigating 992x993 985056 --- 1985
Investigating 992x992 984064 --- 1984
Investigating 991x998 989018 --- 1989
Investigating 991x997 988027 --- 1988
Investigating 991x996 987036 --- 1987
Investigating 991x995 986045 --- 1986
Investigating 991x994 985054 --- 1985
Investigating 991x993 984063 --- 1984
Investigating 991x992 983072 --- 1983
Investigating 991x991 982081 --- 1982


Pass the result to another function that looks at the number of digits
For odd-length results, ignore middle digit as it can be anything
Compare first and last digit, then second and second-to-last digit (iterate depending on number of digits)
If it's palindromic, that's the answer (the first number we find will be the largest).
*/
'use strict'

var numMin = 100;
var numMax = 999;

var numA = numMax;
var numB = numMax; // set both sides of sum equation to max num first

var currentSum = 0;
var currentAdded = 0;
var numberOfDigits = 0;
var foundAPalindrome = false;

var palindromesFound = [];
var palindromesFoundSorted = [];

//findLargestPalindrome();
console.log('Looking for all palindromic numbers for sums of A and B between ' + numMin + ' and ' + numMax + '...');
findAllPalindromes();
console.log('DONE! Found ' + palindromesFound.length + ' palindromes!');
console.log('  First palindrome found = ' + palindromesFound[0]);
console.log('   Last palindrome found = ' + palindromesFound[palindromesFound.length - 1]);
// Need to sort the numbers BUT WATCH OUT!
// Normal .sort would sort by unicode point order
// var scores = [1, 10, 2, 21];
// scores.sort(); // [1, 10, 2, 21]
// 10 comes before 2 because '10' comes before '2' in Unicode code point order.
//
// Syntax: arr.sort([compareFunction])
// If compareFunction is supplied, the array elements are sorted according to the return value of the compare function.
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//
function compareNumbers(a, b) {
  return a - b;
}
palindromesFoundSorted = (palindromesFound.sort(compareNumbers));
console.log('LARGEST palindrome found = ' + palindromesFoundSorted[palindromesFoundSorted.length - 1]);

/* ---------------------------------------------------------------------------- */

function findAllPalindromes(){
    while (numB >= numA && numA >= numMin && numB >= numMin) { // first equation will be max x max
        currentSum = getSum(numA, numB);
        currentAdded = numA + numB;
        //console.log('Investigating ' + numA + 'x' + numB + ' ' + currentSum + ' --- ' + currentAdded);
        foundAPalindrome = isNumPalindromic(currentSum);
        //console.log('...answer: ' + foundAPalindrome);
        if (foundAPalindrome === true) {
            //break; // we found one, we can stop!
            //console.log('Found a palindrome: ' + currentSum);
            palindromesFound.push(currentSum);
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

// function findLargestPalindrome(){
//     while (foundAPalindrome === false){
//         while (numB >= numA && numA >= numMin && numB >= numMin) { // first equation will be max x max
//             currentSum = getSum(numA, numB);
//             currentAdded = numA + numB;
//             //console.log('Investigating ' + numA + 'x' + numB + ' ' + currentSum + ' --- ' + currentAdded);
//             foundAPalindrome = isNumPalindromic(currentSum);
//             //console.log('...answer: ' + foundAPalindrome);
//             if (foundAPalindrome === true) {
//                 //break; // we found one, we can stop!
//                 console.log('Found a palindrome: ' + currentSum);
//                 palindromesFound.push(currentSum);
//                 break;
//             } else {
//                 if (numB === numA) {
//                     numB = numMax; // reset numB to the max value
//                     numA--; // decrease numA by 1, and go around again...
//                     console.log('numA now ' + numA);
//                 } else {
//                     numB--;
//                 }
//             }
//         }
//         break;
//     }
// }

function getSum(a,b) {
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
