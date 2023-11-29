<template>
    <carousel v-bind="settings" ref="carousel">
        <slide v-for="slide in banners" :key="slide.id">
            <img
                class="rounded-[16px]"
                style="width: 100%; height: 400px;object-fit: cover"
                :src="defaultStorage.isMobile ? slide.responsive_images[1].path : slide.responsive_images[0].path"
                :alt="slide.name"
            >
        </slide>
        <template #addons>
            <div @click="$refs.carousel.prev()" class="absolute top-1/2 left-[10px] bg-gray-200 translate-y-[-50%] rounded-[100%] cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-gray-300 active:bg-white opacity-50 hover:opacity-75">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="black"/>
                </svg>
            </div>
            <div @click="$refs.carousel.next()" class="absolute top-1/2 right-[10px] bg-gray-200 translate-y-[-50%] rounded-[100%] cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-gray-300 active:bg-white opacity-50 hover:opacity-75">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="black"/>
                </svg>
            </div>
            <Pagination v-if="!defaultStorage.isMobile"/>
        </template>
    </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import MyButton from "~/components/UI/MyButton.vue";
import {useDefaultStore} from "~/store";

export default {
    name: 'App',
    props: {
      banners: {
          type: Array,
          default: () => ([])
      }
    },
    setup() {
        const defaultStorage = useDefaultStore()
      return {defaultStorage}
    },
    data: () => ({
        settings: {
            itemsToShow: 1,
            snapAlign: 'center',
        },
    }),
    components: {
        MyButton,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
}
</script>
