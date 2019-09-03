const secretFraze = 'bitcoin';
const passedKeys = [];

window.addEventListener('keyup', (e) => {
passedKeys.push(e.key);
passedKeys.splice(-secretFraze.length-1, passedKeys.length - secretFraze.length);
console.log(passedKeys);

    if (passedKeys.join('').includes(secretFraze)) {
        console.log('GOGOGGO!');
        cornify_add();
    }
})

