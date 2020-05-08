const data = [{
        'folder': true,
        'title': 'Pictures',
        'children': [{
                'title': 'logo.png'
            },
            {
                'folder': true,
                'title': 'Vacations',
                'children': [{
                    'title': 'spain.jpeg'
                }]
            }
        ]
    },
    {
        'folder': true,
        'title': 'Desktop',
        'children': [{
            'folder': true,
            'title': 'screenshots',
            'children': null
        }]
    },
    {
        'folder': true,
        'title': 'Downloads',
        'children': [{
                'folder': true,
                'title': 'JS',
                'children': null
            },
            {
                'title': 'nvm-setup.exe'
            },
            {
                'title': 'node.exe'
            }
        ]
    },
    {
        'title': 'credentials.txt'
    }
];

const rootNode = document.getElementById('root');

function display(data) {
    let folders = '';
    let closedIcon = "<i class='material-icons closed'></i>";
    let fileIcon = "<i class='material-icons'>insert_drive_file</i>";
    let wrapper = "<ul class='folder-wrapper'>";
    data.forEach(element => {
        if (element['folder']) {
            folders += '<div class="folder-container">' + '<li class="folder-item">' + closedIcon + '<p>' +
                element['title'] + '</p>' + '</li>' + wrapper;
        }
        if (element['title'] && !element['folder']) {
            folders += '<li class="file-item">' + fileIcon + '<p>' +
                element['title'] + '</p>' + '</li>';
        }
        if (element['children']) {
            folders += display(element['children']);
            folders += '</div></li>';
        }
        if (element['children'] === null) {
            folders += '<p><i>Folder is empty</i></p>' + '</div>';
        }

    });
    return folders;
}
rootNode.innerHTML = display(data);
window.onclick = hideContextMenu;

let conteiners = document.getElementsByClassName('folder-item');
let items;
for (items = 0; items < conteiners.length; items++) {
    conteiners[items].onclick = function() {
        this.parentElement.querySelector('.folder-wrapper').classList.toggle('active');
        this.parentElement.querySelector('.material-icons').classList.toggle('opened');
    };
}


let menu = document.createElement('ul');
menu.classList.add('menu');
menu.innerHTML = "<li class='menu_item'>Rename</li><li class='menu_item'>Delete item</li>";
rootNode.appendChild(menu);
let form = document.createElement('input');
form.setAttribute('type', 'text');
form.setAttribute('textarea', 'text');

rootNode.oncontextmenu = function(event) {
    let change = event.target;
    menu.classList.remove('blocked');
    menu.style.display = 'block';
    menu.style.left = event.clientX + 'px';
    menu.style.top = event.clientY + 'px';
    if (change.id === 'root') {
        menu.classList.add('blocked');
    }
    menu.firstElementChild.onclick = () => {
        form.onclick = (e) => {
            e.stopPropagation();
        }
        if (change.tagName === 'P' && change.id !== 'root') {
            const text = change.innerHTML;
            let dot;
            for (let i in text) {
                if (text[i] === '.') {
                    dot = i;
                    change.contentEditable = true;
                    document.onclick = (e) => {
                        if (e.target.className !== 'menu_item' &&
                            e.target.className !== 'menu' && e.target !== change) {
                            change.contentEditable = false;
                        }
                    }
                    document.oncontextmenu = () => {
                        change.contentEditable = false;
                    }
                }
            }
            if (!dot) {
                change.innerHTML = '';
                change.appendChild(form);
                form.value = text;
            }
            getSelectedText(change, dot);
            if (form.value !== '') {
                document.onclick = saveChanges;
                document.oncontextmenu = saveChanges;
            }
        }
    }
    menu.lastElementChild.onclick = () => {
        if (change.parentElement.tagName === 'LI' && change.parentElement.className === 'file-item') {
            change.parentElement.remove();

        } else if (change.id !== 'root' && change.className !== 'file-item') {
            let childrens = change.parentElement.parentElement.children[1];
            childrens.remove();
            change.parentElement.remove();
        }
    }
    return false;
}

function hideContextMenu() {
    menu.style.display = 'none';
}

function saveChanges(event) {
    let changed = form.parentElement;
    if (event.target.className !== 'menu_item' &&
        event.target.className !== 'menu' &&
        event.target.tagName !== 'INPUT' && changed) {
        changed.innerHTML = form.value;
    }
}

function getSelectedText(item, dot) {
    if (window.getSelection()) {
        let range = new Range();
        if (dot) {
            range.setStart(item.firstChild, 0);
            range.setEnd(item.firstChild, dot);
        } else {
            range.setStart(item, 0);
            range.setEnd(item, 1);
        }
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range);
    }
}