function updateEventStatus(eventId, newStatus) {
    // Replace with your API endpoint and request body as necessary
    fetch(`/api/update-event/${eventId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOpen: newStatus })
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the server sends back a success response
        if (data.success) {
            // Animate the status change on the button
            animateStatusChange(eventId, newStatus);
        } else {
            // Handle any errors or unsuccessful updates
            console.error('Failed to update event status');
        }
    })
    .catch(error => {
        // Handle network or other errors here
        console.error('Error:', error);
    });
}

function animateStatusChange(eventId, isOpen) {
    var button = document.getElementById(`eventButton-${eventId}`);
    if (button) {
        // Change button class and text according to new status
        button.classList.toggle('btn-primary', isOpen);
        button.classList.toggle('btn-secondary', !isOpen);
        button.textContent = (isOpen ? 'OPEN' : 'BOOKED') + ' - ACCEPT';

        // Anime.js animation
        anime({
            targets: button,
            scale: [1, 1.2, 1], // Temporarily increase scale to 1.2 then back to 1
            duration: 500,
            easing: 'easeInOutQuad'
        });
    }
}

// Use event delegation
document.addEventListener('click', function(e) {
    if (e.target && e.target.id.startsWith('eventButton-')) {
        const eventId = e.target.getAttribute('data-event-id');
        const newStatus = e.target.getAttribute('data-new-status') === 'true';

        updateEventStatus(eventId, newStatus);
    }
});
