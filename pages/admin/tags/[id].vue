<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
      <h3 class="text-xl">Edit tag</h3>
      <div class="p-4 sm:p-8 bg-white shadow-lg sm:rounded-lg">
        <section>
          <form @submit.prevent="updateTag" class="mt-6 space-y-6">
            <div>
              <TextInput v-model="form.name" label="Name"/>
            </div>

            <div>
              <TextInput v-model="form.slug" label="Slug"/>
            </div>

            <div>
              <TextInput v-model="form.icon" label="Icon"/>
            </div>

            <div>
              <Select v-model="form.tag_id" :options="tags" label="Parent tag"/>
            </div>

            <div>
              <Select v-model="form.category_id" :options="categories" label="Categories"/>
            </div>

            <div class="flex items-center gap-4">
              <PrimaryButton>Save</PrimaryButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup type="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'authorized'
})
import Select from "~/components/form/Select.vue";
import TextInput from "~/components/form/TextInput.vue";
import PrimaryButton from "~/components/form/PrimaryButton.vue";

const route = useRoute()

const id = route.params.id

const {
  data: {
    value: {
      categories,
      tags,
      tag
    }
  }
} = await useAsyncData('/dashboard/tags/' + id, () => useBaseFetch(`dashboard/tags/${id}/edit`))

const form = reactive(tag)

const updateTag = async () => await useAsyncData(`dashboard/tags/${id}`, () => useBaseFetch(`dashboard/tags/${id}`, {
      method: 'PUT',
      body: form
    })
        .then(() => useNotify({message: 'Updated', type: 'success'}))
        .catch(() => useNotify({message: 'Error, check form', type: 'error'}))
)
</script>