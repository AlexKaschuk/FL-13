function positiveSum(arr) {
    let sum = 0;
    for (let i in arr) {
        sum += arr[i] > 0 ? arr[i] : 0;
    }
    return sum;
}

positiveSum();