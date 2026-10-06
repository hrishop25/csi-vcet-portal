import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    category: {
      type: String,
      enum: ['Hackathon', 'Workshop', 'Technical Seminar', 'Coding Contest', 'Tech Fest', 'Webinar'],
      default: 'Workshop',
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      default: '10:00 AM - 04:00 PM IST',
    },
    venue: {
      type: String,
      required: true,
      default: 'VCET Seminar Hall / Online',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    registrationUrl: {
      type: String,
      default: '#apply',
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed'],
      default: 'Upcoming',
    },
    speakers: {
      type: [String],
      default: [],
    },
    seatsTotal: {
      type: Number,
      default: 120,
    },
    seatsFilled: {
      type: Number,
      default: 84,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

export const Event = mongoose.model('Event', eventSchema);
export default Event;
