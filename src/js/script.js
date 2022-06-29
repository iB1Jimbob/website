var Loader = /** @class */ (function () {
    function Loader() {
        this.svgData = "<svg height=\"100\" width=\"100\" stroke=\"#2A4A73\" stroke-width=\"5\" class=\"loader\"><defs><style>@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@700&display=swap');</style></defs><text style=\"font-family: 'Ubuntu Mono'; font-weight: normal; font-style: normal\" x=\"25\" y=\"90\" fill=\"none\" font-size=\"100\">J</text></svg>";
    }
    Loader.prototype.load = function () {
        var background = document.createElement('div');
        background.classList.add('loaderBg');
        background.innerHTML = this.svgData;
        document.body.appendChild(background);
        document.body.style.overflowY = 'hidden';
    };
    Loader.prototype.stopLoading = function () {
        document.body.style.overflowY = 'scroll';
        document.querySelector('.loaderBg').remove();
    };
    return Loader;
}());
var Contact = /** @class */ (function () {
    function Contact() {
        this.name = document.querySelector('#contact .content .form #nameInput');
        this.email = document.querySelector('#contact .content .form #emailInput');
        this.message = document.querySelector('#contact .content .form #messageInput');
        this.feedbackElement = document.querySelector('#contact .content .form .feedback');
        this.emailRegex = /^\S+@\S+\.\S+$/;
    }
    Contact.prototype.send = function () {
        var _this = this;
        loader.load();
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
        }).then(function (request) { return request.json(); }).then(function (response) {
            if (response.success) {
                _this.name.value = '';
                _this.email.value = '';
                _this.message.value = '';
                _this.feedback('Your contact form has been sent! I will get back to you soon.', 'success');
            }
            else {
                _this.feedback('There was an unknown error. Please try again or contact me otherwise.', 'error');
            }
            loader.stopLoading();
        });
    };
    Contact.prototype.feedback = function (message, type) {
        var feedback = document.createElement('span');
        feedback.classList.add(type);
        feedback.innerText = message;
        this.feedbackElement.innerHTML = feedback.outerHTML;
    };
    return Contact;
}());
function getDiscord() {
    loader.load();
    var discordTagElement = document.querySelector('.discord-tag');
    document.querySelector('#landingpage .msg h2').addEventListener('click', function () {
        discordTagElement.classList.contains('visible') ? discordTagElement.classList.remove('visible') : discordTagElement.classList.add('visible');
    });
    fetch('https://jimiswebsite-api.herokuapp.com/discord', {
        method: 'GET'
    }).then(function (req) { return req.json(); }).then(function (data) {
        discordTagElement.innerText = "#".concat(data.user.discriminator);
        loader.stopLoading();
    });
}
var loader = new Loader();
getDiscord();
