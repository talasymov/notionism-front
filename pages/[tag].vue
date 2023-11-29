<template>
  <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
    <div class="col-span-12">
      <div class="breadcrumbs">
        <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
      </div>
    </div>
    <div class="col-span-12 mt-6">
      <div class="grid grid-cols-12 gap-y-1">
        <div class="col-span-12 md:col-span-3 lg:col-span-2">
          <button
              class="my-button items-center justify-center w-full font-medium rounded-lg bg-black text-white p-2"
              @click="toggleCategories"
          >
            Categories <CategoryIcon fill="white"/>
          </button>
        </div>
        <div class="col-span-0 md:col-span-4 lg:col-span-6"/>
        <div class="col-span-12 md:col-span-5 lg:col-span-4">
          <div class="relative">
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
              <li v-for="tag in tags[category.id]" class="px-1 rounded-lg hover:bg-gray-100 transition active:bg-gray-200">
                <NuxtLink :to="`/${tag.slug}`">
                  <div class="w-full flex flex-nowrap justify-between items-center">
                    <span class="w-5/6 truncate text-base">{{ tag.icon }} {{ tag.name }}</span>
                    <span class="w-1/6 text-right font-light text-gray-400">{{ tag.templates_count }}</span>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div class="col-span-12 mt-6">
      <div class="grid grid-cols-6 gap-x-[22px] gap-y-[44px]">
        <TemplateCard
            v-for="template in templates"
            :key="template.id"
            :template="template"
        />
      </div>
      <span ref="loadMoreIntersectDOMElement" class="md:mb-32"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";
import { ref} from "vue";
import type {Ref} from "vue"
import {Category, Template, Tag} from "~/types/template-library/types";
import {Paginator} from "~/types/globalTypes";
import MagnifyIcon from "~/components/icons/MagnifyIcon.vue";
import CategoryIcon from "~/components/icons/CategoryIcon.vue";
import TemplateCard from "~/components/UI/TemplateCard.vue";

const route = useRoute()

const getTagName = computed(():string => {
  if(typeof route.params.tag === 'string') return route.params.tag.replaceAll('-',' ')
  return 'Tag'
})

const {data: tag} = await useAsyncData(`tags/${route.params.tag}`, () => useBaseFetch(`tags/${route.params.tag}`))

if (!tag.value){
  throw createError({
    statusCode: 404,
    message: 'Tag Not Found',
  })
}

useHead({
  title: `${getTagName.value} Notion Templates - Notionism.org`,
  meta: [
    {
      name: 'description',
      content: `Get the best ${getTagName.value} Notion templates. Boost your productivity with ready to use custom-made ${getTagName.value} templates for Notion!`
    },
    {name: 'robots', content: 'noindex'},
  ],
  link: [
    {rel: 'icon', href: '/favicon.ico'}
  ]
})

const breadcrumbs = [
  {
    id: 0,
    test: 1,
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9036 4.85667C12.7971 3.94825 11.2029 3.94825 10.0964 4.85667L4.73093 9.26165C4.2682 9.64155 4 10.2087 4 10.8074V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.8074C20 10.2087 19.7318 9.64155 19.2691 9.26165L13.9036 4.85667ZM8.82732 3.31089C10.6715 1.79684 13.3285 1.79684 15.1727 3.31089L20.5381 7.71587C21.4636 8.47565 22 9.61006 22 10.8074V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V10.8074C2 9.61006 2.53641 8.47565 3.46186 7.71587L8.82732 3.31089Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C8 14.3431 9.34315 13 11 13H13C14.6569 13 16 14.3431 16 16V21H14V16C14 15.4477 13.5523 15 13 15H11C10.4477 15 10 15.4477 10 16V21H8V16Z" fill="black"/>
  </svg> Home`,
    path: '/'
  },
  {
    id: 1,
    html: 'Template Library',
    disabled: false,
    path: '/template-library'
  },
  {
    id:2,
    html: `<span style="text-transform: capitalize">${getTagName.value}</span>`,
    disabled: true,
  }
]

const categoriesMenuModel = ref(false)
const search = ref('')
const page = ref(0)
const hasNextPage = ref(true)
const templates = ref<Template[]>([])
const loadMoreIntersectDOMElement = ref<Element | null>(null)

const blackButtonCss = 'my-button rounded-3xl bg-black text-base font-semibold items-center text-white flex px-3 py-2 gap-4'
const whiteButtonCss = 'my-button hover:bg-gray-100 rounded-3xl text-base font-semibold flex items-center border-gray-200 border-2 px-3 py-2 gap-4'

async function loadMoreCards() {
  if(!hasNextPage.value) return

  const { data:templatesPaginator } :{data:Ref<Paginator<Template>>} =
      await useAsyncData('templatesPaginator', () => useBaseFetch(`templates?page=${page.value}&tag=${route.params.tag}`))

  templates.value = [...templates.value, ...templatesPaginator.value.data]

  page.value++

  if (!templatesPaginator.value.links.next) hasNextPage.value = false
}

await loadMoreCards()

function initLoadMoreObserver() {
  const observer =
      new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && loadMoreCards(), {
        rootMargin: "-150px 0px 0px 0px"
      }));
  if(loadMoreIntersectDOMElement.value) observer.observe(loadMoreIntersectDOMElement.value)
}

function toggleCategories() {
  categoriesMenuModel.value = !categoriesMenuModel.value
}

const {data: categories}: {data: Ref<Category[]>} = useLazyAsyncData('categories', () => useBaseFetch('categories'))
const {data: tags}:{data:Ref<Tag[][]>} = useLazyAsyncData('tags', () => useBaseFetch('tags'))


onMounted(() => {
  initLoadMoreObserver()
})
</script>