//QUESTION 19
        Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise. All the promises should be executed in parallel.

        promise resolves:

        When all the promises returned from functions were resolved successfully in parallel. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions. The promise should resolve when all the asynchronous functions in the array have completed execution in parallel.
        promise rejects:

        When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
        Please solve it without using the built-in Promise.all function.

        

            Example 1:

                Input: functions = [
                () => new Promise(resolve => setTimeout(() => resolve(5), 200))
                ]
                Output: {"t": 200, "resolved": [5]}
                Explanation: 
                promiseAll(functions).then(console.log); // [5]

                The single function was resolved at 200ms with a value of 5.
            Example 2:

                    Input: functions = [
                        () => new Promise(resolve => setTimeout(() => resolve(1), 200)), 
                        () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
                    ]
                    Output: {"t": 100, "rejected": "Error"}
                    Explanation: Since one of the promises rejected, the returned promise also rejected with the same error at the same time.
            Example 3:

                    Input: functions = [
                        () => new Promise(resolve => setTimeout(() => resolve(4), 50)), 
                        () => new Promise(resolve => setTimeout(() => resolve(10), 150)), 
                        () => new Promise(resolve => setTimeout(() => resolve(16), 100))
                    ]
                    Output: {"t": 150, "resolved": [4, 10, 16]}
                    Explanation: All the promises resolved with a value. The returned promise resolved when the last promise resolved.
                    

                    Constraints:

                    functions is an array of functions that returns promises
                    1 <= functions.length <= 10


//ANSWER

function promiseAll(functions) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completed = 0;
      let hasRejected = false;  // To track if any promise was rejected
  
      // Iterate over all functions
      functions.forEach((fn, index) => {
        fn()  // Call the function to return a promise
          .then(result => {
            if (!hasRejected) {
              results[index] = result;  // Store result in the correct order
              completed += 1;
              
              // If all promises have been resolved
              if (completed === functions.length) {
                resolve(results);
              }
            }
          })
          .catch(error => {
            if (!hasRejected) {
              hasRejected = true;  // Prevent further execution after rejection
              reject(error);  // Reject with the first error encountered
            }
          });
      });
    });
  }
  
  // Example 1: Testing with a single function that resolves after 200ms
  promiseAll([
    () => new Promise(resolve => setTimeout(() => resolve(5), 200))
  ]).then(res => console.log({"t": 200, "resolved": res}));
  
  // Example 2: Testing with one function that rejects
  promiseAll([
    () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
  ]).catch(err => console.log({"t": 100, "rejected": err}));
  
  // Example 3: Testing with multiple functions resolving at different times
  promiseAll([
    () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
    () => new Promise(resolve => setTimeout(() => resolve(16), 100))
  ]).then(res => console.log({"t": 150, "resolved": res}));
  
