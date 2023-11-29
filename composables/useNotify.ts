import {useNotifyStore} from "~/store/notify";

export const useNotify = (message: any) => {
    const useNotify = useNotifyStore()

    useNotify.notify(message)
}