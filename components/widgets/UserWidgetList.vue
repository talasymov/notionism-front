<template>
  <div>
    <div class="col-span-12 gap-2 mb-4">
      <div class="flex justify-between">
        <div>
          <div class="relative">
            <input v-model="searchValue" type="text" class="border-gray-200 text-[14px] border rounded-[8px] px-4 py-2"
                   placeholder="Search by name">
            <vue-feather type="search" size="18" class="absolute position-v-center right-[16px] pointer-events-none"/>
          </div>
        </div>
        <div></div>
        <div>
          <vue-feather type="grid"
                       title="Grid view"
                       tabindex="0"
                       :class="`p-2 rounded transition cursor-pointer active:opacity-95 active:scale-[0.97] mr-1 ${listMode === 'grid' ? 'bg-gray-200 text-black' : 'text-gray-400 hover:bg-gray-50'}`"
                       @click="listMode = 'grid'"
                       @keydown.enter="listMode = 'grid'"
          />
          <vue-feather type="list"
                       title="Table view"
                       tabindex="0"
                       :class="`p-2 rounded transition cursor-pointer active:opacity-95 active:scale-[0.97] ${listMode === 'list' ? 'bg-gray-200 text-black' : 'text-gray-400 hover:bg-gray-50'}`"
                       @click="listMode = 'list'"
                       @keydown.enter="listMode = 'list'"
          />
        </div>
      </div>
    </div>
    <div class="col-span-12 overflow-scroll md:overflow-hidden">
      <template v-if="loadingWidgets">
        <div class="grid grid-cols-1 gap-4">
          <div v-for="widget in [0,1,2,3,4]" :key="widget" class="grid grid-cols-6 gap-4 h-[260px] ">
            <div class="skeleton loading col-span-2 h-full"></div>
            <div class="col-span-4 flex flex-col justify-center">
              <div class="skeleton loading h-[25px] w-[120px] mb-2"></div>
              <div :class="`skeleton loading h-[35px] mb-4`" :style="{width: (skeletonTitleLengths[widget] + 'px')}">
              </div>
              <div class="flex gap-4">
                <div class="skeleton loading h-[45px] w-[150px]"></div>
                <div class="skeleton loading h-[45px] w-[150px]"></div>
                <div class="skeleton loading h-[45px] w-[150px]"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="widgetsItems.length > 0 && listMode === 'list'">
        <table class="min-w-full text-left text-base font-light">
          <thead class="border-b text-[14px] font-semibold border-gray-200">
          <tr>
            <th style="width:196px" scope="col" class="px-4 py-2">Preview</th>
            <th scope="col" class="px-4 py-2">Name</th>
            <th scope="col" class="px-4 py-2">Description</th>
            <th scope="col" class="px-4 py-2 text-end">Actions</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="widget in widgetsItems">
            <tr v-if="String(widget.name).toLowerCase().includes(String(searchValue).toLowerCase())" :key="widget.uuid"
                class="text-[16px] border-gray-200">
              <td style="width:196px" class="px-4 py-2 font-medium flex">
                <nuxt-link :to="`/dashboard/widgets/builder/${widget.uuid}`">
                  <img
                      alt="widget image"
                      class="rounded-lg cursor-pointer object-cover w-full h-[108px]"
                      :src="widget.widget.preview"
                  >
                </nuxt-link>
              </td>
              <td class="px-4 py-2">
                <b class="font-semibold">{{ widget.name }}</b>
              </td>
              <td class="px-4 py-2">
                <div class="text-base font-[400]">
                  {{ widget.widget.desc }}
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-end">
                <Popper class="popper--light">
                  <button>
                    <vue-feather class="cursor-pointer p-2 rounded transition hover:bg-gray-100 active:bg-gray-200"
                                 type="more-vertical"/>
                  </button>
                  <template #content>
                    <div style="width: 200px;">
                      <div>
                        <button @click="handleCopy(`https://notionism.org/widgets/embed/${widget.uuid}`)"
                                class="w-full font-semibold items-center rounded bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)] transition justify-between flex px-4 py-2">
                          Copy embed url
                          <vue-feather class="ml-2" type="copy"/>
                        </button>
                      </div>
                      <div>
                        <nuxt-link :to="`/dashboard/widgets/builder/${widget.uuid}`"
                                   class="w-full font-semibold rounded bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)] transition flex items-center justify-between px-4 py-2">
                          Customize
                          <vue-feather class="ml-2" type="edit"/>
                        </nuxt-link>
                      </div>
                      <div class="mt-8">
                        <button
                            :class="`${loadingIdsOfWidgetsOnDelete.includes(widget.uuid) ? 'loading bg-red-100 text-rose-600' : 'hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)]'} w-full rounded font-semibold justify-between flex items-center px-4 py-2 transition`"
                            @click="deleteWidget(widget.uuid)">
                          Remove
                          <vue-feather type="trash" size="20" class="ml-2"/>
                        </button>
                      </div>
                    </div>
                  </template>
                </Popper>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </template>
      <template v-else-if="widgetsItems.length > 0 && listMode === 'grid'">
        <div class="grid grid-cols-12 gap-4">
          <template v-for="widget in widgetsItems">
            <div v-if="String(widget.name).toLowerCase().includes(String(searchValue).toLowerCase())" :key="widget.uuid"
                 class="col-span-12 sm:col-span-6 md:col-span-3 my-widgets__grid-card">

              <nuxt-link :to="`/dashboard/widgets/builder/${widget.uuid}`">
                <img
                    alt="widget image"
                    class="rounded-lg hover:scale-[1.03] active:scale-[0.99] cursor-pointer object-cover aspect-[13/9]"
                    :src="widget.widget.preview"
                >
              </nuxt-link>
              <div class="px-2 py-4">
                <div class="text-base">{{ widget.widget.name }}</div>
                <h3 class="text-lg font-bold">{{ widget.name }}</h3>
                <div class="mt-2 text-[14px]">{{ widget.widget.desc }}</div>
                <div class="flex justify-between mt-4 grid-card__actions opacity-100 lg:opacity-0">
                  <div>
                    <nuxt-link :to="`/dashboard/widgets/builder/${widget.uuid}`">
                      <vue-feather title="Customize" type="edit" size="18"
                                   class="p-1 rounded hover:bg-gray-100 transition cursor-pointer"/>
                    </nuxt-link>

                    <vue-feather title="Copy embed url"
                                 @click="handleCopy(`https://notionism.org/widgets/embed/${widget.uuid}`)" type="copy"
                                 size="18" class="p-1 rounded hover:bg-gray-100 transition cursor-pointer"/>
                  </div>
                  <div>
                    <vue-feather title="Delete widget" @click="deleteWidget(widget.uuid)" type="trash" size="18"
                                 class="p-1 rounded hover:bg-gray-100 transition cursor-pointer"/>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
      <template v-else-if="widgetsItems.length === 0">
        <div class="text-center opacity-50 py-4">
          Go to widgets library and pick one...
        </div>
      </template>
    </div>
    <div class="col-span-12">
      <span ref="loadMoreIntersectDOMElement" class="md:mb-32"/>
    </div>
  </div>
