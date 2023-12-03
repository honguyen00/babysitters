document.addEventListener('DOMContentLoaded', function() {
    // Initialize Anime.js animations
    initializeAnimations();

});

const createdEventsFeed = $('.created-event-container');
const acceptedEventsFeed = $('.accepted-event-container')

createdEventsFeed.on('click', '.eventButton', (event) => {
    const eventId = event.target.dataset.eventId;

    fetch(`api/events/${eventId}`, {
        method: 'DELETE',
    }).then((response) => {
        if(response.ok) {
            document.location.reload();
        } else {
            window.alert(response.statusText)
        }
    })
});

createdEventsFeed.on('click', '.profile-link', (event) => {
    const userId = event.target.dataset.userId;
    fetch(`api/users/${userId}`, {
        method: 'GET'
        }).then(async (response) => {
            if(response.ok) {
                const data = await response.json()
                const container = $('#myEvents');
                container.append(
                `<div class='overlay' id='overlay'></div>
                <div class="profile-card card">
                <img class="card-img-top" alt="User Profile Picture">
                <div class="card-body">
                    <p class="card-text"><strong>Full name: </strong>${data.first_name} ${data.last_name}</p>
                    <p class="card-text"><strong>Address: </strong>${data.address_line}, ${data.suburb}</p>
                    <p class="card-text"><strong>Phone Number: </strong>${data.phone_number}</p>
                    <p class="card-text"><strong>Email: </strong>${data.email}</p>
                    <a class="btn btn-info close-profile">Close</a>
                </div>
                </div>`
                )
                $('.overlay').css({'display':'block'})
                $('.close-profile').on('click', () => {
                    container.children().last().remove();
                    $('.overlay').css({'display':'none'})
                })
            } else {
                window.alert(response.statusText)
            }
        })
});

acceptedEventsFeed.on('click', '.eventButton', (event) => {
    const eventId = event.target.dataset.eventId;

    fetch(`api/events/${eventId}/cancel`, {
        method: 'POST',
    }).then((response) => {
        if(response.ok) {
            document.location.reload();
        } else {
            window.alert(response.statusText)
        }
    })
});

acceptedEventsFeed.on('click', '.profile-link', (event) => {
    document.location.replace('/profile') 
});


function initializeAnimations() {
    // Subtle scale transform for open buttons
    anime({
        targets: '.booked',
        scale: [1, 1.05], // Scale from 100% to 105%
        duration: 1000,
        easing: 'easeInOutQuad',
        direction: 'alternate', // Alternate between scaling up and down
        loop: true
    });
}


