document.addEventListener('DOMContentLoaded', function() {
    // Initialize Anime.js animations
    initializeAnimations();
});

const eventFeed = $('#eventFeed');

eventFeed.on('click', '.eventButton', (event) => {
    // console.log(event.target.dataset.eventId,  $('#userId').val() );
    updateEventStatus(event.target.dataset.eventId);
})

function initializeAnimations() {
    // Subtle scale transform for open buttons
    anime({
        targets: '.open',
        scale: [1, 1.10], // Scale from 100% to 105%
        duration: 2000,
        easing: 'easeInOutQuad',
        direction: 'alternate', // Alternate between scaling up and down
        loop: true
    });
}

// accepting an available event
function updateEventStatus(eventId) {
    fetch(`/api/events/${eventId}/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if(response.ok) {
            document.location.replace('/my-events');
        }
        else {
            window.alert(response.statusText)
        }
    })
    .catch(error => console.error('Error:', error));
}

