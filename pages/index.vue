<template>
  <TheHeader/>
  <main class="home-page overflow-hidden pb-[200px]">
    <div class="container max-w-6xl m-auto px-4">
      <section>
        <div class="grid grid-cols-12 gap-[22px] h-[600px] md:h-[600px] items-center relative">
          <div class="hidden md:block col-span-4">
            <EmptyStarBgSvg class="empty-star-bg"/>
            <div class="flex flex-col items-center text-center" ref="bgRef">
              <div
                  class="relative hero-image"
              >
                <div class="hidden lg:inline-block after"/>
                <div class="radial radial--red"/>
                <div class="radial radial--blue"/>
                <img class="m-auto max-h-[480px]" src="/img/home-bust.png" alt="philosopher" loading="lazy">
              </div>
              <h2 class="text-[42px] font-semibold leading-none" ref="titleRef">
                notionism
              </h2>
              <TranscriptionSvg class="mt-4"/>
            </div>
          </div>
          <img class="md:hidden absolute right-[-100px] opacity-10 position-v-center" src="/img/home-bust.png" alt="philosopher" loading="lazy">
          <div class="hidden md:block lg:block spacer"/>
          <div class="col-span-12 md:col-span-7 relative">
            <div class="flex flex-col">
              <h1 class="text-[2rem] md:text-[2rem] lg:text-[3rem] leading-[120%] font-bold">Organize your workspace
                with
                Notionism</h1>
              <p class="lg:text-2xl md:text-1xl mt-4 ">
                Our templates and widgets help you to optimize, speed up and organise your work
              </p>
              <blockquote class="border-l-2 border-gray-300 pl-2 mt-6 text-base text-gray-500">
                Philosophy which states what everything should be organized using Notion.
                Website with solutions and learning resources for Notion enthusiasts
              </blockquote>
              <div class="mt-12 relative flex">
                <nuxt-link to="/template-library">
                <button class="flex items-center px-4 py-2 rounded-lg bg-rose-500 text-white transition hover:bg-rose-600 hover:translate-y-[-2px] active:translate-y-0">
                  Templates <vue-feather type="arrow-up-right" class="ml-2"/>
                </button>
                </nuxt-link>
                <nuxt-link to="/widgets" class="ml-4">
                <button class="flex items-center px-4 py-2 rounded-lg bg-rose-500 text-white transition hover:bg-rose-600 hover:translate-y-[-2px] active:translate-y-0">
                  Widgets <vue-feather type="arrow-up-right" class="ml-2"/>
                </button>
                </nuxt-link>
              </div>
              <StarSvg class="bg-star"/>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-[80px] relative">
        <svg class="left-0 pointer-events-none top-[-30%] absolute" width="1046" height="759" viewBox="0 0 1046 759"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="522.858" cy="379.256" rx="281.5" ry="580.939" transform="rotate(-120 522.858 379.256)"
                   fill="url(#paint0_radial_620_964)"/>
          <defs>
            <radialGradient id="paint0_radial_620_964" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(522.858 379.256) rotate(90) scale(580.939 281.5)">
              <stop stop-color="#CCE7FF" stop-opacity="0.37"/>
              <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
          </defs>
        </svg>
        <div class="grid grid-cols-12 gap-[22px]">
          <div class="col-span-12 md:col-span-4">
            <div
                class="bento-card rounded-2xl border-gray-200 roboto border px-[64px] py-[48px] bg-white bg-opacity-40">
              <b class="text-[56px] font-black gradient">{{ humanNumbers(bentoData.visitors) }}</b>
              <p class="text-[24px] font-semibold">Visitors</p>
            </div>
          </div>
          <div class="col-span-12 md:col-span-4">
            <a href="/dashboard" target="_blank" rel="noopener">
            <div
                class="bento-card bento-card--img overflow-hidden bento-card--link rounded-2xl border-gray-200 roboto border px-[64px] py-[48px] relative bg-white bg-opacity-40">
              <div class="pointer-events-none">
                <b class="text-[56px] font-black gradient">{{ bentoData.users }}</b>
                <p class="text-[24px] font-semibold">Users</p>
                <img class="absolute right-0 bottom-0 z-10" src="/img/user.png" alt="User icon">
              </div>
            </div>
            </a>
          </div>
          <div class="col-span-12 md:col-span-4">
            <a href="/template-library" target="_blank">
              <div
                  class="bento-card bento-card--img bento-card--link rounded-2xl border-gray-200 roboto border text-center py-[48px] relative overflow-hidden bg-white bg-opacity-40">
                <div class="pointer-events-none">
                  <b class="text-[56px] font-black gradient">{{ humanNumbers(bentoData.templates_downloaded) }}</b>
                  <p class="text-[24px] font-semibold">Downloaded templates</p>
                  <img src="/img/bg-grid.png" class="absolute left-0 bottom-0 right-0 top-0 w-full pointer-events-none" alt="grid background">
                </div>
              </div>
            </a>
          </div>
          <div class="col-span-12 md:col-span-8">
            <a href="/widgets" target="_blank">
              <div
                  class="bento-card bento-card--img bento-card--link rounded-2xl border-gray-200 roboto border px-[64px] py-[36px] relative overflow-hidden bg-white bg-opacity-40">
                <div class="pointer-events-none">
                  <div class="z-[2] relative">
                    <b class="text-[56px] inline-block leading-[100%] mb-[16px] font-black gradient">{{ humanNumbers(bentoData.widgets_created) }}</b>
                    <p class="text-[24px] font-semibold max-w-[197px]">People used our widgets</p>
                  </div>
                  <img src="/img/widgets.png"
                       class="absolute scale-75 md:scale-100 right-0 bottom-0 pointer-events-none z-[1]"
                       style="transform-origin: right bottom" alt="widgets background">
                </div>
              </div>
            </a>
          </div>
          <div class="col-span-12 md:col-span-4">
            <div
                class="bento-card rounded-2xl border-gray-200 flex flex-col justify-center roboto border py-[36px] min-h-[218px] text-center bg-white bg-opacity-40">
              <b class="text-[56px] inline-block leading-[100%] mb-[16px] font-black gradient">{{ bentoData.team }}</b>
              <p class="text-[24px] font-semibold">Teammates</p>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-[160px]">
        <h2 class="text-2xl font-semibold">Notion Templates</h2>
        <div class="grid grid-cols-12 gap-[22px] mt-6 items-center rounded-lg border-gray-200 border p-4">
          <div class="col-span-12 lg:col-span-10 max-w-[1180px] roboto text-[16px]">
            We just launched and do not cover all the categories yet. We are actively creating templates, if you want to
            contribute to the Notion community, upvote categories you are interested in or add what we've missed out.
            Below is the list of all planned categories.
          </div>
          <div class="col-span-12 lg:col-span-2">
            <a href="mailto:contact@notionism.org">
              <button
                  class="my-button w-full whitespace-nowrap py-2 px-4 border rounded-md border-pink-200 font-bold text-pink-600 bg-pink-50 transition hover:bg-pink-100 flex justify-center items-center">
                Write Us
                <vue-feather type="mail" class="ml-1"/>
              </button>
            </a>
          </div>
        </div>
      </section>
      <section class="mt-9">
        <div class="grid grid-cols-12 gap-y-[32px]">
          <div class="col-span-12 md:col-span-6" v-for="col in catalogData" :key="col.id">
            <h4 class="text-xl font-semibold">{{ col.title }}</h4>
            <p class="text-base mt-1 text-[16px] text-gray-500">{{ col.text }}</p>
            <div class="grid grid-cols-4 mt-4 gap-x-[22px] gap-y-[11px]">
              <div class="col-span-2 text-base" v-for="item in col.items" :key="item" v-html="item"/>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-[100px] md:mt-[200px] relative">
        <UkraineFlagBg class="blue-yellow-bg -z-10"/>
        <h2 class="text-2xl font-semibold">Notion Templates</h2>
        <div class="grid grid-cols-4 gap-x-[22px] gap-y-[32px] mt-12">
          <div class="col-span-4 md:col-span-2" v-for="item in aboutUsData" :key="item.id">
            <h4 class="text-xl font-semibold">{{ item.title }}</h4>
            <p class="mt-4 text-[16px] roboto">{{ item.text }}</p>
          </div>
        </div>
      </section>
    </div>
  </main>
  <TheFooter/>
