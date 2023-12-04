// document.addEventListener('DOMContentLoaded', function () {
//     // const uploadForm = document.getElementById('upload-form');

//     // uploadForm.addEventListener('submit', function (e) {
//     //     e.preventDefault();

//     //     const formData = new FormData();
//     //     const profilePic = document.getElementById('profilePic').files[0];
//     //     formData.append('profilePic', profilePic);

//     //     fetch('/api/users/upload', {
//     //         method: 'POST',
//     //         body: formData
//     //     })
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         if(data.message) {
//     //             // Handle success
//     //             console.log('Upload successful');
//     //             // Optionally, update profile picture on the page
//     //             document.getElementById('profilePic').src = data.profilePic;
//     //         }
//     //     })
//     //     .catch(error => {
//     //         console.error('Error:', error);
//     //     });
//     // })
// })

let form;
let saveButton;
let editButton;
let clearButton;

form = document.getElementById('profile-form');
saveButton = document.querySelector('#save-profile');
editButton = document.querySelector('#edit-profile');
clearButton = document.querySelector('#clear-profile');


// Check if variables are truthy before attaching event listeners
if (form && saveButton && editButton && clearButton) {
    // Event listener for the Edit button
    editButton.addEventListener('click', function (event) {
        event.preventDefault();
        enableForm();
    });
    // Event listener for the Save button
    saveButton.addEventListener('click', function (event) {
        event.preventDefault();
        saveForm();
    });
    // Event listener for the Clear button
    clearButton.addEventListener('click', function (event) {
        event.preventDefault();
        clearForm();
});
} else {
    console.error('One or more elements not found.');
};


// Update the displayed profile data with new data
// function updateProfileData(data) {
//     const fieldNames = ['first_name', 'last_name', 'address_line', 'suburb', 'phone_number', 'email'];
//     fieldNames.forEach(fieldName => {
//         const inputElement = form.querySelector(`#${fieldName}`);
//         if (inputElement) {
//             inputElement.value = data[fieldName];
//         } else {
//             console.error(`Element with ID "${fieldName}" not found in the form.`);
//         }
//     });
// }


function enableForm() {
    try {
        const formElements = form.elements;
        // Enable all form elements for editing except the email input field
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.id !== 'email') {
                element.removeAttribute('readonly');
            }
        }
        // Show the Save button, hide the Edit button, and show the Clear button
        saveButton.style.display = 'block';
        editButton.style.display = 'none';
        clearButton.style.display = 'block';
    } catch (error) {
        console.error('Error in enableForm:', error);
    }
}


// Save the form data
function saveForm() {
    // const formData = new FormData(form);
    // // Log all form data to console before making the API call
    // console.log('Form data:', Object.fromEntries(formData));
    // console.log('User email:', userEmail);
    // var firstname = document.getElementById('first_name').innerText;
    // var lastname = document.getElementById('last_name').innerText;
    // var addressline = document.getElementById('address_line').innerText;
    // var suburb = document.getElementById('suburb').innerText;
    // var phonenumber = document.getElementById('phone_number').innerText;
    var firstname = $('#first_name').val();
    var lastname = $('#last_name').val();
    var addressline = $('#address_line').val();
    var suburb = $('#suburb').val();
    var phonenumber = $('#phone_number').val();
    var userEmail = $('#email').val();
    console.log({userEmail, firstname, lastname, addressline, suburb, phonenumber});
    //API endpoint for updating user profiles
    fetch(`/api/users/email/${userEmail}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({first_name: firstname, last_name: lastname, address_line: addressline, suburb: suburb, phone_number:phonenumber}),
    })
    .then(response => {if(response.ok) {
        document.location.reload();

    } else {
        window.alert('failed to update')
    }
})}


// Clear the form
function clearForm() {
    form.reset();
    disableForm();
}

// Disable the form after saving
function disableForm() {
    const formElements = form.elements;
    // Disable all form elements for editing
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].readOnly = true;
    }
    // Hide the Save button, show the Edit button, and hide the Clear button
    saveButton.style.display = 'none';
    editButton.style.display = 'block';
    clearButton.style.display = 'none';
}


