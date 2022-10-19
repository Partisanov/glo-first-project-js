'use strict';
//блок объявления переменных 
const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = '';
};
DomElement.prototype.createElement = function () {
    let element;
    if (this.selector[0] === '.') {
        element = document.createElement('div');
        element.className = this.selector.slice(1);
        this.text = `Это блок с классом ${this.selector}`;
    }
    if (this.selector[0] === '#') {
        element = document.createElement('p');
        element.id = this.selector.slice(1);
        this.text = `Это параграф с id ${this.selector}`;
    }
    element.style.cssText = `height : ${this.height}px;
                            width : ${this.width}px;
                            background : ${this.bg};
                            font-size: ${this.fontSize}px;`;

    element.textContent = this.text;
    return element;
};

//блок описания функций 


//блок функционала
const newDiv = new DomElement('.container', 600, 800, '#354D73', 32);
const newP = new DomElement('#paragraph', 60, 600, '#359973', 48);

document.body.append(newDiv.createElement());
document.body.append(newP.createElement());
// блок вывода в консоль
