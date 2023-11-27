const inputValidate = (form, message) => {
        form.append(`<p class='my-1 text-danger'>${message}</p>`)
        setTimeout(() => {
            form.children().last().remove();
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
            document.location.replace('/profile');
        }
        else {
            inputValidate(loginForm, 'Incorrect email or password!')
            document.querySelector('#loginEmail').value = "";
            document.querySelector('#loginPassword').value = "";
        }
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
    if(event.target.innerText == 'Next') {
        renderForm(++stepNumber, stepNumber-1)
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
    var first_name = $('#registerFirstName')[0].value.trim();
    var last_name = $('#registerLastName')[0].value.trim();
    var address_line = $('#registerAddress')[0].value.trim();
    var suburb = $('#registerCity')[0].value.trim() + ", " + $('#registerPostcode')[0].value.trim();
    var phone_number = $('#registerPhone')[0].value.trim();
    var email = $('#registerEmail')[0].value.trim();
    var password = $('#registerPassword')[0].value.trim();
    var confirmed = $('#confirmedPassword')[0].value.trim();
    if((password !== confirmed)) {
        inputValidate(registerForm, 'Password does not match!');
    } else {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password, address_line, suburb, phone_number }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
});
