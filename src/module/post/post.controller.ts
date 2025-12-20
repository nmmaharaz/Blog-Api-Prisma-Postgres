import type { Request, Response } from "express";
import { PostService } from "./post.service.js";

const createPost = async (req: Request, res: Response) => {
    console.log("role", req.body)
    const result = await PostService.createPost(req.body)
    res.status(201).json(result)
}

const getAllPost = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1 
    const limit = Number(req.query.limit) || 10 
    const search = (req.query.search as string) || ""
    const filter = req.query.filter ? req.query.filter === "true" : undefined 
    const tag = req.query.tag ? (req.query.tag as string).split(","): []
    const result = await PostService.getAllPost(page, limit, search, filter, tag)
    res.status(201).json(result)
}

const getSinglePost = async (req: Request, res: Response) => {
    const result = await PostService.getSinglePost(Number(req.params.id))
    res.status(201).json(result)
}

const updatePost = async (req: Request, res: Response) => {
    const result = await PostService.updatePost(Number(req.params.id), req.body)
    res.status(201).json(result)
}

const deletePost = async (req: Request, res: Response) => {
    const result = await PostService.deletePost(Number(req.params.id))
    res.status(201).json(result)
}

export const PostController = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
}