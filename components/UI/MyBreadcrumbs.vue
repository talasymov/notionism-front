<template>
  <div class="breadcrumbs__wrapper items-center flex gap-2">
    <template v-for="(item, idx) in props.breadcrumbs"  :key="item.id">
      <div :class="`breadcrumbs__item py-0.5 px-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition ${item.disabled ? 'disabled' : ''}`">
        <div v-if="!item.path" class="flex items-center gap-1" v-html="item.html"/>
        <nuxt-link v-else :to="item.path">
          <div class="flex items-center gap-1" v-html="item.html"/>
        </nuxt-link>
      </div>
      <SeparatorArrowRight v-if="idx !== props.breadcrumbs.length - 1" />
    </template>
  </div>
</template>

<script setup lang="ts">
import SeparatorArrowRight from "~/components/icons/SeparatorArrowRight.vue";

type Breadcrumbs = {
  id: string | number,
  html?: string,
  text?:string,
  path?: string,
  disabled?: boolean,
}

const props = defineProps<{
  breadcrumbs: Breadcrumbs[]
}>()

const resp = useFetch

</script>