const root = document.getElementById('root'),
    booksList = document.createElement('div'),
    bookPreview = document.createElement('div'),
    addButton = document.createElement('button'),
    saveButton = document.createElement('button'),
    canselButton = document.createElement('button'),
    bookPrew = document.createElement('div'),
    editForm = document.createElement('form'),
    addForm = document.createElement('form'),
    formatBooks = document.createElement('div'),
    reg1 = /.img/,
    reg2 = /.png/,
    reg3 = /.jpg/,
    numer = 1e8,
    score = 16,
    SEARCHNUM = 4,
    generateId = () => {
        return `id${Math.round(Math.random()*numer).toString(score)}`
    },
    baseForm = '<p>Book name</p><input class="book_name" type="text" placeholder="">' + '</br>' +
    '<p>Autor name</p><input class="autor_edit_name" type="text" placeholder="">' + '</br>' +
    '<p>image url</p> <input class="img_url" type="text" placeholder="">' + '</br>' +
    '<p>book plot</p><textarea class="book_plot" rows="30" cols="77" name="text" placeholder="">';

bookPrew.classList.add('book_rew');
booksList.classList.add('book_list');
bookPreview.classList.add('book_review');
root.appendChild(booksList);
root.appendChild(bookPreview);
addButton.classList.add('add_button');
addButton.innerHTML = 'add new book';
saveButton.classList.add('save_button');
saveButton.innerHTML = 'save';
canselButton.classList.add('cansel_button');
canselButton.innerHTML = 'cansel';
editForm.innerHTML = '<h3>Your book</h3>' + baseForm;
formatBooks.appendChild(editForm);
formatBooks.appendChild(addForm);
formatBooks.appendChild(canselButton);
formatBooks.appendChild(saveButton);
bookPreview.appendChild(formatBooks);
formatBooks.classList.add('hidden');
bookPrew.classList.add('hidden');
bookPrew.innerHTML = `<img class="prew_Img">` +
    '<h3 class="book_title_rew"></h3>' + '<p class = "autor"></p>' + '<p class="plot"></p>';
bookPreview.appendChild(bookPrew);
let title = document.querySelector('.book_title_rew'),
    autor = document.querySelector('.autor'),
    prewImg = document.querySelector('.prew_Img'),
    plot = document.querySelector('.plot');

let booksArr = JSON.parse(localStorage.getItem('item')) || [];
let editButton,
    myBook,
    myBookID,
    bookName = document.querySelector('.book_name'),
    autorname = document.querySelector('.autor_edit_name'),
    imageUrl = document.querySelector('.img_url'),
    bookPlot = document.querySelector('.book_plot');

function init() {
    booksList.innerHTML = '';
    booksArr.forEach((item) => {
        const book = document.createElement('div');
        book.classList.add('book');
        book.innerHTML = '<h3 class="book_title">' + `${item.name}` +
            '</h3>' + '<button class="edit_button" onclick=``>Edit</button>';
        book.setAttribute('id', `${item.id}`);
        booksList.appendChild(book);
    });
    booksList.appendChild(addButton);
}

booksList.onclick = getId;

function getId(e) {
    e.preventDefault();
    if (e.target.className === 'add_button') {
        window.history.pushState('', '', '?#add');
        addBook();
        getLocation(e);
    } else if (e.target.className !== 'edit_button' &&
        e.target.className === 'book' &&
        e.target.className !== 'add_button') {
        myBookID = e.target.getAttribute('id');
        window.history.pushState('', '', `?id=${myBookID}#preview`);
        previweBook(myBookID);
        getLocation(e);
    } else if (e.target.className !== 'book' &&
        e.target.className !== 'edit_button' &&
        e.target.parentElement.getAttribute('id') !== 'root') {
        myBookID = e.target.parentElement.getAttribute('id');
        window.history.pushState('', '', `?id=${myBookID}#preview`);
        previweBook(myBookID);
        getLocation(e);
    } else if (e.target.className === 'edit_button') {
        editButton = e.target;
        myBookID = e.target.parentElement.getAttribute('id');
        window.history.pushState('', '', `?id=${myBookID}#edit`);
        editBook(myBookID);
        getLocation(e);
    }
}

function previweBook(myBookID) {
    myBook = booksArr.filter((i) => {
        return i.id === myBookID ? i : 0;
    });
    if (formatBooks.className !== 'hidden') {
        formatBooks.classList.add('hidden');
    }
    bookPrew.classList.remove('hidden');
    if (bookPrew.innerHTML) {
        title.innerHTML = `${myBook[0].name}`;
        autor.innerHTML = `${myBook[0].autor}`;
        prewImg.setAttribute('src', `${myBook[0].image}`);
        plot.innerHTML = `${myBook[0].plot}`;
    }

}

function editBook(myBookID) {
    if (bookPrew.className !== 'hidden') {
        bookPrew.classList.add('hidden');
    }
    if (formatBooks.className !== 'hidden') {
        formatBooks.classList.add('hidden');
    }
    myBook = booksArr.filter((i) => {
        return i.id === myBookID ? i : 0;
    });
    formatBooks.classList.remove('hidden');
    bookName.value = `${myBook[0].name}`;
    autorname.value = `${myBook[0].autor}`;
    imageUrl.value = `${myBook[0].image}`;
    bookPlot.value = `${myBook[0].plot}`;
    saveButton.onclick = save;

}

function addBook() {
    if (bookPrew.className !== 'hidden') {
        bookPrew.classList.add('hidden');
    }
    if (bookName.value || autorname.value || imageUrl.value || bookPlot.value) {
        bookName.value = '';
        autorname.value = '';
        imageUrl.value = '';
        bookPlot.value = '';
    }
    formatBooks.classList.remove('hidden');
    saveButton.onclick = save;
}

canselButton.onclick = () => {
    if (confirm('Discard changes?”')) {
        bookPrew.classList.add('hidden');
        formatBooks.classList.add('hidden');
        location.search = '';
        location.hash = '';

    }
}

function save() {
    if (reg1.test(imageUrl.value) || reg2.test(imageUrl.value) || reg3.test(imageUrl.value)) {
        if (location.hash === '#edit') {
            myBook[0].name = bookName.value;
            myBook[0].autor = autorname.value;
            myBook[0].image = imageUrl.value;
            myBook[0].plot = bookPlot.value;
        } else if (location.hash === '#add') {
            console.log(booksArr);
            booksArr.push({
                name: `${bookName.value}`,
                autor: `${autorname.value}`,
                image: `${imageUrl.value}`,
                plot: `${bookPlot.value}`,
                id: `${generateId()}`
            });
        }
        formatBooks.classList.add('hidden');
        location.hash = '';
    } else {
        alert('false img URL');
    }
    localStorage.setItem('item', JSON.stringify(booksArr));
    init();
}
init();

window.onload = (e) => {
    getLocation(e);
};

function getLocation(e) {
    e.preventDefault();
    let search = location.search.slice(SEARCHNUM);
    let hash = location.hash.slice(1);
    if (!search && !hash) {
        bookPrew.classList.add('hidden');
        formatBooks.classList.add('hidden');
    } else if (search && hash === 'preview') {
        previweBook(search);
    } else if (search && hash === 'edit') {
        editBook(search);
    } else if (!search && hash === 'add') {
        addBook();
    }
}

window.addEventListener('popstate', (e) => {
    getLocation(e);
})