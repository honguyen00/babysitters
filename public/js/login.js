import errorMessage  from './errorHandler.js';
    
// ===================================
// Login form
const loginForm = $('#form-login');
const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();
    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/home');
        }
        else {
            errorMessage(loginForm, 'errorMessage1', 'Incorrect email or password!')
        }
    } else {
        errorMessage(loginForm, 'errorMessage1', 'Missing input! Please fill out all fields')
    }
}

loginForm.on('submit', loginFormHandler);

// ===================================
// Sign up form
var currentForm, previousForm;
var stepNumber = 1;
var currentForm = $('#form-'+stepNumber);
currentForm.removeClass('d-none')
var first_name;
var last_name;
var address_line;
var suburb;
var phone_number;

const registerForm = $('#form-register');

registerForm.on('click', '.progress-control', (event) => {
    event.preventDefault();
    first_name = $('#registerFirstName')[0].value.trim();
    last_name = $('#registerLastName')[0].value.trim();
    address_line = $('#registerAddress')[0].value.trim();
    suburb = $('#registerCity')[0].value.trim() + ", " + $('#registerPostcode')[0].value.trim();
    phone_number = $('#registerPhone')[0].value.trim();
    if(event.target.innerText == 'Next') {
        if(!first_name || !last_name || !address_line || !suburb || !phone_number) {
            errorMessage(registerForm, 'errorMessage2', 'Missing input! Please fill out all fields.');
            return
        } else {
            renderForm(++stepNumber, stepNumber-1)
        }
    } else {
        renderForm(--stepNumber, stepNumber+1)
    }
})
const renderForm = (step, previousStep) => {
    currentForm = $('#form-'+ (step));
    previousForm = $('#form-'+ (previousStep));
    previousForm.addClass('d-none');
    currentForm.removeClass('d-none');
    $('#progressBar li:nth-child('+ step + ')').addClass('active');
    $('#progressBar li:nth-child('+ (previousStep) + ')').removeClass('active');
}

registerForm.on('submit', async (event) => {
    event.preventDefault();
    var email = $('#registerEmail')[0].value.trim();
    var password = $('#registerPassword')[0].value.trim();
    var confirmed = $('#confirmedPassword')[0].value.trim();
    if(!email || !password || !confirmed ) {
        errorMessage(registerForm, 'errorMessage3', 'Missing input! Please fill out all fields');
        return;
    }
    if((password !== confirmed)) {
        errorMessage(registerForm, 'errorMessage3', 'Password does not match!');
        return;
    } 
    else {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({first_name, last_name, email, password, address_line, suburb, phone_number}),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/home');
        } else if (response.status === 403) {
            errorMessage(registerForm, 'errorMessage3', 'Email has already existed! Please sign in instead.');
            return;
        } else {
            errorMessage(registerForm, 'errorMessage3', 'Could not create a new account! Please try again.')
            return;
        }
    }
});

