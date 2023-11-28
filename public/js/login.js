const errorMessage = (form, errorP, message) => {
        form.find(`${errorP}`)[0].innerText = message;
        setTimeout(() => {
            form.find(`${errorP}`)[0].innerText = "";
        }, 1500);
}
    
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
            document.location.replace('/');
        }
        else {
            errorMessage(loginForm, '#errorMessage1', 'Incorrect email or password!')
        }
    } else {
        errorMessage(loginForm, '#errorMessage1', 'Missing input! Please fill out all fields')
    }
}

loginForm.on('submit', loginFormHandler);

// ===================================
// Sign up form
var currentForm, previousForm;
var stepNumber = 1;
var currentForm = $('#form-'+stepNumber);
currentForm.removeClass('d-none')

const registerForm = $('#form-register');

registerForm.on('click', '.progress-control', (event) => {
    event.preventDefault();
    var first_name = $('#registerFirstName')[0].value.trim();
    var last_name = $('#registerLastName')[0].value.trim();
    var address_line = $('#registerAddress')[0].value.trim();
    var suburb = $('#registerCity')[0].value.trim() + ", " + $('#registerPostcode')[0].value.trim();
    var phone_number = $('#registerPhone')[0].value.trim();
    if(event.target.innerText == 'Next') {
        if(!first_name || !last_name || !address_line || !suburb || !phone_number) {
            errorMessage(registerForm, '#errorMessage2', 'Missing input! Please fill out all fields.');
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
        errorMessage(registerForm, '#errorMessage3', 'Missing input! Please fill out all fields');
        return;
    }
    if((password !== confirmed)) {
        errorMessage(registerForm, '#errorMessage3', 'Password does not match!');
        return;
    } 
    else {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password, address_line, suburb, phone_number }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/');
        } else if (response.status === 403) {
            errorMessage(registerForm, 'Email has already existed!');
            return;
        } else {
            errorMessage(registerForm, 'Could not create a new account! Please try again.')
            return;
        }
    }
});
