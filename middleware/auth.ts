import {useAuthStore} from "~/store/auth";
import {navigateTo} from "#app";

const authStore = useAuthStore()

const notifications = useNotification()

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    await authStore.checkAuth()

    if (!authStore.isAuth) {
        notifications.notify({
            title: "Problem with authorization",
            content: "Your authorization token has probably expired. Please log in again..",
            type: 'error',
            duration: 10000,
        })
        return navigateTo('/login')
    }

    return
})