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
        accepted_by: 2
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
        accepted_by: 2,
    }, 
    {
        title: 'test event 5',
        date: '2023-11-29',
        start_time: '19:00',
        finish_time: '23:00',
        description: 'random text',
        status: 'available',
        created_by: 2,
    }, 
    {
        title: 'test event 6',
        date: '2023-11-29',
        start_time: '19:00',
        finish_time: '21:00',
        description: 'random text',
        status: 'available',
        created_by: 5,
    }, 
    {
        title: 'test event 7',
        date: '2023-11-29',
        start_time: '19:00',
        finish_time: '21:00',
        description: 'test event 3 description',
        status: 'available',
        created_by: 5,
    }, 
    {
        title: 'test event 8',
        date: '2023-11-29',
        start_time: '19:00',
        finish_time: '21:00',
        description: 'test event 3 description',
        status: 'available',
        created_by: 5,
    }, 
    {
        title: 'test event 9',
        date: '2023-11-29',
        start_time: '19:00',
        finish_time: '21:00',
        description: 'test event 3 description',
        status: 'available',
        created_by: 5,
    }, 
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;