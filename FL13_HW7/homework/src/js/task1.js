const LOGINMIN = 4;
const EVENINGHRS = 20;
let password;
let Hrs = new Date().getHours();

let login = prompt('enter login');
let Users = {
    'User': 'UserPass',
    'Admin': 'RootPass'
}

if (login === null || login.length === 0) {
    alert('Canseled');
} else if (login.length < LOGINMIN) {
    alert('I don"t know any users having name length less than 4 symbols');
} else if (!Users[login]) {
    alert('I don’t know you');
} else if (Users[login]) {
    password = prompt('enter password');
    if (password === null || password.length === 0) {
        alert('Canseled');
    } else if (Users[login] !== password) {
        alert('Wrong password');
    } else if (Hrs < EVENINGHRS) {
        alert(`Good day, dear ${login}`);
    } else {
        alert(`Good evening, dear ${login}`);
    }
}