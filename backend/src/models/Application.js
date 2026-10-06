import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    rollNumber: {
      type: String,
      trim: true,
      default: '',
    },
    year: {
      type: String,
      required: [true, 'Academic year is required'],
      enum: ['FE', 'SE', 'TE', 'BE'],
      default: 'SE',
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: [
        'Computer Engineering',
        'Information Technology',
        'CSE(DS)',
        'Artificial Intelligence & Data Science',
        'Electronics & Telecommunication',
        'Mechanical Engineering',
        'Civil Engineering',
      ],
      default: 'Computer Engineering',
    },
    domainPreference: {
      type: String,
      enum: ['Technical', 'Web & App', 'Creatives & Design', 'Public Relations & Marketing', 'Event Management', 'Sponsorship'],
      default: 'Technical',
    },
    skills: {
      type: [String],
      default: [],
    },
    statementOfPurpose: {
      type: String,
      trim: true,
      default: '',
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Interviewed', 'Accepted', 'Declined'],
      default: 'Pending',
    },
    interviewSlot: {
      type: String,
      default: null,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'dateApplied', updatedAt: 'updatedAt' },
  }
);

// Virtual for ID formatting and JSON transformations
applicationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

export const Application = mongoose.model('Application', applicationSchema);
export default Application;
