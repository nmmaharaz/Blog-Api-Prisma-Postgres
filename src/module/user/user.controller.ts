import type { Request, Response } from "express";
import { UserService } from "./user.service.js";

const createUser = async (req: Request, res: Response)=>{
    console.log("role", req.body)
    const result = await UserService.createUser(req.body)
    res.send(result)
}

const getAllUser = async (req: Request, res: Response)=>{
    console.log("role", req.body)
    const result = await UserService.getAllUser(req.body)
    res.send(result)
}

export const UserController = {
    createUser,
    getAllUser
}