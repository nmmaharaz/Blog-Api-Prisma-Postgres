import prisma from "../../config/db.js"
import { config } from "../../config/index.js"
import type { Prisma, User } from "../../generated/prisma/index.js"
import bcrypt from "bcrypt"
const createUser = async (payload: Prisma.UserCreateInput): Promise<(Omit<User, 'password'>)> => {
    payload.password && (payload.password = await bcrypt.hash(payload.password, Number(config.sald_round)))
    const result = await prisma.user.create({ data: payload, omit: {password: true} })
    return result
}

const getAllUser = async () => {
    const result = await prisma.user.findMany({
        include: {
            post: {
                select: {
                    title: true
                }
            },
        },
        omit: {
            password: true
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