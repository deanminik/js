function squareDigits(num) {

    let strValue = [...num + ''];
    let myArray = [];
    let result = '';

    strValue.forEach(element => {
        myArray.push(element ** 2);
    });
    return result = Number(myArray.join(''));
}

console.log(squareDigits(9119));
