function storeNames() {
    let names = [];
    for (let i in arguments) {
        names[i] = arguments[i];
    }
    return names;
}

storeNames();