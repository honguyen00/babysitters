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

module.exports = router;