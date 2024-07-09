import { Request, Response } from "express";
import userServices from "../services/userService";

class UserController {
    public async creatUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = req.body;
            const User = await userServices.createUser(newUser);
            res.json(User);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const response = await userServices.loginUser(email, password);
            res.json({ response, message: `Login Successfully` })
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async getAllUser(req: Request, res: Response): Promise<void> {
        try {
            const allUser = await userServices.allUser();
            if (!allUser) {

                res.status(404).json({ error: "Users Not Found!" });
                return
            }
            res.json(allUser)
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {

            const userId = req.params.id;
            await userServices.deleteUser(userId)
            res.json("User Deleted")
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {

            const userId = req.params.id;
            const user = await userServices.byIdUser(userId)
            res.json(user)
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await userServices.updateUser(userId, userData);
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    };


}

export default new UserController();