import {defineStore} from "pinia";

export const useDefaultStore = defineStore('default', {
    state: () => ({
       $isMobile: false,
    }),

    actions: {
        setIsMobile(payload: boolean) {
            this.$isMobile = payload
        },
    },

    getters: {
       isMobile: state => state.$isMobile
    }
});