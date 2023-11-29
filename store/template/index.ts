import {defineStore} from "pinia";
import {useLocalStorage} from "#imports";
import {Template} from "~/types/template-library/types";
import {RemovableRef} from "@vueuse/core";

export const useTemplateStore = defineStore('template', {
    state: () => ({
        $likes: useLocalStorage('/template/likes', {}) as RemovableRef<any>,
    }),

    actions: {
        async toggleLike(template: any) {
            this.$likes[template.id] = this.$likes[template.id]
                ? !this.$likes[template.id]
                : true

            let type = this.$likes[template.id] ? 'like' : 'dislike'

            await useAsyncData(`templates/${template.slug}/` + type, () => useBaseFetch(`templates/${template.slug}/` + type, {method: 'PUT'}))
        },

        isLiked(template: Template): Boolean {
            return this.$likes[template.id] ?? false
        }
    },

    getters: {
        likes: (state) => state.$likes,
    }
})