import prisma from "../../config/db.js"
import type { Post, Prisma } from "../../generated/prisma/index.js"

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const result = await prisma.post.create({ data: payload })
    return result
}

const getAllPost = async (page: number, limit: number, search: string, filter: boolean, tag: string[]) => {
    const where: any = {
        AND: {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    content: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            ],
            isFeatured: filter,
            tags: {
                hasEvery: tag
            }
        }
    }

    const result = await prisma.post.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
            author: true
        },
        orderBy: {
            createAt: "desc"
        }
    })

    const meta = await prisma.post.count({ where })

    return {
        data: result,
        meta
    }
}

const getSinglePost = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        })
        return await tx.post.findUnique({
            where: {
                id
            }
        })
    })
}

const updatePost = async (id: number, payload: Partial<Prisma.PostCreateInput>) => {
    const result = await prisma.post.update({
        where: {
            id
        }, data: payload
    })
    return result
}

const deletePost = async (id: number) => {
    const result = await prisma.post.delete({
        where: {
            id
        }
    })
    return result
}

export const PostService = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
}