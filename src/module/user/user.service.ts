import prisma from "../../config/db.js"
import type { Prisma, User } from "../../generated/prisma/index.js"

const createUser = async (payload: Prisma.UserCreateInput): Promise<User>=>{
    const result = await prisma.user.create({data: payload})
    console.log(result)
    return result
}

const getAllUser = async (payload: any)=>{
    const result = await prisma.user.create({data: payload})
    console.log(result)
    return result
}

export const UserService = {
    createUser,
    getAllUser
}