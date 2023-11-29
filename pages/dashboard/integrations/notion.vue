<template>
  <div>
    <h2>Notion integration</h2>
    <p>
      <nuxt-link @click="connectNotion" class="cursor-pointer">Connect Notion</nuxt-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/auth";

const config = useRuntimeConfig()

const authStore = useAuthStore()

const connectNotion = () => window.location.href = `${config.public.apiBase}auth/notion/redirect?token=${authStore.token}`
</script>

<style scoped>

</style>