function assign(target, ...sourses) {
    sourses.forEach((el) => {
        for (let key in el) {
            if (el[key]) {
                target[key] = el[key];
            }
        }
    })
    return target;
}