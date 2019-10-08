/**
 * 
 * @param {*} array The array to iterate.
 * @param {*} expression The expression to evaluate in each item of the array.
 */

function map(array, expression) { 	
    //console.log(arguments)
    if (!(array instanceof Array)) throw TypeError(array + ' is no an array');
    // if (!(expression instanceof Function)) throw TypeError(expression + ' is no a function')
    if (typeof expression !== 'function') throw TypeError(expression + ' is no a function')

    var newArray = []; 
	for (var i = 0; i < array.length; i++) 
        newArray [i] = expression(array[i], i , array);

    return newArray;
}