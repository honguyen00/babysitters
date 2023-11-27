const loginForm = $('#form-login');

const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();
    console.log({email, password});
    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            console.log(response);
            // document.location.replace('/profile');
        }
        else {
            loginForm.append("<p class='my-1 text-danger'>Incorrect email or password!</p>");
            document.querySelector('#loginEmail').value = "";
            const password = document.querySelector('#loginPassword').value = "";
            setTimeout(() => {
                loginForm.children().last().remove();
            }, 1000);
        }
    }
}

loginForm.on('submit', loginFormHandler);

