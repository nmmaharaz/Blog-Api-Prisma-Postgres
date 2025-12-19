import prisma from "../../config/db.js"
import type { Prisma, User } from "../../generated/prisma/index.js"

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const result = await prisma.user.create({ data: payload })
    return result
}

const getAllUser = async () => {
    const result = await prisma.user.findMany({
        omit: {
            password: true
        },
        include: {
            post: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return result
}

const getSingleUser = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return result
}

const updateUser = async (id: number, payload: Partial<Prisma.UserCreateInput>) => {
    const result = await prisma.user.update({
        where: {
            id
        }, data: payload
    })
    return result
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result
}

export const UserService = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}