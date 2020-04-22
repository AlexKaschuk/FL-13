const MaxPersent = 100;
let sum = parseFloat(prompt('inputs check number'));
let persent, x;
if (!sum || sum < 0) {
    alert('Invalid input data');
} else {
    persent = prompt('inputs tip percentage');
    if (!persent || persent < 0 || persent > MaxPersent) {
        alert('Invalid input data');
    } else {
        sum = Math.round(sum * MaxPersent) / MaxPersent;
        x = Math.round(sum * persent) / MaxPersent;
        alert(`check number: ${sum}\ntip: ${persent} %\ntip amount: ${x}\ntotal summ:  ${sum + x}  ye`);
    }
}