
function isPrime(num) {
    //TODO
    // let count = 0;

    // for (let a = 1; a <= num; a++) {
    //     for (let b = 1; b <= num; b++) {
    //         if (a * b === num) {
    //             count++;
    //         }

    //     }

    // }
    // return (count > 2 || num === 1 || num <= 0) ? false : true;

    if (num <= 1) return false; // Handle non-positive cases first

    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }

    return true;
}

console.log(isPrime(75));