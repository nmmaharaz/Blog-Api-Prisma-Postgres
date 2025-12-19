import { Router } from "express";
import { UserRouter } from "../module/user/user.route.js";

export const router =  Router()

const routeModules = [
    {
        path: "/user",
        route: UserRouter
    }
]

routeModules.forEach((route)=>{
    router.use(route.path, route.route)
})