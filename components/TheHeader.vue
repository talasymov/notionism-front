<template>
  <header>
    <nav class="container max-w-6xl mx-auto border-gray-200 px-4 py-4 rounded">
      <div class="flex flex-wrap items-center justify-between mx-auto">
        <NuxtLink href="/" class="flex items-center">
          <img src="/img/icon.svg" class="h-9" alt="Notionism" width="34" height="34">
        </NuxtLink>
        <button data-collapse-toggle="navbar-default" type="button" @click="openMenu = !openMenu"
                class="inline-flex items-center p-2 ml-3 text-base text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
        <div
            :class="{'hidden w-full md:block md:w-auto': !openMenu.value, 'w-full md:block md:w-auto': openMenu.value}"
            id="navbar-default">
          <ul class="flex flex-col space-x-2 items-center border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:text-base md:font-medium md:border-0 md:bg-white">
            <template v-for="navItem in nav">
              <template v-if="navItem.id === 4">
                <ClientOnly>
                  <li :key="navItem.id">
                    <Login/>
                  </li>
                </ClientOnly>
              </template>
              <li v-else :key="navItem.id">
                <NuxtLink :to="navItem.to"
                          class="px-3 py-1.5 rounded-lg focus:text-rose-600 active:text-rose-600 hover:bg-gray-100">
                  {{ navItem.text }}
                </NuxtLink>
              </li>
            </template>
          </ul>
        </div>
        <div class="fixed right-0 top-0 p-4 z-40">
          <div
              v-for="item in notify.notifications"
              v-html="item.message"
              class="p-2 bg-white rounded-lg shadow-lg font-bold mb-4"
              :class="{'bg-yellow-400': item.type === 'warning', 'bg-red-400': item.type === 'error', 'bg-green-400': item.type === 'success'}"
          ></div>
        </div>
      </div>
    </nav>
    <teleport to="body">
      <Transition name="slide-fade">
        <div v-show="openMenu" class="fixed w-full h-full left-0 top-0 z-50">
          <div class="h-full bg-black max-w-6xl mx-auto md:flex-nowrap">
            <button data-collapse-toggle="navbar-default" type="button" @click="openMenu = !openMenu"
                    class="inline-flex transition duration-700 items-center z-40 p-2 ml-3 text-base rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 text-white fixed right-[20px] top-[20px]"
                    aria-controls="navbar-default" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6 scale-150" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"></path>
              </svg>
            </button>
            <div class="flex flex-col text-white pt-16 text-center">
              <div v-for="navItem in nav" :key="navItem.id" @click="openMenu = false">
                <NuxtLink :to="navItem.to" class="px-2 py-4 text-[16px] w-full border-b border-gray-700 font-semibold inline-block">
                  {{ navItem.text }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </teleport>
  </header>
</template>

<script setup>
import {useNotifyStore} from "~/store/notify";
import Login from "~/components/Login.vue";
import {useAuthStore} from "~/store/auth";
import Popper from "vue3-popper";
import Person from "~/components/icons/Person.vue";

const openMenu = ref(false);
const notify = useNotifyStore()
const authStore = useAuthStore()

const nav = [
  {
    id: 0,
    text: 'Templates',
    to: '/template-library'
  },
  {
    id: 1,
    text: 'Widgets',
    to: '/widgets'
  },
  {
    id: 2,
    text: 'Blog',
    to: '/blog'
  },
  {
    id: 3,
    text: 'Feedback',
    to: '/feedback'
  },
  {
    id: 4,
    text:  authStore.isAuth ? 'Enter profile' : 'Login',
    to: authStore.isAuth ? '/dashboard' : '/login'
  },
]

</script>

