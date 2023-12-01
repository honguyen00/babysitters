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

acceptedEventsFeed.on('click', '.eventButton', (event) => {
    const eventId = event.target.dataset.eventId;

    fetch(`api/events/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accepted_by: null, status: 'open'})
    }).then((response) => {
        if(response.ok) {
            document.location.reload();
        } else {
            window.alert(response.statusText)
        }
    })
});

function initializeAnimations() {
    // Anime.js animations for open and booked buttons
    anime({
        targets: '.booked',
        boxShadow: [
            { value: '0 0 5px rgba(255, 0, 0, 1)' },
            { value: '0 0 25px rgba(255, 0, 0, 1)' },
            { value: '0 0 5px rgba(255, 0, 0, 1)' },
        ],
        easing: 'easeInOutSine',
        duration: 500,
        loop: true
    });
}