function findAverage(array) {
    // your code here
    if (array.length == 0) return 0;

    let sum = 0;
    let count = 0;


    array.forEach(element => {
        sum += element;
        count++;
    });

    let result = sum / count;

    return result;
}


console.log(findAverage([]));  