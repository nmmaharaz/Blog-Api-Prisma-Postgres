import { Router } from "express";
import { UserRouter } from "../module/user/user.route.js";
import { PostRouter } from "../module/post/post.route.js";

export const router =  Router()

const routeModules = [
    {
        path: "/user",
        route: UserRouter
    },
    {
        path: "/post",
        route: PostRouter
    }
]

routeModules.forEach((route)=>{
    router.use(route.path, route.route)
})