import mongoose, { Schema, Document } from 'mongoose';
import { IEvent } from '../interfaces/eventInterface';

const eventSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    registrations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
