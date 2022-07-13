let count = document.querySelector('.slider').children.length - 2;
let current = 0;

document.querySelectorAll('.slider .btns').forEach(button => {
    button.addEventListener('click', event => {
        let elem = event.target;
        if (!elem.classList.contains('active')) return;
        
        if (elem.id === 'prev') {
            current--;
        } else if (elem.id === 'next') {
            current++;
        }

        if (current < 1) {
            document.querySelector('#prev').classList.remove('active');
        } else if (current > count - 1) {
            document.querySelector('#next').classList.remove('active');
        } else {
            document.querySelector('#prev').classList.add('active');
            document.querySelector('#next').classList.add('active');
        }

        document.querySelectorAll('.slider .item').forEach(div => {
            let transform = current * -100;
            div.style.transform = `translateX(${transform}%)`;
        });
    });
});