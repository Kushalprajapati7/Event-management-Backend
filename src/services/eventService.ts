import Event from "../models/eventModel";
import { IEvent } from "../interfaces/eventInterface";

class EventService {
    public async createEvent(newEvent: IEvent): Promise<IEvent> {
        const event = new Event(newEvent);
        return await event.save();
    }

    public async getAllEvents(): Promise<IEvent[]> {
        return await Event.find();
    }

    public async getEventById(id: string): Promise<IEvent | null> {
        return await Event.findById(id);
    }

    public async updateEvent(id: string, eventData: Partial<IEvent>): Promise<IEvent | null> {
        return await Event.findByIdAndUpdate(id, eventData, { new: true });
    }

    public async deleteEvent(id: string): Promise<void> {
        await Event.findByIdAndDelete(id);
    }

    public async registerUser(eventId: string, userId: string): Promise<IEvent | null> {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        event.registrations?.push(userId);
        await event.save();
        return event;
    }

    public async getRegistrations(eventId: string): Promise<IEvent | null> {
        return await Event.findById(eventId).populate('registrations', 'username email');
    }
}

export default new EventService();
