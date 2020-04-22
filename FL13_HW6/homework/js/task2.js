let word = prompt('inputs check word');
let half = 2;
if (word.length === 0 || word.trim() === '') {
    alert('Invalid value')
} else {
    if (
        Math.round(word.length) % half === 0) {
        alert('middle character of this word - ' + `${word[word.length / half - 1]}` + `${word[word.length / half]}`)
    } else {
        alert('middle character of this word - ' + `${word[Math.round(word.length / half - 1)]}`)
    }
}