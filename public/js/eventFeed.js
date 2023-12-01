document.addEventListener('DOMContentLoaded', function() {
    // Initialize Anime.js animations
    initializeAnimations();

    // Event listener for event buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('event-button')) {
            const eventId = e.target.getAttribute('data-event-id');
            const isOpen = e.target.classList.contains('open');

            if (isOpen) {
                updateEventStatus(eventId, false); // false indicates the event is no longer open
            }
        }
    });
});

function initializeAnimations() {
    // Anime.js animations for open and booked buttons
    anime({
        targets: '.open', // Targets open buttons
        boxShadow: [
            { value: '0 0 5px rgba(0, 255, 0, 1)' },
            { value: '0 0 25px rgba(0, 255, 0, 1)' },
            { value: '0 0 5px rgba(0, 255, 0, 1)' },
        ],
        easing: 'easeInOutSine',
        duration: 1500,
        loop: true
    });

    anime({
        targets: '.booked', // Targets booked buttons
        boxShadow: [
            { value: '0 0 5px rgba(255, 0, 0, 1)' },
            { value: '0 0 25px rgba(255, 0, 0, 1)' },
            { value: '0 0 5px rgba(255, 0, 0, 1)' },
        ],
        easing: 'easeInOutSine',
        duration: 1500,
        loop: true
    });
}

// accepting an available event
function updateEventStatus(eventId, newStatus) {
    // Replace with your API endpoint and request body as necessary
    fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted', accepted_by: $('#userId').val() })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the button's class and text
            let button = document.getElementById(`eventButton-${eventId}`);
            if (button) {
                button.classList.remove('btn-primary', 'open');
                button.classList.add('btn-secondary', 'booked');
                button.textContent = 'BOOKED';
                button.disabled = true; // Optionally disable the button

                // Trigger the glow animation for the booked button
                animateGlow(button);
            }
        } else {
            console.error('Failed to update event status');
        }
    })
    .catch(error => console.error('Error:', error));
}

function animateGlow(button) {
    anime({
        targets: button,
        boxShadow: [
            { value: '0 0 5px rgba(255, 0, 0, 1)' },
            { value: '0 0 25px rgba(255, 0, 0, 1)' },
            { value: '0 0 5px rgba(255, 0, 0, 1)' },
        ],
        easing: 'easeInOutSine',
        duration: 1500,
        loop: true
    });
}
