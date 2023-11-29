<template>
  <div class="container max-w-6xl m-auto p-4 blog-page">
    <div class="max-w-[570px] m-auto text-center relative py-4">
      <h1 class="text-xl font-bold">
        Find out more in our Notionism blog ✨ ️
      </h1>
      <h2 class="text-base mt-1">
        Guide, news, stories, and more on our blog. Upgrade your skills and develop in our community
      </h2>
    </div>
    <div class="font-semibold text-base">Recent posts</div>
    <div class="grid grid-cols-12 gap-[22px] mt-2">
      <article v-for="article in posts" :key="article.id" class="col-span-12 md:col-span-6 lg:col-span-3 min-h-[360px]">
        <a :href="'/blog/' + article.slug">
          <img :src="article.preview" :alt="article.name"
               class="h-[185px] w-full object-cover rounded-xl transition hover:scale-[0.98] active:scale-[0.97]"/>
        </a>
        <div class="p-2">
          <div class="text-[14px] text-gray-400">
            {{ moment(article.created_at).fromNow() }}
          </div>
          <a :href="'/blog/' + article.slug">
            <h2 class="font-bold text-[22px] hover:text-rose-600">{{ article.name }}</h2>
          </a>
          <p class="text-[18px] mt-2">
            {{ article.desc }}
          </p>
        </div>
      </article>
    </div>
    <span ref="loadMoreIntersect" class="md:mb-32"/>
  </div>
</template>

<script setup lang="ts">
import BlogBgLight from "~/components/icons/BlogBgLight.vue";
import {Paginator} from "~/types/globalTypes";
import {Article} from "~/types/blog/types";
import {Ref} from "vue";
import moment from "moment";

useHead({
  title: 'Notionism’s Blog: How-to’s and Tips to Learn Notion',
  meta: [
    {
      name: 'description',
      content: 'Learn Notion’s best practices, how-to’s and tips to became a better notionist or spread your word across Notion community to help others.'
    }
  ],
  link: [
    {rel: 'icon', href: '/favicon.ico'}
  ]
})
const {data: categories} = useAsyncData('categories', () => useBaseFetch('categories'))
const {data: tags} = useAsyncData('tags', () => useBaseFetch('tags'))

const page = ref(1)
const has_next_page = ref(true)
const posts: Ref<Article[]> = ref([])
const openFilter = ref(false)

posts.value = []

const loadMore = async () => {
  if (!has_next_page.value) {
    return
  }

  const new_items: Paginator<Article> = (await useAsyncData('blog/posts', () => useBaseFetch(`blog/posts?page=${page.value}`))).data.value

  posts.value = [...posts.value, ...new_items.data]
  page.value++

  if (new_items.links.next === null) {
    has_next_page.value = false
  }
}

await loadMore()

const loadMoreIntersect = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && loadMore(), {
    rootMargin: "-150px 0px 0px 0px"
  }));

  if (loadMoreIntersect.value) observer.observe(loadMoreIntersect.value)
})
</script>

<style scoped>

</style>