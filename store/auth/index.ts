import {defineStore} from "pinia";
import {useCookie} from "#app";
import {useBaseFetch, useLocalStorage} from "#imports";
import {useNotification} from "#imports";

const notification = useNotification()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        $user: useLocalStorage('/auth/user', null),
        $token: useLocalStorage('/auth/token', null),
    }),

    actions: {
        async googleLogin(token: string) {
            const config = useRuntimeConfig()

            await $fetch(config.public.apiBase + 'sanctum/csrf-cookie', {
                credentials: 'include'
            })

            const token_dirty = useCookie('XSRF-TOKEN').value

            const xsrf_token = decodeURIComponent(token_dirty === null ? '' : token_dirty) // <---- CHANGED

            await $fetch(config.public.apiBase + 'api/login', {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: {
                    google_token: token
                },
                credentials: 'include'
            })
                .then((resp: any) => {
                    if (!resp.status) {
                        notification.notify({content: resp.message, type: 'error', duration: 'none'})
                        return
                    }

                    this.$user = resp.user
                    this.$token = resp.token
                    navigateTo('/dashboard')
                })
        },
        async login(body: any) {
            const config = useRuntimeConfig()

            await $fetch(config.public.apiBase + 'sanctum/csrf-cookie', {
                credentials: 'include'
            })

            const token_dirty = useCookie('XSRF-TOKEN').value

            const xsrf_token = decodeURIComponent(token_dirty === null ? '' : token_dirty) // <---- CHANGED

            await $fetch(config.public.apiBase + 'api/login', {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: body,
                credentials: 'include'
            })
                .then((resp: any) => {
                    if (!resp.status) {
                        notification.notify({content: resp.message, type: 'error', duration: 'none'})
                        return
                    }

                    this.$user = resp.user
                    this.$token = resp.token
                    navigateTo('/dashboard')
                })
        },
        async logout() {
            this.$user = null
            this.$token = null
            navigateTo('/login')
        },
        async checkAuth() {
            try {
                await useBaseFetch('me')
            } catch (e) {
                this.$user = null
                this.$token = null
            }
        }
    },

    getters: {
        user: (state) => state.$user,
        token: (state) => state.$token,
        isAuth: (state): boolean => state.$token !== undefined && state.$token !== null,
    }
});