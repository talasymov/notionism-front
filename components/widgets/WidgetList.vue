<template>
    <div>
        <div class="w-full grid grid-cols-4 gap-2">
            <template v-if="loadingWidgets">
                <div v-for="skeleton in [0,1,2,3,4,5]" :key="skeleton"
                     class="skeleton loading col-span-2 min-h-[400px]"/>
            </template>
            <template v-else>
                <div
                        v-for="widget in widgetsItems"
                        class="col-span-4 md:col-span-2 min-h-[400px] rounded-[18px] bg-contain group overflow-hidden"
                        :style="{'background-image':`url(${widget.preview})`,'background-repeat': 'no-repeat','background-size': 'cover', 'background-position':'center'}"
                >
                    <div class="opacity-0 p-8 group-hover:opacity-100 transition bg-[rgba(0,0,20,0.8)] w-full h-full inline-block flex justify-between flex-col">
                        <div class="text-white">
                            <h2 class="text-4xl font-bold">{{ widget.name }}</h2>
                            <div class="leading-[150%] text-lg mt-2">
                                {{ widget.desc }}
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <a v-if="ssr" :href="`/widgets/${widget.slug}`"
                               class="my-button bg-white text-black mr-4">
                                About
                                <about-icon class="ml-2"/>
                            </a>
                            <NuxtLink v-else :to="`/widgets/${widget.slug}`" target="_blank"
                                      class="my-button bg-white text-black mr-4">
                                About
                                <about-icon class="ml-2"/>
                            </NuxtLink>
                            <client-only>
                                <NuxtLink @click="createUserWidget(widget.codename)"
                                          :class="`my-button ${loadingCreateNewWidget ? 'loading' : ''} cursor-pointer my-button--primary`">
                                    Create new one
                                    <explore-icon fill="white" class="ml-2"/>
                                </NuxtLink>
                            </client-only>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <span ref="loadMoreIntersectDOMElement" class="md:mb-32"/>
        <my-dialog v-model="authDialogModel" close-btn max-width="790px">
            <div class="relative bg-white px-4 py-8 gap-8 flex">
                <blog-bg-light style="width: 1009px;height: 1000px;left: -381px;top: -189px; pointer-events: none" class="absolute"/>
                <div class="flex-1" style="max-width: 300px; z-index: 2;">
                    <img src="/img/home-bust.png" alt="Man Bust">
                </div>
                <div class="relative flex-1 flex flex-col justify-center">
                    <h2 class="text-2xl font-bold">Join to the Notionism community</h2>
                    <p class="mt-2">Looking for handmade templates for Notion and diverse widgets to enhance your Notion
                        experience? Look no further than <b class="gradient-text">Notionism!</b></p>
                    <div class="mt-4">
                        <nuxt-link to="/login">
                            <my-button primary size="lg" type="primary">
                                Join us
                                <icons-explore-icon fill="white"/>
                            </my-button>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </my-dialog>
    </div>
</template>

<script setup>
import EditBox from "~/components/icons/EditBoxIcon.vue";
import {useNotification} from "~/composables/useNotifications";
import ExploreIcon from "~/components/icons/ExploreIcon.vue";
import AboutIcon from "~/components/icons/AboutIcon.vue";
import {useAuthStore} from "~/store/auth";
import MyDialog from "~/components/UI/MyDialog.vue";
import MyButton from "~/components/UI/MyButton.vue";
import BlogBgLight from "~/components/icons/BlogBgLight.vue";

const props = defineProps({
    ssr: false,
})
const notifications = useNotification()
const loadingWidgets = ref(false)
const loadingCreateNewWidget = ref(false)
const widgetsItems = ref([])
const authDialogModel = ref(false)

async function fetchWidgetsData() {
    loadingWidgets.value = true

    const {data} = await useAsyncData('widgets', () => useBaseFetch('widgets'))
    widgetsItems.value = data.value.data

    loadingWidgets.value = false
}

async function createUserWidget(codename) {
    loadingCreateNewWidget.value = true

    try {
        const resp = await useBaseFetch(`dashboard/user-widgets`, {
            method: 'POST',
            body: {
                'widget_codename': codename
            }
        })

        if (resp) {
            navigateTo('/dashboard/widgets/builder/' + resp.uuid)
        }
    } catch (e) {
        if (e.status === 401 || e.status === 419) authDialogModel.value = true
        // notifications.notify({content: 'Some error, please write for us.', type: 'error'})
        console.error(e)
    } finally {
        loadingCreateNewWidget.value = false
    }
}

onMounted(() => {
    if (!props.ssr) fetchWidgetsData()
})
if (props.ssr) await fetchWidgetsData()
</script>