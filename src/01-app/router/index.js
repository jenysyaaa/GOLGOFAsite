import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.js";
import {authTokenEffect} from "./guards";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => authTokenEffect(to, from, next))

export default router