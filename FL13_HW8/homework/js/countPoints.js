function isBigger(a, b) {
    return a > b;
}

function countPoints(arr) {
    let sum = 0;
    for (let i in arr) {
        if (isBigger(arr[i][0], arr[i][2])) {
            sum += 3;
        } else if (arr[i][0] === arr[i][2]) {
            sum += 1;
        } else {
            sum += 0;
        }
    }
    return sum;
}
countPoints();