</template>

<script setup lang="ts">
import TranscriptionSvg from "~/components/icons/TranscriptionSvg.vue";
import ArrowTopRight from "~/components/icons/ArrowTopRight.vue";
import StarSvg from "~/components/icons/StarSvg.vue";
import EmptyStarBgSvg from "~/components/icons/EmptyStarBgSvg.vue";
import UkraineFlagBg from "~/components/icons/UkraineFlagBg.vue";
import {ABOUT_US_DATA, CATALOG_DATA} from "~/utils/defaultData/home";
import MyButton from "~/components/UI/MyButton.vue";
import VueFeather from "vue-feather";
import {onMounted} from "vue";

useHead({
  title: 'Notionism.org - Home for Notion Enthusiasts',
  meta: [
    {
      name: 'description',
      content: 'Our mission is to boost your productivity, teach Notion, and spread ideas. Browse Notion templates, articles, and tools to make your workspace better!'
    }
  ],
  link: [
    {rel: 'icon', href: '/favicon.ico'}
  ]
})

const catalogData = CATALOG_DATA
const aboutUsData = ABOUT_US_DATA

definePageMeta({
  layout: 'home',
})

const bentoData = await useBaseFetch('dashboard/stat')
onMounted(() => {
  const bentoCards = document.querySelectorAll('.bento-card--img')

  Array.from(bentoCards).forEach(card => {
    card.addEventListener('mousemove', (event) => {handleMouseOnBentoCard(card, event)})
    card.addEventListener('mouseleave', (event) => {handleMouseLeaveBentoCard(card)})
  })
})

function handleMouseOnBentoCard(card: any, event: any) {
  const image = card.querySelector('img')

  const offsetY =  (event.offsetY - card.offsetHeight / 2) / 25
  const offsetX = (event.offsetX- card.offsetWidth / 2 ) / 25

  image.animate({
    transform: `translate(${offsetX}px,${offsetY}px) scale(1.1)`
  }, {duration: 300, fill: "forwards"})
}
function handleMouseLeaveBentoCard(card: any) {
  const image = card.querySelector('img')

  image.animate({
    transform: `translate(0,0)`
  }, {duration: 300, fill: "forwards"})
}

function humanNumbers(number: any) {
  try {
    return Number(number).toLocaleString('en-us')
  } catch (e) {
    console.error(e)
    return 0
  }
}

</script>

<style lang="scss">
.gradient {
  background: linear-gradient(to bottom, rgba(244, 63, 94, 1), rgba(245, 144, 162, 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bento-card {
  transition: 250ms ease-in-out;
  background-color: rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-3px);
    background-color: rgba(255, 255, 255, 0.9);
  }

  &--link {
    cursor: pointer;

    &:hover {
      border: 1px solid rgba(244, 63, 94, 0.3);
    }

    &:active {
      transform: translateY(0);
      background-color: rgba(244, 63, 94, 0.03);
    }
  }
}
</style>