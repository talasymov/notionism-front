<template>
    <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
        <div class="col-span-12">
            <div class="breadcrumbs">
                <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
            </div>
        </div>
        <div class="col-span-12 mt-4">
            <div class="grid grid-cols-12 gap-y-1">
                <div class="col-span-12 md:col-span-3 lg:col-span-2">
                    <button
                            class="my-button items-center justify-center w-full font-medium rounded-lg bg-black text-white p-2"
                            @click="toggleCategories"
                    >
                        Categories
                        <CategoryIcon fill="white"/>
                    </button>
                </div>
                <div class="col-span-0 md:col-span-4 lg:col-span-6"/>
                <div class="col-span-12 md:col-span-5 lg:col-span-4">
                    <div v-if="false" class="relative">
                        <input
                                type="text"
                                class="py-1.5 px-3 w-full rounded-lg bg-gray-200 border-2 transition border-gray-0 hover:border-gray-500 focus:bg-transparent"
                                placeholder="Search"
                                :value="search" @change="search = $event.target.value"
                        >
                        <MagnifyIcon class="pointer-events-none absolute top-[50%] translate-y-[-50%] right-[20px]"/>
                    </div>
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-show="categoriesMenuModel" class="col-span-12 pt-4">
                <div class="grid grid-cols-12 gap-x-4 gap-y-4">
                    <div v-for="category in categories" class="col-span-12 md:col-span-4 lg:col-span-3">
                        <h4 class="text-lg font-semibold">{{ category.name }}</h4>
                        <ul class="mt-2">
                            <li v-for="tag in tags[category.id]"
                                class="px-1 rounded-lg hover:bg-gray-100 transition active:bg-gray-200">
                                <NuxtLink :to="`/${tag.slug}`">
                                    <div class="w-full flex flex-nowrap justify-between items-center">
                                        <span class="w-5/6 truncate text-base">{{ tag.icon }} {{ tag.name }}</span>
                                        <span class="w-1/6 text-right font-light text-gray-400">{{
                                                tag.templates_count
                                            }}</span>
                                    </div>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <div v-if="Array.isArray(banners) && banners.length > 0" class="col-span-12 mt-4">
            <template-library-banners-carousel :banners="banners"/>
        </div>
        <div class="col-span-12 mt-6">
            <div class="grid grid-cols-6 gap-x-[22px] gap-y-[44px]">
                <TemplateCard
                        v-for="template in templates"
                        :key="template.id"
                        :template="template"
                />
            </div>

            <template v-if="isLoading">
                <div class="flex justify-center">
                    <div class="bg-black text-white rounded-lg inline-block gap-4 text-center loading p-4 min-w-[360px]">
                        Loading more content
                    </div>
                </div>
            </template>
            <span ref="loadMoreIntersectDOMElement" class="md:mb-32"/>
            <div class="col-span-12 mt-[44px] mb-[100px]">
                <feedback-bite-section :data="feedbackBiteSectionData"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";
import {Ref, ref} from "vue";
import {Category, Template, Tag} from "~/types/template-library/types";
import {TEMPLATE_LIBRARY_BREADCRUMBS} from "~/utils/defaultData";
import {Paginator} from "~/types/globalTypes";
import MagnifyIcon from "~/components/icons/MagnifyIcon.vue";
import CategoryIcon from "~/components/icons/CategoryIcon.vue";
import TemplateCard from "~/components/UI/TemplateCard.vue";
import FeedbackBiteSection from "~/components/UI/FeedbackBiteSection.vue";
import {useDefaultStore} from "~/store";

useHead({
    title: 'Hand-crafted Notion Templates - Notionism.org',
    meta: [
        {
            name: 'description',
            content: 'Browse the collection of ready-to-use Notion templates from the Notionism team. Jumpstart your Notion workspace setup with pre-made solutions!'
        }
    ],
    link: [
        {rel: 'icon', href: '/favicon.ico'}
    ]
})

const defaultStore = useDefaultStore()
const breadcrumbs = TEMPLATE_LIBRARY_BREADCRUMBS
const feedbackBiteSectionData = {
    title: 'Couldn\'t find a template that suits you? Suggest your own!',
    text: 'We read all your suggestions and implement them if possible. Posting your suggestion in our feedback system you repeatedly increase the chance that this widget will appear in the list.',
    linkText: 'Suggest template',
    to: '/feedback',
}
const categoriesMenuModel = ref(false)
const search = ref('')
const page = ref(1)
const hasNextPage = ref(true)
const templates = ref<Template[]>([])
const loadMoreIntersectDOMElement = ref<Element | null>(null)
const isLoading = ref(false)
const banners = ref([])

async function loadMoreCards() {
    if (!hasNextPage.value) return

    isLoading.value = true

    const {data: templatesPaginator}: { data: Ref<Paginator<Template>> } =
        await useAsyncData('templatesPaginator', () => useBaseFetch(`templates?page=${page.value}`))

    isLoading.value = false

    templates.value = [...templates.value, ...templatesPaginator.value.data]

    page.value++

    if (!templatesPaginator.value.links.next) hasNextPage.value = false
}

await loadMoreCards()
await fetchKits()

async function fetchKits() {
    try {
        const url = 'kits'

        const resp = await useBaseFetch(url)

        if (resp && resp.data) {
            banners.value = resp.data
        }
    } catch (e) {
        console.error(e)
    }
}

function initLoadMoreObserver() {
    const observer =
        new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && loadMoreCards(), {
            rootMargin: "-150px 0px 0px 0px"
        }));
    if (loadMoreIntersectDOMElement.value) observer.observe(loadMoreIntersectDOMElement.value)
}

function toggleCategories() {
    categoriesMenuModel.value = !categoriesMenuModel.value
}

const {data: categories}: { data: Ref<Category[]> } = useLazyAsyncData('categories', () => useBaseFetch('categories'))
const {data: tags}: { data: Ref<Tag[][]> } = useLazyAsyncData('tags', () => useBaseFetch('tags'))


onMounted(() => {
    initLoadMoreObserver()
})
</script>