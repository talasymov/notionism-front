<template>
  <div>
    <h2>Google Calendar integration</h2>
    <p>
      <nuxt-link @click="connectGoogleCalendar" class="cursor-pointer">Connect Google Calendar</nuxt-link>
    </p>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const connectGoogleCalendar = () => window.location.href = `${config.public.apiBase}auth/google-calendar/redirect`
</script>

<style scoped>

</style>