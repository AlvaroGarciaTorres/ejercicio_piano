import lodash from 'lodash';
import './style.css';

function component() {
    const element = document.createElement('div');

    element.innerHTML = lodash.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    return element;
}

document.body.appendChild(component());