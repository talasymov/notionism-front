<template>
  <div
      class="card col-span-6 md:col-span-3 lg:col-span-2 min-h-[480px] p-1"
  >
    <nuxt-link :to="'/template/' + template.slug">
      <img
          alt="template image"
          class="rounded-2xl cursor-pointer object-cover w-full h-[260px] transition hover:scale-[0.98] active:scale-[0.97]"
          :src="template.preview"
      >
    </nuxt-link>
    <div class="pt-2 px-4 flex justify-between flex-col" style="height: calc(100% - 290px);">
      <div>
        <nuxt-link :to="'/template/' + template.slug">
          <h4 class="text-[22px] leading-[1.3] text-gray-900 font-semibold hover:text-pink-600">
            {{ template.name ?? template.title }}
          </h4>
        </nuxt-link>
        <p class="text-base pt-1 font-light leading-normal">
          {{ template.desc }}
        </p>
      </div>
      <div class="flex justify-end items-center gap-4">
        <ClientOnly>
          <LikeComponent class="cursor-pointer" :template="template"/>
        </ClientOnly>
        <nuxt-link :to="'/template/' + template.slug">
          <button :class="`${template.price > 0 ? blackButtonCss : whiteButtonCss}`">
            {{ template.price === 0 ? 'Free' : template.price + '$' }}
            <ExploreIcon :fill="template.price > 0 ? 'white' : 'black'"/>
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExploreIcon from "~/components/icons/ExploreIcon.vue";
import LikeComponent from "~/components/template-library/LikeComponent.vue";

import {Template} from "~/types/template-library/types";

const {template} = defineProps<{
  template: Template,
}>()

const blackButtonCss = 'my-button rounded-3xl bg-black text-base font-semibold items-center text-white flex px-3 py-2 gap-4'
const whiteButtonCss = 'my-button hover:bg-gray-100 rounded-3xl text-base font-semibold flex items-center border-gray-200 border-2 px-3 py-2 gap-4'
</script>