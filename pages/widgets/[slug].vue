<template>
    <div class="container max-w-6xl mx-auto p-4">
        <div>
            <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
        </div>
        <div class="flex flex-wrap md:flex-nowrap mt-8">
            <div class="w-full md:w-1/2 md:pr-14">
                <div class="w-full border border-gray-200 rounded-xl sticky top-10 mb-10 md:mb-0">
                    <img :src="widget.preview" alt="Template preview"
                         class="w-full bg-gray-500 h-52 rounded-t-xl object-cover">
                    <div class="progress bg-gray-100 h-1.5">
                        <div class="progress-line bg-red-500 h-1.5" :style="`width: ${progress}`"></div>
                    </div>
                    <div class="w-full p-4">
                        <div v-if="widget.tags.length > 0" class="my-4 w-full">
                            <span class="text-xs font-bold">Perfect for</span>
                            <div class="flex flex-wrap w-full justify-between mt-1">

                                <div
                                        v-for="tag in widget.tags"
                                        :key="tag.id"
                                        class="text-xs w-1/2 truncate cursor-pointer text-ellipsis p-[4px] rounded-md hover:bg-gray-200 transition"
                                        :class="{'hidden' : widget.tags.indexOf(tag) > 4 && !more}"
                                        :title="tag.name"
                                >
                                    <a :href="`/${tag.slug}`">
                                        {{ tag.icon }} {{ tag.name }}
                                    </a>
                                </div>

                                <div
                                        v-if="!more && widget.tags.length > 5"
                                        class="w-full font-semibold text-base text-center cursor-pointer p-[4px] rounded-md hover:bg-gray-200 transition"
                                        @click="more=true"
                                >
                                    +5 more
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-nowrap justify-between items-center mt-4 pt-4">
                            <client-only>
                                <nuxt-link to="/login" class="my-button px-5 py-2 my-button--primary rounded-lg">
                                    Try Widget
                                </nuxt-link>
                            </client-only>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <h1 class="text-xl md:text-[42px] leading-[1.25] font-bold">{{ widget.name }}</h1>
                <div class="w-full flex flex-nowrap justify-between my-4">
                    <div class="text-base font-light text-gray-500 flex items-center space-x-2">
                        <div>{{ moment(widget.publishing_at).fromNow() }}</div>
                        <CalendarIcon class="opacity-40 h-6"/>
                    </div>
                </div>
                <div v-html="widget.html" class="notion-page pb-10"></div>
            </div>
        </div>
    </div>
</template>

<script setup type="ts">
import moment from "moment";
import CalendarIcon from "~/components/icons/CalendarIcon.vue";
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";
import {BASE_BREADCRUMBS} from "~/utils/defaultData";

const route = useRoute()
const more = ref(false)
const {data: widget} = await useAsyncData(`widgets/${route.params.slug}`, () => useBaseFetch(`widgets/${route.params.slug}`))

if (!widget.value) {
    throw createError({
        statusCode: 404,
        message: 'Widget Not Found',
    })
}


const breadcrumbs = [
    ...BASE_BREADCRUMBS,
    {
        id: 421412,
        html: 'Widget Library',
        path:'/widgets'
    },
    {
        id: 23213,
        html: widget.value.title,
        disabled: true,
    }
]

useHead({
    title: widget.value.title,
    meta: [
        {name: 'description', content: widget.value.desc}
    ],
    link: [
        {rel: 'icon', href: '/favicon.ico'}
    ]
})

const progress = ref('0%')

const updateProgressIndicator = () => {
    const {documentElement, body} = document;
    let windowScroll = body.scrollTop || documentElement.scrollTop;
    let height = documentElement.scrollHeight - documentElement.clientHeight;
    progress.value = (windowScroll / height) * 100 + "%";
}

onMounted(() => {
    window.addEventListener("scroll", updateProgressIndicator);
})
</script>