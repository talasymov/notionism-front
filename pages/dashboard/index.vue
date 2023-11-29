<template>
  <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
    <div class="col-span-12 mb-8">
      <div class="breadcrumbs flex justify-between">
        <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
        <div/>
        <button class="my-button my-button--md" @click="useAuthStore().logout()">
          Logout <vue-feather type="log-out"  class="ml-2"/>
        </button>
      </div>
    </div>
    <div class="col-span-12 flex gap-2 mb-4">
      <button
          :class="`my-button my-button--block my-button--md my-button--bordered ${page === PAGES.MY_WIDGETS ? 'my-button--primary' : ''}`"
          @click="setPage(PAGES.MY_WIDGETS)"
      >
        <vue-feather type="archive" class="mr-2"/>
        My widgets
      </button>
      <button
          :class="`my-button my-button--block my-button--md my-button--bordered ${page === PAGES.WIDGETS_LIBRARY ? 'my-button--primary' : ''}`"
          @click="setPage(PAGES.WIDGETS_LIBRARY)"
      >
        <vue-feather type="book-open" class="mr-2"/>
        Widgets library
      </button>
    </div>
    <div class="col-span-12 widgets-library">
        <UserWidgetList v-show="page === PAGES.MY_WIDGETS"/>
        <WidgetList v-show="page === PAGES.WIDGETS_LIBRARY"/>
    </div>
  </div>
</template>

<script setup>
import WidgetList from "~/components/widgets/WidgetList.vue";
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";
import {DASHBOARD_BREADCRUMBS} from "~/utils/defaultData";
import UserWidgetList from "~/components/widgets/UserWidgetList.vue";
import {useAuthStore} from "~/store/auth";
import VueFeather from 'vue-feather';

const breadcrumbs = DASHBOARD_BREADCRUMBS

definePageMeta({
  middleware: ['auth'],
  layout: 'user'
})

useHead({
    title: `Dashboard`,
    meta: [
        {name: 'robots', content: 'noindex'},
    ],
    link: [
        {rel: 'icon', href: '/favicon.ico'}
    ]
})

const PAGES = {
  MY_WIDGETS: 'my-widgets',
  WIDGETS_LIBRARY: 'widgets-library'
}

const page = ref(PAGES.MY_WIDGETS)

function setPage(pageNmae) {
  page.value = pageNmae
}

</script>

<style lang="scss">
  .widgets-library {

  }
</style>