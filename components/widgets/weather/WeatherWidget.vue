<template>
  <client-only>
    <resizabale-wrapper
        :resizable="resizable"
        :config="{maxHeight, maxWidth}"
    >
      <div v-if="config.is_mini_variant" class="weather inline-block w-[125px]" ref="childElementRef">
        <div v-if="computedCityName" class="border border-gray-200 rounded-lg p-4 relative"
             :style="{backgroundColor: config.background_color, color: config.font_color, borderColor: config.border_color}">
          <div class="flex flex-col items-center">
            <div v-if="!cityLoading" class="text-center text-base opacity-50">
              <div >{{ computedCityName }}</div>
            </div>
            <div v-else class="skeleton inline-block w-[100px] h-[28px]"></div>
            <div class="flex justify-center my-2 max-w-[64px]">
              <weather-icon-factory :icon-color="config.icon_color" :is-flat="config.is_icons_flat"
                                    :code="Number(currentWeather.weathercode)"/>
            </div>
            <template v-if="!weatherLoading">
              <div class="text-center">
                <div>
                  <h3 class="text-[24px] leading-[100%] font-bold">{{ currentWeather.temperature }}{{ units.temperature }}</h3>
                  <p class="text-[16px] mt-[4px] opacity-50">{{ decodeWMOCodes(currentWeather.weathercode) }}</p>
                  <div class="text-[14px] mt-2">
                    <wind-pointer :color="config.font_color" style="width: 8px" class="mr-1"
                                  :degree="currentWeather.winddirection"/>
                    <span>{{ currentWeather.windspeed }}</span>
                    <span>{{ units.windSpeed }}</span>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="skeleton inline-block w-full h-[68px]"></div>
          </div>
        </div>
      </div>
      <div v-else class="weather" ref="childElementRef">
        <div v-if="computedCityName" class="group weather__wrapper relative"
             :style="{backgroundColor: config.background_color, color: config.font_color, borderColor: config.border_color}">
          <div class="weather__info">
            <div class="weather__location">
              <h3 v-if="!cityLoading">{{ computedCityName }}</h3>
              <h3 v-else class="skeleton inline-block w-[130px] h-[28px]"></h3>
              <p>{{ moment().format('MMMM D dddd') }}</p>
            </div>
            <div class="weather__current" v-if="!weatherLoading">
              <div class="weather__current-temperature">
                <div>
                  <h3>{{ currentWeather.temperature }}{{ units.temperature }}</h3>
                  <p>{{ decodeWMOCodes(currentWeather.weathercode) }}</p>
                </div>
              </div>
              <div class="weather__current-icon">
                <weather-icon-factory :icon-color="config.icon_color" :is-flat="config.is_icons_flat"
                                      :code="Number(currentWeather.weathercode)"/>
              </div>
            </div>
            <div v-else class="skeleton inline-block w-[130px] h-[68px]"></div>
          </div>
          <div class="grid grid-cols-5 gap-y-4 scrollbar-hidden grid-auto-flow-col overscroll-x-scroll weather__cards">
            <template v-if="!weatherLoading">
              <div v-for="card in weatherHourly" :key="card.time" class="weather__weather-card">
                <div class="weather-card__time">{{ moment(card.time).format('HH:00') }}</div>
                <div class="weather-card__icon">
                  <weather-icon-factory :icon-color="config.icon_color" :is-flat="config.is_icons_flat"
                                        :time="card.time" :code="Number(currentWeather.weathercode)"/>
                </div>
                <div class="weather-card__temperature">{{ card.temperature_2m }}{{ units.temperature }}</div>
                <div class="weather-card__wind">
                  <wind-pointer :color="config.font_color" style="width: 8px" class="mr-1"
                                :degree="card.winddirection_10m"/>
                  <span>{{ card.windspeed_10m }}</span>
                  <span>{{ units.windSpeed }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="n in [0,1,2,3,4]" :key="n"
                   class="skeleton inline-block w-[calc(100% - 8px)] h-[100px] mx-1"></div>
            </template>
          </div>
        </div>
        <div v-else>
          Please, select city
        </div>
      </div>
    </resizabale-wrapper>
  </client-only>
</template>

<script setup>
import moment from "moment";

import {TIMEZONES, WMO_CODES} from "~/utils/defaultData";
import WindPointer from "~/components/widgets/Icons/WindPointer.vue";
import WeatherIconFactory from "~/components/widgets/weather/WeatherIconFactory.vue";
import EditBoxIcon from "~/components/icons/EditBoxIcon.vue";
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";

definePageMeta({
  layout: 'none'
})

const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
  maxWidth: {
    type: Number,
    default: null,
  },
  maxHeight: {
    type: Number,
    default: null,
  },
  resizable: {
    type: Boolean,
    default: false,
  },
  coordinates: {
    type: Object,
    default: () => ({
      latitude: 0,
      longitude: 0,
    }),
  },
})

