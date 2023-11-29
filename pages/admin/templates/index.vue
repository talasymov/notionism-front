<template>
  <div>
    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-2xl">Templates</h1>
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
        <tr v-for="template in templates"
            class="bg-white border-b hover:bg-gray-50">
          <td class="py-4 px-6">
            <NuxtLink :href="`/admin/templates/${template.id}`">
              {{ template.title }}
            </NuxtLink>
          </td>
          <td class="py-4 px-6">
            {{ template.slug }}
          </td>
          <td class="py-4">
<!--            <PrimaryButton @click="deleteTemplate(template.id)">Delete</PrimaryButton>-->
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

const {data: {value: {templates: templates}}} = await useAsyncData('dashboard/templates', () => useBaseFetch('dashboard/templates'))

const create = async () => await useAsyncData('dashboard/templates/create', () => useBaseFetch('dashboard/templates', {
  method: 'POST'
})).then((resp) => router.push({'path': '/dashboard/templates/' + resp.data.value.template.id}))

// const deleteTemplate = async (template_id) => await useAsyncData('dashboard/template/delete', () => useBaseFetch(`dashboard/templates/${template_id}`, {
//   method: 'DELETE'
// })).then(() => useNotify({
//   message: 'Deleted',
//   type: 'info'
// }))
</script>

<style scoped>

</style>