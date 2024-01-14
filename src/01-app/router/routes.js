
export default [
    {
        path: '/',
        name: 'Root',
        component: () => import("@/02-pages/Root.vue"),
        meta: {auth: true}
    },
    {
        path: '/characters',
        name: 'Characters',
        component: () => import("@/02-pages/Characters.vue"),
    }
]