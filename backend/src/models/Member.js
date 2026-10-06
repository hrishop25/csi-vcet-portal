import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Designation or role is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Faculty Coordinators', 'Core Council', 'Technical Team', 'Events & Operations', 'Creatives & PR'],
      default: 'Core Council',
    },
    department: {
      type: String,
      default: 'Computer Engineering',
    },
    year: {
      type: String,
      enum: ['FE', 'SE', 'TE', 'BE', 'Faculty', 'Alumni'],
      default: 'TE',
    },
    email: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    priorityOrder: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

export const Member = mongoose.model('Member', memberSchema);
export default Member;
