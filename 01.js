// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.
// The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.
console.log("Project Euler - 01 - Find the sum of all the multiples of 3 or 5 below 1000.");

var multiples = [];
// console.log("Multiples array contains " + multiples.length + " items.")
for (i = 1; i <= 999; i++) {
    // iterate through numbers 1-1000 and see if they are divisible by either 3 or 5
    if ((i % 3 == 0) || (i % 5 == 0)) {
        // if they are, add them to the array
        multiples.push(i);
    }
}
console.log("Finished looping. Multiples array contains " + multiples.length + " items.")
//console.log(multiples);
var total = 0;
for (i = 0; i< multiples.length; i++) {
    total += multiples[i];
}
console.log("The total of all multiples of 3 or 5, between 1 and 1000, is: " + total);

// Here's another way to do it:
// http://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
var sum = multiples.reduce(add, 0);
function add(a, b) {
    return a + b;
}
console.log("Or, using the add function: " + sum);
