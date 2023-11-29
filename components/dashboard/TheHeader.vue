<template>
  <header>
    <div class="container max-w-6xl mx-auto">
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div class="container flex flex-wrap items-center justify-between mx-auto relative">
          <NuxtLink href="/" class="flex items-center">
            <img src="/img/icon.svg" class="h-6 mr-3 sm:h-9"
                 alt="Notionism" width="34" height="34">
          </NuxtLink>
          <button data-collapse-toggle="navbar-default" type="button"
                  class="inline-flex items-center p-2 ml-3 text-base text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto"
               id="navbar-default">
            <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium md:border-0 md:bg-white">
                <li>
                    <NuxtLink to="/admin/kits"
                              class="block py-2 pl-3 pr-4 md:p-0 focus:text-rose-600 active:text-rose-600"
                              aria-current="page">Kits
                    </NuxtLink>
                </li>
              <li>
                <NuxtLink to="/admin/tags"
                          class="block py-2 pl-3 pr-4 md:p-0 focus:text-rose-600 active:text-rose-600"
                          aria-current="page">Tags
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/templates"
                          class="block py-2 pl-3 pr-4 md:p-0 focus:text-rose-600 active:text-rose-600"
                          aria-current="page">Templates
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/blog-posts"
                          class="block py-2 pl-3 pr-4 md:p-0 focus:text-rose-600 active:text-rose-600"
                          aria-current="page">Blog
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/widgets"
                          class="block py-2 pl-3 pr-4 md:p-0 focus:text-rose-600 active:text-rose-600"
                          aria-current="page">Widgets
                </NuxtLink>
              </li>
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
    </div>
  </header>
</template>

<script setup type="ts">
import {useNotifyStore} from "~/store/notify";

const notify = useNotifyStore()
</script>