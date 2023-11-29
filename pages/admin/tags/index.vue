<template>
  <div>
    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-2xl">Tags</h1>
        <FormPrimaryButton @click="create">Create New</FormPrimaryButton>
      </div>
      <table class="border-collapse table-auto w-full text-base mt-10">
        <thead>
        <tr>
          <th class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
            Name
          </th>
          <th class="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
            Slug
          </th>
          <th class="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
            Icon
          </th>
          <th class="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
            Category
          </th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr v-for="tag in tags">
          <td class="border-b border-slate-100 p-4 pl-8 text-slate-500">
            <NuxtLink :href="`/admin/tags/${tag.id}`">
              {{ tag.name }}
            </NuxtLink>
          </td>
          <td class="border-b border-slate-100 p-4 text-slate-500">
            {{ tag.slug }}
          </td>
          <td class="border-b border-slate-100 p-4 pr-8 text-slate-500">
            {{ tag.icon }}
          </td>
          <td class="border-b border-slate-100 p-4 text-slate-500">
            {{ tag.category.name }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup type="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'authorized'
})
const router = useRouter()

const {data: {value: {tags: tags}}} = await useAsyncData('dashboard/tags', () => useBaseFetch('dashboard/tags'))

const create = async () => await useAsyncData('dashboard/tags/create', () => useBaseFetch('dashboard/tags', {
  method: 'POST'
})).then((resp) => router.push({'path': '/dashboard/tags/' + resp.data.value.tag.id}))
</script>