//QUESTION 20

Given an object or an array, return if it is empty.

An empty object contains no key-value pairs.
An empty array contains no elements.
You may assume the object or array is the output of JSON.parse.

 

    Example 1:

    Input: obj = {"x": 5, "y": 42}
    Output: false
    Explanation: The object has 2 key-value pairs so it is not empty.
    Example 2:

    Input: obj = {}
    Output: true
    Explanation: The object doesn't have any key-value pairs so it is empty.
    Example 3:

    Input: obj = [null, false, 0]
    Output: false
    Explanation: The array has 3 elements so it is not empty.
    

    Constraints:

    obj is a valid JSON object or array
    2 <= JSON.stringify(obj).length <= 105
    

    Can you solve it in O(1) time?

    
//ANSWER
function isEmpty(obj) {
    // Check if the obj is an array
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    
    // Check if the obj is an object
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).length === 0;
    }

    // Return false for any other data types (this shouldn't occur in the given context)
    return false;
}

// Example usage:
console.log(isEmpty({"x": 5, "y": 42})); // Output: false
console.log(isEmpty({}));                // Output: true
console.log(isEmpty([null, false, 0]));  // Output: false