</template>

<script setup>
import copy from 'copy-to-clipboard';
import EditBoxIcon from "~/components/icons/EditBoxIcon.vue";
import CopyIcon from "~/components/icons/CopyIcon.vue";
import {useNotification} from "#imports";
import VueFeather from "vue-feather";
import Popper from "vue3-popper";

const widgetsItems = ref([])
const notification = useNotification()
const loadingWidgets = ref(false)
const loadingIdsOfWidgetsOnDelete = ref([])
const searchValue = ref('')
const listMode = ref('list')
const skeletonTitleLengths = [530, 420, 330, 650, 540]
const handleCopy = (data) => {
  copy(data)
  notification.notify({
    title: "Copied",
    content: `URL successfully coppied to clipboard.`,
    type: "success",
    duration: 10000,
  })
}

const fetchUserWidgetsItems = async () => {
  try {
    loadingWidgets.value = true

    const resp = await useAsyncData('dashboard/user-widgets', () => useBaseFetch('dashboard/user-widgets'))

    if (resp) {
      widgetsItems.value = resp.data.value.widgets
    }
  } catch (e) {
    console.error(e)
  } finally {
    loadingWidgets.value = false
  }
}

onMounted(() => {
  fetchUserWidgetsItems()
})

const deleteWidget = async (uuid) => {

  if (!window.confirm('Are you sure you want to delete this widget?')) return

  try {
    loadingIdsOfWidgetsOnDelete.value.push(uuid)

    await useAsyncData('dashboard/user-widgets/delete', () => useBaseFetch(`dashboard/user-widgets/${uuid}`, {
      method: 'DELETE'
    }))

    widgetsItems.value = widgetsItems.value.filter(widget => widget.uuid !== uuid)

    notification.notify({
      title: 'Deleted',
      content: 'Widget deleted.',
      type: 'success',
      duration: 8000,
    })
  } catch (e) {
    console.error(e)
  } finally {
    loadingIdsOfWidgetsOnDelete.value = loadingIdsOfWidgetsOnDelete.value.filter(v => v !== uuid)
  }
}

// const deleteWidget = async (uuid) => await useAsyncData('dashboard/user-widgets/delete', () => useBaseFetch(`dashboard/user-widgets/${uuid}`, {
//   method: 'DELETE'
// })).then(() => {
//   widgetsItems.value = widgetsItems.value.filter(widget => widget.uuid !== uuid)
//
//   notification.notify({
//     title: 'Deleted',
//     content: 'Widget deleted.',
//     type: 'success',
//     duration: 8000,
//   })
// })
</script>

<style lang="scss">
.my-widgets {
  &__grid-card {
    .grid-card {
      &__actions {
        transition: 150ms ease-in-out;
        pointer-events: none;
      }
    }

    &:hover {
      .grid-card__actions {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}
</style>