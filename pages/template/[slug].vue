<template>
    <div class="container max-w-6xl mx-auto p-4">
        <div>
            <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
        </div>
        <div class="mt-8 flex flex-wrap md:flex-nowrap">
            <div class="w-full md:w-1/2 md:pr-14">
                <div class="w-full border border-gray-200 rounded-xl sticky top-10 mb-10 md:mb-0">
                    <img :src="template.preview" alt="Template preview"
                         class="w-full bg-gray-500 h-52 rounded-t-xl object-cover">
                    <div class="progress bg-gray-100 h-1.5">
                        <div class="progress-line bg-red-500 h-1.5" :style="`width: ${progress}`"></div>
                    </div>
                    <div class="w-full p-4">
                        <div class="w-full flex flex-nowrap justify-between">
                            <div>
                                <div class="font-bold leading-normal text-[22px]">{{ template.dbs }}</div>
                                <div class="font-light text-xs">Databases</div>
                            </div>
                            <div>
                                <div class="font-bold text-[22px]">{{ template.props }}</div>
                                <div class="font-light text-xs">Properties</div>
                            </div>
                            <div>
                                <div class="font-bold text-[22px]">{{ template.pages }}</div>
                                <div class="font-light text-xs">Pages</div>
                            </div>
                        </div>
                        <div v-if="template.tags.length > 0" class="my-4 w-full">
                            <span class="text-xs font-bold">Perfect for</span>
                            <div class="flex flex-wrap w-full justify-between mt-1">

                                <div
                                        v-for="tag in template.tags"
                                        :key="tag.id"
                                        class="text-xs w-1/2 truncate cursor-pointer text-ellipsis p-[4px] rounded-md hover:bg-gray-200 transition"
                                        :class="{'hidden' : template.tags.indexOf(tag) > 4 && !more}"
                                        :title="tag.name"
                                >
                                    <a :href="`/${tag.slug}`">
                                        {{ tag.icon }} {{ tag.name }}
                                    </a>
                                </div>

                                <div
                                        v-if="!more && template.tags.length > 5"
                                        class="w-full font-semibold text-base text-center cursor-pointer p-[4px] rounded-md hover:bg-gray-200 transition"
                                        @click="more=true"
                                >
                                    +5 more
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-nowrap justify-between items-center mt-4 pt-4">
                            <div class="text-[22px] font-semibold">
                                {{ template.price > 0 ? template.price + '$' : 'Free' }}
                            </div>
                            <a class="my-button px-5 py-2 my-button--primary rounded-lg"
                               :href="template.link"
                               target="_blank">
                                Use Template
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <h1 class="text-xl md:text-[42px] leading-[1.25] font-bold">{{ template.name }}</h1>
                <div class="w-full flex flex-nowrap justify-between my-4">
                    <div class="flex flex-nowrap items-center gap-2">
                        <span>by</span>
                        <a :href="`/user/${template.user_id}`" class="font-semibold underline decoration-gray-400">
                            {{ template.user.name }}
                        </a>
                        <div>
                            <LikeComponent variant="small" :template="template"/>
                        </div>
                    </div>
                    <div class="text-base font-light text-gray-500 flex items-center space-x-2">
                        <div>{{ moment(template.publishing_at).fromNow() }}, v{{ template.ver }}</div>
                        <CalendarIcon class="opacity-40 h-6"/>
                    </div>
                </div>
                <div v-html="template.html" class="notion-page pb-10"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from "moment";
import LikeComponent from "~/components/template-library/LikeComponent.vue";
import CalendarIcon from "~/components/icons/CalendarIcon.vue";
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";

const route = useRoute()
const more = ref(false)

const {data: template} = await useAsyncData(`templates/${route.params.slug}`, () => useBaseFetch(`templates/${route.params.slug}`))

if (!template.value) {
    throw createError({
        statusCode: 404,
        message: 'Template Not Found',
    })
}

useHead({
    title: template.value.title,
    meta: [
        {name: 'description', content: template.value.desc}
    ],
    link: [
        {rel: 'icon', href: '/favicon.ico'}
    ]
})

const breadcrumbs = [
    ...BASE_BREADCRUMBS,
    {
        id: 61239,
        html: 'Template Library',
        path: '/template-library'
    },
    {
        id: 61239,
        html: template.value.name,
        disabled: true,
    }
]

const like = async () => await useAsyncData(`templates/${route.params.slug}/like`, () => useBaseFetch(`templates/${route.params.slug}/like`, {method: 'PUT'}).then(() => template.value.likes++))

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