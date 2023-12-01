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
    // Anime.js animations for open and booked buttons
    anime({
        targets: '.open',
        boxShadow: ['0 0 10px rgba(100, 152, 255, 1)', '0 0 20px rgba(100, 152, 255, 0.8)', '0 0 10px rgba(100, 152, 255, 1)'], // Adjust these colors and values as needed
        duration: 500,
        easing: 'easeInOutQuad',
        loop: true,
    });
}

// accepting an available event
function updateEventStatus(eventId) {
    // Replace with your API endpoint and request body as necessary
    fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'booked', accepted_by: $('#userId').val() })
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
