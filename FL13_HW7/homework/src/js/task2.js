let randomNumber, startNumbers, startPrize, prize, totalPrize, attempt;
const START_NUM = 5;
const START_PRIZE = 100;
const INCREMENT = 1;
const MULT = 2;
const ADD = 5;
const COUNT_ATT = 3;
if (confirm('Do you want to play a game?')) {
    do {
        startNumbers = START_NUM;
        startPrize = START_PRIZE;
        totalPrize = 0;
        do {
            randomNumber = Math.floor(Math.random() * (startNumbers + 1));
            console.log(randomNumber);
            prize = startPrize;
            attempt = COUNT_ATT;
            while (attempt > 0 && randomNumber !==
                parseInt(prompt(`Choose a roulette pocket number from 0 to ${startNumbers}\n` +
                    `Attempt left: ${attempt}\nTotal prize: ${totalPrize}$\n` +
                    `Possible prize on current attempt: ${prize}$`))) {
                prize /= MULT;
                attempt--;
            }
            if (attempt === 0) {
                break;
            }
            totalPrize += prize;
            startPrize *= MULT;
            startNumbers += ADD;
        } while (confirm(`Congratulation, you won!\nYour prize is: ${totalPrize}$.\nDo you want to continue?`));
        alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
    } while (confirm('Do you want to play again'));
} else {
    alert('You did not become a billionaire, but can.');
}