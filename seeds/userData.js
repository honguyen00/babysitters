const {User} = require('../models');

const userData = [
    {
        first_name: 'Fred',
        last_name: 'Palmer',
        email: 'fredpalmer@gmail.com',
        password: 'Password123?',
        address_line: 'address 1',
        suburb: 'city postcode',
        phone_number: 'phonenum',
        points: 10
    },
    {
        first_name: 'Tonya',
        last_name: 'Shepard',
        email: 'tonyashepard@gmail.com',
        password: 'Password123?',
        address_line: 'address 2',
        suburb: 'city postcode',
        phone_number: 'phonenum',
        points: 20
    },
    {
        first_name: 'Hubert',
        last_name: 'Vaughn',
        email: 'hubertvaughn@gmail.com',
        password: 'Password123?',
        address_line: 'address 3',
        suburb: 'city postcode',
        phone_number: 'phonenum',
        points: 0
    },
    {
        first_name: 'Loretta',
        last_name: 'Holloway',
        email: 'lorettaholloway@gmail.com',
        password: 'Password123?',
        address_line: 'address 4',
        suburb: 'city postcode',
        phone_number: 'phonenum',
        points: 5
    },
    {
        first_name: 'Bridget',
        last_name: 'Vazquez',
        email: 'bridgetvazquez@gmail.com',
        password: 'Password123?',
        address_line: 'address 5',
        suburb: 'city postcode',
        phone_number: 'phonenum',
        points: 5
    },
    {
        first_name: 'Jeremy',
        last_name: 'Robbins',
        email: 'jeremyrobbins@gmail.com',
        password: 'Password123?',
        address_line: 'address 6',
        suburb: 'city postcode',
        phone_number: 'phonenum',
        points: 0
    },
]

const userSeed = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = userSeed;