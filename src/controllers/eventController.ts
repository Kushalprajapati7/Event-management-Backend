import { Request, Response } from "express";
import eventService from "../services/eventService";
import { IEvent } from "../interfaces/eventInterface";
import CustomRequest from "../types/customRequest";

class EventController {
    public async createEvent(req: Request, res: Response): Promise<void> {
        try {
            const newEvent = req.body;
            newEvent.createdBy = (req as CustomRequest).userId;
            if (!newEvent.createdBy) {
                throw new Error('Event Creator not found!')
            }
            const event = await eventService.createEvent(newEvent);

            res.json(event);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async getAllEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await eventService.getAllEvents();
            res.json(events);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async getEventById(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.id;
            const event = await eventService.getEventById(eventId);
            if (!event) {
                res.status(404).json({ error: "Event Not Found!" });
                return;
            }
            res.json(event);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async updateEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.id;
            const eventData = req.body;
            const event = await eventService.updateEvent(eventId, eventData);
            if (!event) {
                res.status(404).json({ error: "Event Not Found!" });
                return;
            }
            res.json(event);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async deleteEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.id;
            await eventService.deleteEvent(eventId);
            res.json("Event Deleted");
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.id;
            const userId = (req as CustomRequest).userId;
            const eventByID = await eventService.getEventById(eventId);

            if (!eventByID) {
                res.status(404).json({ error: "Event not found" });
                return;
            }
            if (eventByID.registrations?.includes(userId as string)) {
                throw new Error("You are already registered for this event" );
            }
            const event = await eventService.registerUser(eventId, userId as string);
            res.json(event);

        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async getRegistrations(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.id;
            const event = await eventService.getRegistrations(eventId);
            if (!event) {
                res.status(404).json({ error: "Event Not Found!" });
                return;
            }
            res.json(event);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new EventController();
