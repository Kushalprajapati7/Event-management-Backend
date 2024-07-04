import { Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  description: string;
  date: Date;
  location: string;
  createdBy: string;
  registrations?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
