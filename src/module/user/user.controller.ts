import type { Request, Response } from "express";
import { UserService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
    console.log("role", req.body)
    const result = await UserService.createUser(req.body)
    res.status(201).json(result)
}

const getAllUser = async (req: Request, res: Response) => {
    const result = await UserService.getAllUser()
    res.status(201).json(result)
}

const getSingleUser = async (req: Request, res: Response) => {
    const result = await UserService.getSingleUser(Number(req.params.id))
    res.status(201).json(result)
}

const updateUser = async (req: Request, res: Response) => {
    const result = await UserService.updateUser(Number(req.params.id), req.body)
    res.status(201).json(result)
}

const deleteUser = async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(Number(req.params.id))
    res.status(201).json(result)
}

export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}