class Loader {
    svgData;
    constructor() {
        this.svgData = `<svg height="100" width="100" stroke="#2A4A73" stroke-width="5" class="loader"><defs><style>@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@700&display=swap');</style></defs><text style="font-family: 'Ubuntu Mono'; font-weight: normal; font-style: normal" x="25" y="90" fill="none" font-size="100">J</text></svg>`;
    }
    load() {
        const background = document.createElement('div');
        background.classList.add('loaderBg');
        background.innerHTML = this.svgData;
        document.body.appendChild(background);
        document.body.style.overflowY = 'hidden';
    }
    stopLoading() {
        document.body.style.overflowY = 'scroll';
        document.querySelector('.loaderBg').remove();
    }
}
class Contact {
    name;
    email;
    message;
    feedbackElement;
    emailRegex;
    loader;
    constructor() {
        this.name = document.querySelector('#contact .content .form #nameInput');
        this.email = document.querySelector('#contact .content .form #emailInput');
        this.message = document.querySelector('#contact .content .form #messageInput');
        this.feedbackElement = document.querySelector('#contact .content .form .feedback');
        this.emailRegex = /^\S+@\S+\.\S+$/;
        this.loader = new Loader();
    }
    send() {
        this.loader.load();
        if (!this.name.value || !this.email.value || !this.message.value)
            return this.feedback('Please fill out all fields.', 'error');
        if (!this.emailRegex.test(this.email.value))
            return this.feedback('Please provide a valid E-mail adress.', 'error');
        fetch('https://jimiswebsite-api.herokuapp.com/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: this.name.value,
                email: this.email.value,
                message: this.message.value
            })
        }).then(request => request.json()).then(response => {
            if (response.success) {
                this.name.value = '';
                this.email.value = '';
                this.message.value = '';
                this.feedback('Your contact form has been sent! I will get back to you soon.', 'success');
            }
            else {
                this.feedback('There was an unknown error. Please try again or contact me otherwise.', 'error');
            }
        });
    }
    feedback(message, type) {
        const feedback = document.createElement('span');
        feedback.classList.add(type);
        feedback.innerText = message;
        this.feedbackElement.innerHTML = feedback.outerHTML;
        this.loader.stopLoading();
    }
}
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.content');
    for (const element of elements) {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.remove('hidden');
        }
        else {
            element.classList.add('hidden');
        }
    }
});
function getDiscord() {
    loader.load();
    const discordTagElement = document.querySelector('.discord-tag');
    document.querySelector('#landingpage .msg h2').addEventListener('click', () => {
        discordTagElement.classList.contains('visible') ? discordTagElement.classList.remove('visible') : discordTagElement.classList.add('visible');
    });
    fetch('https://jimiswebsite-api.herokuapp.com/discord', {
        method: 'GET'
    }).then(req => req.json()).then(data => {
        discordTagElement.innerText = `#${data.user.discriminator}`;
        loader.stopLoading();
    });
}
const loader = new Loader();
getDiscord();
