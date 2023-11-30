const {Event} = require('../models');

const eventData = [
    {
        title: 'test event 1',
        date: '2023-11-23',
        start_time: '6:00',
        finish_time: '8:00',
        description: 'test event 1 description',
        status: 'available',
        created_by: 1,
    }, 
    {
        title: 'test event 2',
        date: '2023-11-30',
        start_time: '15:00',
        finish_time: '18:00',
        description: 'test event 2 description',
        status: 'accepted',
        created_by: 1,
    }, 
    {
        title: 'test event 3',
        date: '2023-11-29',
        start_time: '19:00',
        finish_time: '21:00',
        description: 'test event 3 description',
        status: 'available',
        created_by: 2,
    }, 
    {
        title: 'test event 4',
        date: '2023-11-23',
        start_time: '6:00',
        finish_time: '8:00',
        description: 'test event 4 description',
        status: 'available',
        created_by: 3,
    }, 
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;