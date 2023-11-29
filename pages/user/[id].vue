<template>
  <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
    <div class="col-span-12">
      <div class="breadcrumbs">
        <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
      </div>
    </div>
  </div>
  <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
    <div class="col-span-12 mt-6">
      <div class="grid grid-cols-6 gap-x-[22px] gap-y-[44px]">
        <div class="col-span-6 md:col-span-3 lg:col-span-2 p-1">
          <div class="w-full rounded-3xl sticky top-10 mb-10 md:mb-0 shadow-2xl">
            <img :src="user_info.avatar" alt="Template preview"
                 class="w-full bg-gray-500 h-80 rounded-3xl object-cover">
          </div>
        </div>
        <div class="col-span-6 md:col-span-3 lg:col-span-4 p-1">
          <div class="w-full">
            <div class="text-[22px] font-semibold">
              {{ user.name }}
            </div>
            <div class="py-4">
              {{ user_info.bio }}
            </div>
            <div>
              <p><b>Joined</b>: {{ moment(user.created_at).fromNow() }}</p>
              <p><b>Templates</b>: {{ total_templates }}</p>
            </div>
            <div class="my-6">
              <div class="flex gap-x-5">
                <a v-if="user_info.linkedin" :href="user_info.linkedin" target="_blank" rel="nofollow ugc">
                  <Linkedin class="h-6"/>
                </a>
                <a v-if="user_info.youtube" :href="user_info.youtube" target="_blank" rel="nofollow ugc">
                  <YouTube class="h-6"/>
                </a>
                <a v-if="user_info.twitter" :href="user_info.twitter" target="_blank" rel="nofollow ugc">
                  <Twitter class="h-6"/>
                </a>
                <a v-if="user_info.website" :href="user_info.website" target="_blank" rel="nofollow ugc">
                  <GlobeOutline class="h-6"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
    <div class="col-span-12 mt-6">
      <h2 class="text-[22px] font-semibold">My templates</h2>
    </div>
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
import {USER_PROFILE_BREADCRUMBS} from "~/utils/defaultData";
import Linkedin from "~/components/icons/Linkedin.vue";
import YouTube from "~/components/icons/YouTube.vue";
import Twitter from "~/components/icons/Twitter.vue";
import GlobeOutline from "~/components/icons/GlobeOutline.vue";
import TemplateCard from "~/components/UI/TemplateCard.vue";
import {Ref, ref} from "vue";
import {Template} from "~/types/template-library/types";
import {Paginator} from "~/types/globalTypes";
import moment from "moment";

const templates = ref<Template[]>([])
const breadcrumbs = USER_PROFILE_BREADCRUMBS;
const route = useRoute()
const page = ref(1)
const hasNextPage = ref(true)
const total_templates = ref(0)

const {data: user} = await useAsyncData(`user/${route.params.id}`, () => useBaseFetch(`user/${route.params.id}`))

if (!user.value){
  throw createError({
    statusCode: 404,
    message: 'User Not Found',
  })
}

const user_info = user.value.user_info

useHead({
  title: user.value.name,
  link: [
    {rel: 'icon', href: '/favicon.ico'}
  ]
})

const loadMoreIntersectDOMElement = ref<Element | null>(null)

async function loadMoreCards() {
  if (!hasNextPage.value) return

  const {data: templatesPaginator}: { data: Ref<Paginator<Template>> } =
      await useAsyncData('templatesPaginator', () => useBaseFetch(`templates?page=${page.value}&user=${route.params.id}`))

  total_templates.value = templatesPaginator.value.meta.total
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
  if (loadMoreIntersectDOMElement.value) observer.observe(loadMoreIntersectDOMElement.value)
}

onMounted(() => {
  initLoadMoreObserver()
})
</script>