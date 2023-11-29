<template>
  <div class="container max-w-6xl mx-auto p-4">
      <div>
          <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
      </div>
      <div class="flex mt-8 flex-wrap md:flex-nowrap">
          <div class="w-full md:w-1/2 md:pr-14">
              <div class="w-full border border-gray-200 rounded-xl sticky top-10 mb-10 md:mb-0">
                  <img :src="post.preview" alt="Post preview" class="w-full h-52 rounded-t-xl object-cover">
                  <div class="progress bg-gray-100 h-1.5">
                      <div class="progress-line bg-red-500 h-1.5" :style="`width: ${progress}`"></div>
                  </div>
                  <div class="blog-post-sidebar p-3">
                      <div class="subheader py-2 text-base text-gray-400">Table of contents</div>
                      <ol>
                          <li v-for="header in headers">
                              <a :href="`#${header.slug}`" class="text-gray-600 hover:text-red-500">{{ header.text }}</a>
                              <ol v-if="header.children && header.children.length !== 0">
                                  <li v-for="sub_header in header.children">
                                      <a :href="`#${sub_header.slug}`" class="text-gray-600 hover:text-red-500">{{ sub_header.text }}</a>
                                  </li>
                              </ol>
                          </li>
                      </ol>
                  </div>
              </div>
          </div>
          <div class="w-full">
              <h1 class="text-xl md:text-[42px] leading-[1.25] font-bold">{{ post.name }}</h1>
              <div class="w-full flex flex-nowrap justify-between my-4">
                  <div class="flex flex-nowrap items-center gap-2">
                      <span>by</span>
                      <a :href="`/user/${post.user_id}`" class="font-semibold underline decoration-gray-400">
                          {{ post.user.name }}
                      </a>
                      <div>
                          <LikeComponent variant="small" :template="post"/>
                      </div>
                  </div>
                  <div class="text-base font-light text-gray-500 flex items-center space-x-2">
                      <div>{{ moment(post.created_at).fromNow() }}</div>
                      <CalendarIcon class="opacity-40 h-6"/>
                  </div>
              </div>
              <div v-html="post.html" class="notion-page pb-10"></div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import LikeComponent from "~/components/template-library/LikeComponent.vue";
import CalendarIcon from "~/components/icons/CalendarIcon.vue";
import moment from "moment";
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";

const route = useRoute()

const {
  data: {
    value: {
      post: post,
      headers: headers
    }
  }
} = await useAsyncData(`blog/${route.params.slug}`, () => useBaseFetch(`blog/${route.params.slug}`))

useHead({
  title: post.title,
  meta: [
    {name: 'description', content: post.desc}
  ],
  link: [
    {rel: 'icon', href: '/favicon.ico'}
  ]
})

const like = async () => await useAsyncData(`blog/${route.params.slug}/like`, () => {
  post.likes++
  return useBaseFetch(`blog/${route.params.slug}/like`, {method: 'PUT'})
})

const breadcrumbs = [
    ...BASE_BREADCRUMBS,
    {
        id: 61239,
        html:'Blog',
        path: '/blog'
    },
    {
        id: 5624,
        html: post.name,
        disabled: true,
    }
]

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