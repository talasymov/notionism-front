<template>
  <div>
    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-2xl">Widgets</h1>
      </div>
      <table class="w-full text-base text-left text-gray-500 mt-10">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-3 px-6">
            Codename
          </th>
          <th scope="col" class="py-3 px-6">
            Slug
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr v-for="widget in widgets"
            class="bg-white border-b hover:bg-gray-50">
          <td class="py-4 px-6">
            <NuxtLink :href="`/admin/widgets/${widget.id}`">
              {{ widget.codename }}
            </NuxtLink>
          </td>
          <td class="py-4 px-6">
            {{ widget.slug }}
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

const {data: {value: {widgets: widgets}}} = await useAsyncData('dashboard/widgets', () => useBaseFetch('dashboard/widgets'))
</script>

<style scoped>

</style>