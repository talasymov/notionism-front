<template>
  <div class="container max-w-6xl mx-auto p-4 md:flex-nowrap">
    <div>
      <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
    </div>
    <div class="mt-16">
      <h1 class="text-2xl font-bold">Feedback</h1>
      <p class="max-w-[800px] mt-2">We value your feedback! Let us know how we can improve our product or service. Your
        opinion matters to us and helps us to provide the best possible experience for our customers.</p>
      <div class="mt-8">
        <a href="https://notoinism.canny.io" target="_blank">
          <my-button class="border-2 text-[16px] border-gray-100 items-center gap-4 active:bg-gray-50">
            See roadmap
            <magnify-icon fill="#000000"/>
          </my-button>
        </a>
      </div>
    </div>
    <div class="mt-16">
      <div class="grid grid-cols-12 gap-4">
        <div
            class="col-span-12 sm:col-span-6 feedback-card--blue flex-1 min-h-[300px] rounded-xl border-2 border-blue-100 p-4 md:p-8 flex justify-between flex-col">
          <div>
            <h2 class="text-2xl font-semibold">Widget idea</h2>
            <p class="mt-2">Suggest a widget idea or advise us how to improve existing widgets.</p>
          </div>
          <div class="mt-4">
            <my-link to="https://notoinism.canny.io/widgets" target="_blank">Suggest an Idea</my-link>
          </div>
        </div>
        <div
            class="col-span-12 sm:col-span-6 feedback-card--orange flex-1 min-h-[300px] flex-1 rounded-xl  border-2 border-orange-100 p-4 md:p-8 flex justify-between flex-col">
          <div>
            <h2 class="text-2xl font-semibold">Template idea</h2>
            <p class="mt-2">You can also suggest an idea related to templates. We create new templates at your request
              or improve current ones.</p>
          </div>
          <div class="mt-4">
            <my-link to="https://notoinism.canny.io/templates" target="_blank">Suggest an Idea</my-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from "~/components/UI/MyButton.vue";
import MagnifyIcon from "~/components/icons/MagnifyIcon.vue";
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";
import {BASE_BREADCRUMBS} from "~/utils/defaultData";
import MyLink from "~/components/UI/MyLink.vue";

const breadcrumbs = [
  ...BASE_BREADCRUMBS,
  {
    id: 1,
    html: 'Feedback',
    disabled: true,
  }
]

useHead({
  title: 'Feedback',
  meta: [
    {
      name: 'description',
      content: 'We value your feedback! Let us know how we can improve our product or service. Your opinion matters to us and helps us to provide the best possible experience for our customers.'
    }
  ],
  link: [
    {rel: 'icon', href: '/favicon.ico'}
  ]
})
</script>

<style lang="scss">
.feedback-card {
  &--blue {
    background: linear-gradient(108.85deg, rgba(139, 213, 255, 0.12) 1.41%, rgba(139, 192, 255, 0) 98.49%);
    color: #100F5F;
  }

  &--orange {
    background: linear-gradient(251.35deg, rgba(255, 153, 0, 0.06) 0%, rgba(255, 255, 255, 0) 100%);
    color: #5F2B0F;
  }
}
</style>