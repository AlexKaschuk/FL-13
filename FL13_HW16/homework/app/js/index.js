const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

const GETCODE = 200;
const POSTCODE = 201;
const PUTCODE = 204;
const INDEX = 2;
const header = document.createElement('h2');
header.innerHTML = 'Manage User App';
appContainer.appendChild(header);
const form = document.createElement('form');
form.setAttribute('name', 'inputForm');
const inputForm =
    '<input id="name_input" type="text" placeholder="User" >' +
    '<input id="username_input" type="text" placeholder="User name">' +
    '<button id="Add">Add new User</button>';
form.innerHTML = inputForm;
appContainer.appendChild(form);
const Name = document.getElementById('name_input');
const fullName = document.getElementById('username_input');
const addButton = document.getElementById('Add');
const deleteBtn = document.getElementsByClassName('delete_btn');
const updateBtn = document.getElementsByClassName('update_btn')
const Users = document.createElement('div');
Users.setAttribute('class', 'users');
appContainer.appendChild(Users);
const load = document.createElement('p');
load.setAttribute('id', 'load');
load.innerHTML = 'Loading....';
appContainer.appendChild(load);

let data;
const getData = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl + '/users');
    load.style.display = 'block';
    xhr.send();
    xhr.onload = () => {
        if (xhr.status !== GETCODE) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else if (xhr.status === 'pending') {
            alert('pending')
        } else {
            data = JSON.parse(xhr.response);
            load.style.display = 'none';
            initData(data);
        }
    }
}
window.onload = getData;

function initData(data) {
    let usersForm = '';
    data.forEach((el) => {
        usersForm += '<form name ="input" >' +
            `<input class="user_id" type="text" value =
            '${el.id}'>` + `<input class="user_name_input" 
            type="text" value ='${el.name}'>` + `<input class="user_fullName_input" 
            type="text" value='${el.username}'>` +
            '<button class="update_btn">Update</button>' +
            '<button class="delete_btn">Delete</button>' +
            '</form>';
    });
    Users.innerHTML = usersForm;
}

addButton.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl + '/users', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const users = JSON.stringify({
        name: `${Name.value}`,
        username: `${fullName.value}`
    })
    addButton.disabled = true;
    xhr.send(users);
    xhr.onload = () => {
        if (xhr.status !== POSTCODE) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            getData();
            addButton.disabled = false;
        }
    }
}

function update(e) {
    let id = e.target.parentElement.firstChild.value;
    let name = e.target.parentElement.children[1].value;
    let fullName = e.target.parentElement.children[INDEX].value;
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', baseUrl + `/users/${id}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const users = JSON.stringify({
        name: `${name}`,
        username: `${fullName}`
    });
    xhr.send(users);
    xhr.onload = () => {
        if (xhr.status !== PUTCODE) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            getData();
            e.target.disabled = false;
        }
    }
}

function deleteUser(e) {
    let id = e.target.parentElement.firstChild.value;
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', baseUrl + `/users/${id}`, true);
    xhr.setRequestHeader('Authorization', 'admin');
    xhr.onload = () => {
        if (xhr.status !== PUTCODE) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            getData();
            e.target.disabled = false;
        }
    }
    xhr.send(null);
}

Users.onclick = (e) => {
    if (e.target.className === 'update_btn') {
        e.target.disabled = true;
        e.preventDefault();
        update(e);
    } else if (e.target.className === 'delete_btn') {
        e.target.disabled = true;
        e.preventDefault();
        deleteUser(e);
        getData();
    }
}