const weatherHourly = ref([])
const currentWeather = ref({})
const units = ref({})
const cityLoading = ref(false)
const amountOfSteps = ref(5)
const weatherLoading = ref(false)
const childElementRef = ref(null)
const pureWeatherData = ref(null)

function decodeWMOCodes(code) {
  const codes = WMO_CODES;
  return codes[code];
}

const computedCityName = computed(() => {
  try {
    return (props.config && props.config.location && props.config.location.city) || ''
  } catch {
    return null
  }
})

watch(() => props.config.windspeed_unit, () => {
  fetchWeatherData()
})
watch(() => props.config.temperature_unit, () => {
  fetchWeatherData()
})
watch(() => props.config.location, () => {
  fetchWeatherData()
})

function transformData(obj, steps) {
  const result = []
  const date = new Date();
  let currentHour = date.getHours() + 2;

  for (let i = 0; i < steps; i++) {
    result.push({
      rain: obj.rain[currentHour],
      temperature_2m: Math.floor(obj.temperature_2m[currentHour]),
      winddirection_10m: obj.winddirection_10m[currentHour],
      time: obj.time[currentHour],
      windspeed_10m: Math.floor(obj.windspeed_10m[currentHour]),
      weathercode: obj.weathercode[currentHour],
    })
    currentHour += 2
  }

  return result
}

async function getCoordinates() {
  return props.config.location || {latitude: 0, longitude: 0}
}

async function fetchWeatherData() {
  const {latitude, longitude} = await getCoordinates()

  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  const hoursOffset = Math.abs(Math.floor(timezoneOffset / 60));
  const sign = timezoneOffset > 0 ? '-' : '+';
  const timezoneCode = `UTC${sign}${hoursOffset}`;

  const timezoneExist = Object.keys(TIMEZONES).includes(timezoneCode)

  const timezone = timezoneExist ? `&timezone=${TIMEZONES[timezoneCode]}` : ''

  const speedUnit = props.config.windspeed_unit ? `&windspeed_unit=${props.config.windspeed_unit}` : ''
  const temperatureUnit = props.config.temperature_unit ? `&temperature_unit=${props.config.temperature_unit}` : ''

  const hourly = '&hourly=temperature_2m,rain,windspeed_10m,winddirection_10m,weathercode'
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude || 46.47}&longitude=${longitude || 30.65}&current_weather=true${hourly}${timezone}${speedUnit}${temperatureUnit}`


  try {
    weatherLoading.value = true

    const resp = await $fetch(url)

    weatherLoading.value = false

    units.value = {
      rain: resp.hourly_units.rain,
      temperature: resp.hourly_units.temperature_2m,
      windDirection: resp.hourly_units.winddirection_10m,
      windSpeed: resp.hourly_units.windspeed_10m,
    }

    currentWeather.value = {
      ...resp.current_weather,
      temperature: Math.floor(resp.current_weather.temperature),
    }

    pureWeatherData.value = resp.hourly
    weatherHourly.value = transformData(resp.hourly, amountOfSteps.value)
  } catch (e) {
    weatherLoading.value = false
    console.error(e)
  }
}

fetchWeatherData()

</script>

<style lang="scss">

.weather {
  &__wrapper {
    width: 460px;
    padding: 16px;

    border-radius: 8px;
    border: 1px solid rgba(155, 155, 155, 0.25);
  }

  &__weather-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__cards {
    margin-top: 32px;

    .weather-card {
      &__time {
        font-size: 16px;
        opacity: 0.6;
      }

      &__icon {
        svg {
          width: 52px;
        }
      }

      &__temperature {
        font-weight: 600;
        font-size: 20px;
      }

      &__wind {
        font-size: 14px;

        svg {
          width: 8px !important;
        }
      }
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
  }

  &__current-icon {
    svg {
      width: 52px !important;
    }

    margin-left: 14px;
  }

  &__current {
    display: flex;
    align-items: center;

    h3 {
      font-size: 28px;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      opacity: 0.5;
    }
  }

  &__location {
    h3 {
      font-size: 24px;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      opacity: 0.5;
    }
  }
}

</style>