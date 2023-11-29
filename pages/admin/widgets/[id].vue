<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
      <h3 class="text-xl">Edit widget #[{{ widget.codename }}]</h3>
      <div class="p-4 sm:p-8 bg-white shadow-lg sm:rounded-lg">
        <section>
          <form @submit.prevent="updateWidget" class="space-y-6">
            <div class="flex items-center justify-between gap-4 sticky top-0 bg-white py-5">
              <PrimaryButton>Save</PrimaryButton>
              <a :href="'/widget/' + widget.slug" target="_blank">
                <PrimaryButton type="button">Preview</PrimaryButton>
              </a>
            </div>

            <div>
              <TextInput
                  id="title"
                  ref="titleInput"
                  v-model="form.title"
                  label="Title"
                  type="text"
                  class="mt-1 block w-full"
              />
            </div>

            <div>
              <Select
                  v-model="form.status"
                  label="Status"
                  :options="statuses"
                  class="w-full"
              />
            </div>

            <div class="flex justify-between">
              <img :src="form.preview" alt="Preview" class="w-52 rounded-xl shadow-xl">
            </div>

            <div>
              <Textarea v-model="form.desc" label="Description"/>
            </div>

            <div>
              <TextInput
                  id="slug"
                  ref="slugInput"
                  v-model="form.slug"
                  label="Slug"
                  type="text"
                  class="mt-1 block w-full"
              />
            </div>

            <div>
              <TextInput
                  id="notion_page_id"
                  ref="notionPageIdInput"
                  v-model="form.notion_page_id"
                  label="Notion page id"
                  type="text"
                  class="mt-1 block w-full"
              />
            </div>
          </form>
        </section>
      </div>
      <div class="p-4 sm:p-8 bg-white shadow-lg sm:rounded-lg">
        <div class="flex justify-between">
          <PrimaryButton type="button" @click="notionExport">Fetch Notion</PrimaryButton>

          <TextInput
              id="notion_page_id"
              ref="notionPageIdInput"
              v-model="form.notion_page_id"
              type="text"
              placeholder="Notion Page ID"
          />
        </div>

        <section v-html="widget.html" class="notion-page"></section>
      </div>
    </div>
  </div>
</template>

<script setup type="ts">
import Textarea from "~/components/form/Textarea.vue";
import Select from "~/components/form/Select.vue";
import TextInput from "~/components/form/TextInput.vue";
import PrimaryButton from "~/components/form/PrimaryButton.vue";

definePageMeta({
  middleware: ['auth'],
  layout: 'authorized'
})
const route = useRoute()

const id = route.params.id

const tag = ref(null)

const statuses = [
  {id: 'draft', name: 'draft'},
  {id: 'publish', name: 'publish'},
]

const {
  data: {
    value: {
      widget,
      tags,
    }
  }
} = await useAsyncData('/dashboard/widgets/' + id, () => useBaseFetch(`dashboard/widgets/${id}/edit`))

const form = reactive(widget)

form._method = 'PUT'

const updateWidget = async () => await useAsyncData(`dashboard/widgets/${id}`, () => {
      useBaseFetch(`dashboard/widgets/${id}`, {
        method: 'POST',
        body: form
      })
          .then(() => useNotify({message: 'Updated', type: 'success'}))
          .catch(() => useNotify({message: 'Error, check form', type: 'error'}))
    }
)

const notionExport = async () => await useAsyncData(`notion-export/widget/${id}`, () => {
      useBaseFetch(`notion-export/widget/${id}`, {
        method: 'POST',
        body: {
          notion_page_id: form.notion_page_id
        }
      })
          .then((response) => {
            for (const [key, value] of Object.entries(response.widget)) {
              form[key] = value
            }
            useNotify({message: 'Fetched', type: 'info'})
          })
          .catch(() => useNotify({message: 'Error, write admin', type: 'error'}))
    }
)
</script>