<template>
  <div
      class="card col-span-6 md:col-span-3 lg:col-span-2 min-h-[380px] p-1"
  >
    <nuxt-link :to="'/widgets/' + widget.slug">
      <img
          alt="widget image"
          class="rounded-2xl cursor-pointer object-cover w-full h-[260px] transition hover:scale-[0.98] active:scale-[0.97]"
          :src="widget.preview"
      >
    </nuxt-link>
    <div class="pt-2 px-4 flex justify-between flex-col" style="height: calc(100% - 290px);">
      <div>
        <nuxt-link :to="'/widgets/' + widget.slug">
          <h4 class="text-[22px] leading-[1.3] text-gray-900 font-semibold hover:text-pink-600">
            {{ widget.name ?? widget.title }}
          </h4>
        </nuxt-link>
        <p class="text-base pt-1 font-light leading-normal">
          {{ widget.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Widget} from "~/types/widget-library/types";

const {widget} = defineProps<{
  widget: Widget,
}>()

const blackButtonCss = 'my-button rounded-3xl bg-black text-base font-semibold items-center text-white flex px-3 py-2 gap-4'
const whiteButtonCss = 'my-button hover:bg-gray-100 rounded-3xl text-base font-semibold flex items-center border-gray-200 border-2 px-3 py-2 gap-4'
</script>