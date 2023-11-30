import errorMessage  from './errorHandler.js';


const eventForm = $('#eventForm');
const handlecreateEvent = async (event) => { 
    event.preventDefault();
    var today = new Date();
    var title = $('#eventTitle').val();
    var description = $('#eventDescription').val();
    var date = $('#eventDate').val().split('-');
    var startTime = ($('#startTime').val()).split(':');
    var finishTime = ($('#endTime').val()).split(':');
    var startdate = new Date(date[0], date[1], date[2], startTime[0], startTime[1]);
    var finishdate = new Date(date[0], date[1], date[2], finishTime[0], finishTime[1]);
    
    if(!title || !description || !date || !startTime || !finishTime) {
        errorMessage(eventForm, 'errorMessage', 'Must input in all field!')
        return
    } else if (today > new Date($('#eventDate').val())) {
        errorMessage(eventForm, 'errorMessage', 'Must create a future event.')
    } else if (startdate > finishdate) {
        errorMessage(eventForm, 'errorMessage', 'Finish time must be after starting time.')
    } else if ((finishdate - startdate) / 60000 < 60) {
        errorMessage(eventForm, 'errorMessage', 'Event must be at least one hour.')
    } else {
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                date: $('#eventDate').val(),
                start_time: $('#startTime').val(),
                finish_time: $('#endTime').val(), 
                description: description,
                status: 'available',
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/events')
        } else {
            errorMessage(eventForm, 'errorMessage', 'Could not create a new event! Please wait and try again later.')
            return;
        }
    }
}

eventForm.on('submit', handlecreateEvent)