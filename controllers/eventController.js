const { User, Group, Event } = require('../models');

const eventController = {
  // Implement logic for event routes

  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: [{ model: User }, { model: Group }],
      });

      res.render('allEvents', { events, title: 'All Events' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Add logic to get event details
  getEventDetails: async (req, res) => {
    try {
      const eventId = req.params.id; // Assuming the event ID is in the route parameters

      // Implement logic to get event details, including associated user and group
      const eventData = await Event.findByPk(eventId, {
        include: [{ model: User }, { model: Group }],
      });

      const event = eventData.get({ plain: true });

      res.render('eventDetails', {
        ...event,
        title: 'Event Details',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

};

module.exports = eventController;
