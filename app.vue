<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script>
import {useDefaultStore} from "~/store";

export default {
    setup() {
        const defaultStore = useDefaultStore()

      return {defaultStore}
    },
    async mounted() {
        await this.$nextTick()

        if(window.innerWidth <= 798) {
            return this.defaultStore.setIsMobile(true)
        }
        this.defaultStore.setIsMobile(false)
    }
}
</script>