function books() {
    let booksArr = [{
            name: 'Book1',
            autor: 'Lorein ipsum',
            image: 'https://picsum.photos/120/100',
            plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing ',
            id: '1'
        },
        {
            name: 'Book2',
            autor: 'Lorein ipsum',
            image: 'https://picsum.photos/120/100',
            plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing ',
            id: '2'
        },
        {
            name: 'Book3',
            autor: 'Lorein ipsum',
            image: 'https://picsum.photos/120/100',
            plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing .',
            id: '3'
        }
    ]
    if (!JSON.parse(localStorage.getItem('item'))) {
        localStorage.setItem('item', JSON.stringify(booksArr));
    }
}
books();