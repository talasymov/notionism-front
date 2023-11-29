<template>
  <client-only>
    <resizabale-wrapper :resizable="resizable" :config="{maxWidth, maxHeight}">
      <div class="w-[400px] h-[400px]">
        <div class="max-w-md relative">
          <svg viewBox="0 0 100 100" :style="`color: ${config.stroke_color}`">
            <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" fill-opacity="0" stroke="currentColor"
                  stroke-linecap="round" :stroke-width="config.stroke_width + 'px'"
                  :style="`stroke-dasharray: 295.31px, 295.31px; stroke-dashoffset: ${dashoffset}px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;`"></path>
          </svg>
          <div class="absolute w-full h-full left-0 top-0 flex flex-col justify-center text-7xl items-center">
            <div :style="`color: ${config.time_color}`">{{ display }}</div>
            <div class="relative w-full flex flex-col justify-center items-center">
              <div class="absolute mt-20 flex">
                <Play class="h-12" @click="startTimer" v-if="!countdown" :style="`color: ${config.buttons_color}`"/>
                <Pause class="h-12" @click="pauseTimer" v-if="countdown" :style="`color: ${config.buttons_color}`"/>
                <Stop class="h-12" @click="stopTimer" :style="`color: ${config.buttons_color}`"/>
              </div>
            </div>
          </div>
          <audio ref="beep">
            <source src="~/assets/pomodoro-beep.wav" type="audio/wav">
          </audio>
        </div>
      </div>
    </resizabale-wrapper>
  </client-only>
</template>

<script>
import Play from "~/components/icons/Play.vue";
import Pause from "~/components/icons/Pause.vue";
import Stop from "~/components/icons/Stop.vue";
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";

export default {
  name: 'Pomodoro',
  components: {ResizabaleWrapper, Stop, Pause, Play},
  props: [
    'config', 'resizable', 'maxWidth', 'maxHeight'
  ],
  data() {
    return {
      timer: null,
      totalTime: this.config.total_time * 60,
      leftTime: this.config.total_time * 60,
      countdown: false,
    }
  },
  methods: {
    startTimer() {
      this.countdown = true
      this.timer = setInterval(() => this.leftTime--, 1000)
    },
    pauseTimer() {
      clearInterval(this.timer)
      this.countdown = false;
    },
    stopTimer() {
      clearInterval(this.timer)
      this.leftTime = this.totalTime
      this.timer = null
      this.countdown = false
    },
    padTime(value) {
      return (value < 10 ? "0" : "") + value;
    },
  },
  computed: {
    minutes: function () {
      const minutes = Math.floor(this.leftTime / 60);
      return this.padTime(minutes);
    },
    seconds: function () {
      const seconds = this.leftTime - this.minutes * 60;
      return this.padTime(seconds);
    },
    display() {
      return `${this.minutes}:${this.seconds}`
    },
    dashoffset() {
      return Math.round((295.31 - this.leftTime * 29531 / this.totalTime / 100) * 100) / 100
    },
  },
  watch: {
    leftTime(current) {
      if (current === 0) {
        this.stopTimer();
        (new Audio('/pomodoro-beep.wav')).play()
      }
    },
    'config.total_time'(current) {
      this.totalTime = current * 60
      this.leftTime = current * 60
    }
  }
}
</script>