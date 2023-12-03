// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { Group, GroupUser, User, Event } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all events
router.get('/', async (req, res) => {
    try {
      const eventData = await Event.findAll();
      res.status(200).json(eventData);
    } catch (error) {
      res.status(400).json(error);
    }
});

// GET a specific event by ID
router.get('/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const eventData = await Event.findByPk(eventId);
      res.status(200).json(eventData);
    } catch (error) {
      res.status(400).json(error);
    }
  });

// POST a new event
router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({...req.body, created_by: req.session.user_id});
    if (newEvent) {
      res.status(201).json({data: newEvent, message: 'Create new event successfully'});
    } else {
      res.status(400).json({message: 'Cound not create a new event'})
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT/update an event by ID
router.put('/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedEvent = await Event.update(req.body, { where: { id: eventId } });
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(400).json(error);
    }
});

// DELETE an event by ID
router.delete('/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const deletedEvent = await Event.destroy({ where: { id: eventId } });
      res.status(200).json(deletedEvent);
    } catch (error) {
      res.status(400).json(error);
    }
  });

// Handle the POST request for accepting an event
router.post('/:id/accept', async (req, res) => {
  try {
      const eventId = req.params.id;
      const event = await Event.findByPk(eventId);
      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      const user = await User.findByPk(req.session.user_id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Add event duration to user's points
      user.points += event.duration;

      // Save the updated user data
      await user.save();

      // Update the event status as booked and set the accepted_by field
      const updatedEvent = await Event.update({ status: 'booked', accepted_by: req.session.user_id }, { where: { id: eventId } });

      res.status(200).json(updatedEvent);
  } catch (error) {
      res.status(400).json(error);
  }
});

router.post('/:id/cancel', async (req, res) => {
  try {
      const eventId = req.params.id;
      const event = await Event.findByPk(eventId);
      if (!event || event.accepted_by !== req.session.user_id) {
          return res.status(404).json({ message: 'Event not found or unauthorized action' });
      }

      const user = await User.findByPk(req.session.user_id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Deduct event duration from user's points
      user.points -= event.duration;

      await user.save();

      // Update the event status
      await Event.update({ status: 'open', accepted_by: null }, { where: { id: eventId } });

      res.status(200).json({ message: 'Event cancelled successfully' });
  } catch (error) {
      res.status(500).json(error);
  }
});



module.exports = router;