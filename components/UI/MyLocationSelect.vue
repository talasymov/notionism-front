<template>
  <div class="my-input relative">
    <label
        class="my-input__label block mb-2 text-base font-medium text-gray-900"
        @click="toggleOpen"
    >
      {{ label }}
    </label>
    <div :class="`${findLoading ? 'loading' : ''} relative inline-block w-full`">
      <div class="my-input__slot relative" @click="toggleOpen">
        <div  v-if="selected" class="my-input__selected">
          <span ref="selected">{{selected.name}}  <span class="opacity-50">| {{selected.country}}</span></span>
        </div>
        <input
            @focus="isFocused = true"
            @blur="isFocused = false"
            @input="handleInput"
            :placeholder="selected !== null ? '' : placeholder"
            v-model="searchTerm"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
          <template v-if="findLoading">
            <loader-icon/>
          </template>
          <template v-else>
            <template v-if="!selected">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z" fill="black"/>
                </svg>
            </template>
            <template v-else>
              <svg class="cursor-pointer" @click.prevent.stop="handleClear" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289Z" fill="black"/>
              </svg>
            </template>
          </template>
        </div>
      </div>
      <div v-show="isOpen" class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
        <template v-if="options && options.length > 0">
          <ul class="py-1 overflow-auto text-base leading-6 shadow-xs max-h-48 focus:outline-none sm:text-base sm:leading-5">
            <li v-for="(option, index) in filteredOptions" :key="index" @click="selectOption(option)">
              <div class="px-4 py-2 cursor-pointer flex justify-between hover:bg-gray-100">
                <div>
                  {{ option.name }}
                </div>
                <div/>
                <div class="opacity-50">
                  {{ option.place }}・{{ option.country }}
                </div>
              </div>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="py-1 overflow-auto text-base leading-6 shadow-xs max-h-48 focus:outline-none sm:text-base sm:leading-5">
            <li>
              <div class="px-4 py-2 hover:bg-gray-100 opacity-50">
                No items...
              </div>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderIcon from "~/components/icons/LoaderIcon.vue";

export default {
  components: {LoaderIcon},
  props: {
    modelValue: {},
    label: {
      type: String,
      required: false,
    },
    valueName: {
      type: String,
      default: 'value',
    },
    placeholder: {
      type: String,
      required: false,
      default: "Select an option",
    },
  },
  data: () => ({
    isOpen: false,
    isFocused: false,
    selected: null,
    searchTerm: "",
    searchTimeout: null,
    options: [],
    findLoading: false,
  }),
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
          option.name.toLowerCase().includes(String(this.searchTerm).toLowerCase())
      );
    },
  },
  methods: {
    handleInput({target:{value:locationString}}) {
      this.handleClear()

      clearTimeout(this.searchTimeout)

      this.findLoading = true

      this.searchTimeout = setTimeout(() => {
        this.fetchLocationByName(locationString)
      }, 3500)
    },
    async fetchLocationByName(nameString) {
      this.findLoading = false

      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${nameString}`

        const resp = await $fetch(url)

        if(resp) {
          if(!resp.results) return

          this.options = resp.results.map(v => ({
            name: v.name,
            country: v.country,
            place: v.admin1,
            value: {
              city: v.name,
              latitude: v.latitude,
              longitude: v.longitude,
            }
          }))
        }
      }catch (e) {
        this.findLoading = false
        console.error(e)
      }
    },
    handleClear() {
      this.selected = null
      this.$emit("update:modelValue", null);
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.$emit("input", option[this.valueName]);
      this.$emit("update:modelValue", option[this.valueName]);
      this.selected = option
      this.searchTerm = ''
      this.isOpen = false;
    },
  },
  mounted() {
    if(this.modelValue !== null) {
      const math = this.options.find(v => v[this.valueName] === this.modelValue)

      if(math) this.selectOption(math)
    }

    document.addEventListener("click", (event) => {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    });
  },
  beforeUnmount() {
    document.removeEventListener("click", (event) => {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    });
  }
};
</script>

<style>
/* Optional styling for the select component */
</style>