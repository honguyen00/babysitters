const router = require('express').Router();
const { Group, GroupUser, User, Event } = require('../../models');
const withAuth = require('../../utils/auth');
// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
require('dotenv').config();

//get all uses
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json(error)
    }
});

//get a user by id, include all groups and events for that user 
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: {exclude: ['password']}});
        if(!userData) {
            res.status(400).json({message: 'Cannot find user in the database'});
            return;
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get a user by email, include all groups and events for that user 
router.get('/email/:email', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.params.email},
            attributes: {exclude: ['password']}});
        if(!userData) {
            res.status(400).json({message: 'Cannot find user in the database'});
            return;
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
})


//create a new user
router.post('/', async (req, res) => {
    try {
        const [userData, created] = await User.findOrCreate({where: {email: req.body.email}, defaults: {...req.body}});
        if(created) {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
    
                res.status(200).json({user: userData, message: 'Create new user successfully'});
            });
        } else {
            res.status(403).json({message: 'Email has already been registered as an user!'})
        }
    } catch (error) {
        res.status(400).json(error)
    }
});

//update information for an existing user
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({user: userData, message: 'Update user info successfully'});
    } catch (error) {
        res.status(400).json(error);
    }
});

// Update information for an existing user by email
router.put('/email/:email', async (req, res) => {
    console.log('accessroute');
    try {
        const userData = await User.update(req.body, {
            where: {
                email: req.params.email
            }
        });
        res.status(200).json({ user: userData, message: 'Update user info successfully' });
    } catch (error) {
        res.status(400).json(error);
    }
});

//deleting existing user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({where: {
            id: req.params.id 
        }});
        res.status(200).json({user: userData, message: 'Delete user successfully'})
    } catch (error) {
        res.status(400).json(error);
    }
})

//user tries login
router.post('/login', async (req, res) => {
    console.log({email: req.body.email, password: req.body.password})
    try {
        const userData = await User.findOne({where: {email: req.body.email}});
        if(!userData) {
            res.status(400).json({message: 'Incorrect email or password, please try again!'});
            console.log('incorrect email')
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: 'Incorrect email or password, please try again!'});
            console.log('incorrect password')
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({user: userData, message: 'Logged in successfully!'})
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// user tries logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

// aws.config.update({
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     region: process.env.AWS_REGION
// });

// const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         acl: 'public-read', // This will make uploaded files publicly readable
//         metadata: function (req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     })
// });

    // And update user profile with the image URL
// router.post('/upload', upload.single('profilePic'), async (req, res) => {
//     try {
//         const user = await User.update(
//             { profilePic: req.file.location }, 
//             { where: { id: req.session.user_id } }
//         );
//         res.json({ message: 'Profile picture uploaded successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });

module.exports = router;
