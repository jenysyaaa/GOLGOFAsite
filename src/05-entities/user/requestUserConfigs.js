export default {
    POSTAuth: {
        url: '/auth',
        type: 'post',
        jsonKeys: ['email', 'password']
    },
    GETProfileInfo: {
        url: '/profile/:{id}',
        type: 'get',
        routerKey: ["id"],
        queryKeys: ["test"]
    }
}