<template>
  <div class="h-screen w-screen">
    <WidgetFactory :widget="widget"/>
  </div>
</template>

<script setup lang="ts">
import WidgetFactory from "~/components/widgets/WidgetFactory.vue";

definePageMeta({
  layout: 'widget',
})

const route = useRoute()

const {data: widget} = await useAsyncData(`/dashboard/user-widgets/${route.params.hash}`, () => useBaseFetch(`dashboard/user-widgets/${route.params.hash}`))
</script>