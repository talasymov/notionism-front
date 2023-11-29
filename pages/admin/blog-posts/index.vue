<template>
  <div>
    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-2xl">Blog</h1>
        <FormPrimaryButton @click="create">Create New</FormPrimaryButton>
      </div>
      <table class="w-full text-base text-left text-gray-500 mt-10">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-3 px-6">
            Title
          </th>
          <th scope="col" class="py-3 px-6">
            Slug
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr v-for="post in posts"
            class="bg-white border-b hover:bg-gray-50">
          <td class="py-4 px-6">
            <NuxtLink :href="`/admin/blog-posts/${post.id}`">
              {{ post.title }}
            </NuxtLink>
          </td>
          <td class="py-4 px-6">
            {{ post.slug }}
          </td>
          <td class="py-4">
            <PrimaryButton @click="deletePost(post.id)">Delete</PrimaryButton>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup type="ts">
import PrimaryButton from "~/components/form/PrimaryButton.vue";

definePageMeta({
  middleware: ['auth'],
  layout: 'authorized'
})
const router = useRouter()

const {data: {value: {posts: posts}}} = await useAsyncData('dashboard/blog-posts', () => useBaseFetch('dashboard/blog-posts'))

const create = async () => await useAsyncData('dashboard/blog-posts/create', () => useBaseFetch('dashboard/blog-posts', {
  method: 'POST'
})).then((resp) => router.push({'path': '/dashboard/blog-posts/' + resp.data.value.post.id}))

const deletePost = async (post_id) => await useAsyncData('dashboard/blog-posts/delete', () => useBaseFetch(`dashboard/blog-posts/${post_id}`, {
  method: 'DELETE'
})).then(() => useNotify({
  message: 'Deleted',
  type: 'info'
}))
</script>

<style scoped>

</style>