import {g} from "@/05-entities/global"
export const authTokenEffect = (to, from, next) => {
    if (!g.userStore().isAuthenticated && !to.meta.auth) next({name: 'Root'})
    else next()
}