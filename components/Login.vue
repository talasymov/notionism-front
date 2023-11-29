<template>
  <div class="profile" >
      <Popper arrow hover width="130px">
          <NuxtLink :to="authStore.isAuth ? '/dashboard' : '/login'"  rel="noopener">
              <Person class="cursor-pointer"/>
          </NuxtLink>
          <template #content="props">
              <div  v-bind="props" class="w-[100px] text-center">
                  {{authStore.isAuth ? 'Enter profile' : 'Sign In'}}
              </div>
          </template>
      </Popper>
  </div>
</template>

<script>
import Person from "~/components/icons/Person.vue";
import Popper from "vue3-popper";
import {useAuthStore} from "~/store/auth";

export default {
    components: {
        Popper,
        Person,
    },
    setup() {
        const authStore = useAuthStore()
        return {authStore}
    }
}
</script>

<style lang="scss">
.profile {
  position: relative;
  $class: &;
  &__tooltip {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    opacity: 0;
    transition: 250ms ease-in-out;
    white-space: nowrap;
    pointer-events: none;
  }
  &:hover {
    #{$class}__tooltip {
      opacity: 1;
      transform: translate(-50%, 10px);
    }
  }
}
</style>