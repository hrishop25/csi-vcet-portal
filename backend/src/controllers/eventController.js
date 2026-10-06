import Event from '../models/Event.js';
import { inMemoryStore } from '../utils/seeder.js';
import { getDbStatus } from '../config/db.js';

export const getEvents = async (req, res) => {
  try {
    const { status, category } = req.query;
    const { connected } = getDbStatus();
    let events = [];

    if (connected) {
      const query = {};
      if (status && status !== 'All') query.status = status;
      if (category && category !== 'All') query.category = category;
      events = await Event.find(query).sort({ date: 1 });
    } else {
      events = inMemoryStore.events.filter((e) => {
        if (status && status !== 'All' && e.status !== status) return false;
        if (category && category !== 'All' && e.category !== category) return false;
        return true;
      });
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error('[Get Events Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch events',
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, subtitle, description, category, date, venue, imageUrl } = req.body;
    if (!title || !description || !date) {
      return res.status(400).json({ success: false, message: 'Title, description and date are required' });
    }

    const { connected } = getDbStatus();
    const eventPayload = {
      title,
      subtitle: subtitle || '',
      description,
      category: category || 'Workshop',
      date: new Date(date),
      venue: venue || 'VCET Campus',
      imageUrl: imageUrl || '',
      status: 'Upcoming',
      seatsTotal: 100,
      seatsFilled: 0,
    };

    let event;
    if (connected) {
      event = await Event.create(eventPayload);
    } else {
      event = {
        _id: 'ev_' + Date.now(),
        id: 'ev_' + Date.now(),
        ...eventPayload,
      };
      inMemoryStore.events.push(event);
    }

    return res.status(201).json({
      success: true,
      message: 'Event published successfully',
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to publish event',
    });
  }
};
