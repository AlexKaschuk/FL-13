let words = [
    "сова",
    "морква",
    "риба",
    "алгоритм",
    "молоко",
    "мама",
    "тато"
];

const root = document.getElementById('root');
const guessing = document.getElementById('guessing');
let form = document.createElement('form'),
    label = document.createElement('label'),
    input = document.createElement('input'),
    button = document.createElement('button');
button.innerHTML = "submit";
let Guessing_word = document.createElement('p');
Guessing_word.classList.add("hidden_word");

let word = words[Math.floor(Math.random() * words.length)],
    attempt = word.length * 2,
    remainingLetters = word.length,
    answerArray = word.split("").map(x => x = "_");

let CreateForm = (root) => {
    label.innerHTML = "enter the letter and push the button";
    form.appendChild(label).appendChild(input);
    form.appendChild(button);
    root.appendChild(form);
}

CreateForm(root);

let ShowHidenWord = (root, answerArray) => {
    Guessing_word.innerHTML = "";
    answerArray.forEach(element => {
        Guessing_word.innerHTML += element + " ";
    });
    root.appendChild(Guessing_word);
}
ShowHidenWord(guessing, answerArray);


let showgame = (e) => {
    e.preventDefault();
    let letter;
    if (attempt == 0) {
        input.value = "Ви не вгадали слово та програли";
        input.disabled = true;
    } else if (input.value != "") {
        letter = input.value;
        input.value = "";
        for (var j = 0; j < word.length; j++) {
            if (word[j] === letter && answerArray[j] == "_") {
                answerArray[j] = letter;
                remainingLetters--;
                ShowHidenWord(guessing, answerArray);
            } else if (answerArray[j] == letter) {
                alert("вказану букву вже вводили");
            }
        }
        attempt--;
        if (remainingLetters != 0) {
            alert(`залишилось ${attempt} спроб`);
        }
    }
    if (remainingLetters == 0) {
        alert(`${answerArray.join(" ")} \n
           "Вітаю! Ви відгадали слово " ${word}`);
        if (confirm("зіграти ще?")) {
            location.reload();
        }
    }

}

button.onclick = showgame;