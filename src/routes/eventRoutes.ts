import eventController from "../controllers/eventController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorize from "../middleware/roleBase";
const router = Router();

router.post('/add', verifyToken, authorize(['admin']), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', verifyToken, authorize(['admin']), eventController.updateEvent);
router.delete('/:id', verifyToken, authorize(['admin']), eventController.deleteEvent);
router.post('/:id/register', verifyToken, eventController.registerUser);
router.get('/:id/registrations', verifyToken, eventController.getRegistrations);

export default router;
