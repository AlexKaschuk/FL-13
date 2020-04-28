function letterCount(str, key) {
    let counter = 0;
    for (let i in str) {
        str[i] === key ? counter++ : 0;
    }
    return counter;
}
letterCount();