import lodash from 'lodash';
import './style.css';
import printMe from './print.js';

function component() {
    const element = document.createElement('div');

    element.innerHTML = lodash.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!!!!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());