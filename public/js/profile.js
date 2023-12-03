document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('upload-form');

    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData();
        const profilePic = document.getElementById('profilePic').files[0];
        formData.append('profilePic', profilePic);

        fetch('/api/users/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                // Handle success
                console.log('Upload successful');
                // Optionally, update profile picture on the page
                document.getElementById('profilePic').src = data.profilePic;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
