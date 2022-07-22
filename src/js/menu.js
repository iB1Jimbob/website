class Menu {
    element;
    constructor() {
        this.element = document.querySelector('ul.rcmenu');
    }
    hide() {
        this.element.style.display = 'none';
    }
    show(x, y) {
        this.element.style.display = 'flex';
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
}
const menu = new Menu();
document.oncontextmenu = (e) => {
    e.preventDefault();
    menu.element.style.display === 'flex' ? menu.hide() : menu.show(e.pageX, e.pageY);
};
