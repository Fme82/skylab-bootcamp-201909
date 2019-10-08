console.log('DEMO unshift');

var array = [1, 2, 3, 4];

console.log('CASE should unshift a single item');
console.log(unshift(array, 0)); // 5
console.log(array); // [0, 1, 2, 3, 4,]

console.log('CASE should unshift a multiple items');
console.log(unshift(array, 'a', 'b', 'c')); // 7
console.log(array); // [1, 2, 3, 'a', 'b', 'c']

console.log('CASE should throw a type error when there are no parameters');
try {
    unshift();
} catch(error) {
    console.log(error.message);
    // console.log('type error: ' (error instanceof TypeError))
}

console.log('CASE should throw type error when first paramter is not an a array');
try {
    unshift('22');
} catch(error) {
    console.log(error.message);
    // console.log('type error: ' (error instanceof TypeError))
}

