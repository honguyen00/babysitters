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


function initializeAnimations() {
    // Subtle scale transform for open buttons
    anime({
        targets: '.booked',
        scale: [1, 1.05], // Scale from 100% to 105%
        duration: 2000,
        easing: 'easeInOutQuad',
        direction: 'alternate', // Alternate between scaling up and down
        loop: true
    });
}


