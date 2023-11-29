<template>
  <div class="w-full h-full group relative">
    <Pomodoro v-if="widget.codename === 'pomodoro'" :config="widget.config"/>
    <AnalogClock v-else-if="widget.codename === 'analog_clock'" :config="widget.config"/>
    <weather-widget v-else-if="widget.codename === 'weather'" :config="widget.config"/>
    <calendar-widget v-else-if="widget.codename === 'calendar'" :config="widget.config"/>
    <quotes-widget v-else-if="widget.codename === 'quotes'" :config="widget.config" :data="widget.data"/>
    <life-progress-bar-widget v-else-if="widget.codename === 'life_progress_bar'" :config="widget.config" :data="widget.data"/>
    <countdown-widget v-else-if="widget.codename === 'countdown'" :config="widget.config" :data="widget.data"/>
    <retro-clock-widget v-else-if="widget.codename === 'retro_clock'" :config="widget.config" :data="widget.data"/>
    <div v-else>Widget Not Defined</div>
    <div v-if="isEditButtonVisible" class="invisible absolute top-[8px] left-[50%] text-base group-hover:visible" style="transform: translateX(-50%)">
      <a :href="`https://notionism.org/dashboard/widgets/builder/${config}`" target="_blank">
        <button class="my-button my-button--md text-white bg-black">
          Edit widget <edit-box-icon class="ml-2" color="white"/>
        </button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnalogClock from "~/components/widgets/AnalogClock.vue";
import Pomodoro from "~/components/widgets/Pomodoro.vue";
import WeatherWidget from "~/components/widgets/weather/WeatherWidget.vue";
import EditBoxIcon from "~/components/icons/EditBoxIcon.vue";
import CalendarWidget from "~/components/widgets/calendar/CalendarWidget.vue";
import QuotesWidget from "~/components/widgets/quotes/QuotesWidget.vue";
import LifeProgressBarWidget from "~/components/widgets/LifeProgressBar/LifeProgressBarWidget.vue";
import CountdownWidget from "~/components/widgets/Countdown/CountdownWidget.vue";
import RetroClockWidget from "~/components/widgets/RetroClock/RetroClockWidget.vue";

const props = defineProps({
  widget: {
    type: Object,
  },
})

const widgetsWithoutEditButton = ['calendar']

const isEditButtonVisible = computed(() => {
  if(!props.widget) return false

  return !widgetsWithoutEditButton.includes(props.widget.codename)
})

</script>

<style>
  html {
    overflow: hidden !important;
  }
</style>