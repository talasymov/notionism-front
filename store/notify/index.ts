import {defineStore} from "pinia";
import {hash} from "ohash";
import {NotifyMessage} from "~/store/notify/types";

export const useNotifyStore = defineStore('notify', {
    state: () => ({
        $notifications:[] as Array<NotifyMessage>
    }),

    actions: {
        notify(message: NotifyMessage) {
            const id = hash(message.message)

            this.$notifications.push({
                id: id,
                type: message.type,
                message: message.message,
                time: setTimeout(():void => this.deleteMessage(id), 5000),
            })
        },
        deleteMessage(hash: string){
            this.$notifications = this.$notifications.filter((item) => item.id !== hash)
        }
    },

    getters: {
        notifications: (state) => state.$notifications,
    }
});