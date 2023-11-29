<template>
    <tilt :options="tiltOptions" >
        <div class="glass feedback-card border border-gray-200 bg-white p-6 flex rounded-2xl">
            <div class="basis-[265px]">
                <img style="transform: translateZ(50px)" src="~/public/img/cant-find-items-image.png"  alt="Image of sad greek statue">
            </div>
            <div class="pl-12 flex-1 flex flex-col justify-center align-center">
                <h2 class="text-2xl font-semibold">{{data.title}}</h2>
                <p class="mt-4">{{data.text}}</p>
                <div class="mt-16 flex">
                    <my-link type="primary" :to="data.to">
                        {{data.linkText}}
                    </my-link>
                </div>
            </div>
        </div>
    </tilt>
</template>

<script>
import Tilt from 'vanilla-tilt-vue'
import MyButton from "~/components/UI/MyButton.vue";
import ExploreIcon from "~/components/icons/ExploreIcon.vue";
import InformationIcon from "~/components/icons/InformationIcon.vue";
import MyLink from "~/components/UI/MyLink.vue";

export default {
    components: {MyLink, InformationIcon, ExploreIcon, MyButton, Tilt},
    props: {
      data: {
          type: Object,
          default: () => ({})
      }
    },
    data:() => ({
      tiltOptions: {
          max: 2,
          perspective: 1000,
      }
    })
}
</script>

<style lang="scss">
.feedback-card {
    background: linear-gradient(86.12deg, rgba(183, 216, 255, 0.17) -8.19%, rgba(255, 255, 255, 0.5) 75.65%);
}
</style>