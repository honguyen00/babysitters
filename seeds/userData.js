const {User} = require('../models');

const userData = [
    {
        first_name: 'Felix',
        last_name: 'Le',
        email: 'lehonguyen00@gmail.com',
        password: 'Password123?',
        address_line: 'address 1',
        suburb: 'Redfern',
        phone_number: '0407005040',
        profile_picture: 'https://babysittersdb.s3.ap-southeast-2.amazonaws.com/Family+1.jpeg',
        points: 10
    },
    {
        first_name: 'Tonya',
        last_name: 'Shepard',
        email: 'tonyashepard@gmail.com',
        password: 'Password123?',
        address_line: 'address 2',
        suburb: 'Redfern',
        phone_number: '0407005040',
        profile_picture: 'https://babysittersdb.s3.ap-southeast-2.amazonaws.com/Family+1.jpeg',
        points: 20
    },
    {
        first_name: 'Hubert',
        last_name: 'Vaughn',
        email: 'hubertvaughn@gmail.com',
        password: 'Password123?',
        address_line: 'address 3',
        suburb: 'Redfern',
        phone_number: '0407005040',
        profile_picture: 'https://babysittersdb.s3.ap-southeast-2.amazonaws.com/Family+1.jpeg',
        points: 0
    },
    {
        first_name: 'Loretta',
        last_name: 'Holloway',
        email: 'lorettaholloway@gmail.com',
        password: 'Password123?',
        address_line: 'address 4',
        suburb: 'Redfern',
        phone_number: '0407005040',
        profile_picture: 'https://babysittersdb.s3.ap-southeast-2.amazonaws.com/Family+1.jpeg',
        points: 5
    },
    {
        first_name: 'Bridget',
        last_name: 'Vazquez',
        email: 'bridgetvazquez@gmail.com',
        password: 'Password123?',
        address_line: 'address 5',
        suburb: 'Redfern',
        phone_number: '0407005040',
        profile_picture: 'https://babysittersdb.s3.ap-southeast-2.amazonaws.com/Family+1.jpeg',
        points: 5
    },
    {
        first_name: 'Jeremy',
        last_name: 'Robbins',
        email: 'jeremyrobbins@gmail.com',
        password: 'Password123?',
        address_line: 'address 6',
        suburb: 'Redfern',
        phone_number: '0407005040',
        profile_picture: 'https://babysittersdb.s3.ap-southeast-2.amazonaws.com/Family+1.jpeg',
        points: 0
    },
]

const userSeed = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = userSeed;