<template>
  <client-only>
    <resizabale-wrapper :resizable="resizable" :config="{maxHeight, maxWidth}">
      <div class="password-generator">
        <div class="password-generator__countdown-tooltip text-end text-[12px] pb-2"
             :style="{color: config.text_color, opacity: !remainingSeconds ? '0' : '0.5'}">
          The password will be cleared in {{ formatTime(remainingSeconds) }}
        </div>
        <div class="password-generator__row relative">
          <template v-if="reliabilityPercent < 80 && passwordValue.length > 0">
            <Popper arrow hover width="200" class="absolute left-[8px] top-[-28px] h-[28px]">
              <vue-feather type="alert-triangle"
                           size="18"
                           class="text-orange-600 cursor-pointer "/>
              <template #content>
                <div v-if="weaknesses.length > 0">
                  <ol class="list-decimal pl-4">
                    <template v-for="item in weaknesses">
                      <li v-if="item" :key="item.message">
                        {{ item.message }}
                      </li>
                    </template>
                  </ol>
                </div>
              </template>
            </Popper>
          </template>
          <div class="password-generator__input flex justify-end relative">
            <div class="input__slot relative overflow-hidden rounded-l-lg">
              <input v-model="passwordValue" type="text"
                     class="text-[14px] w-full rounded-lg min-w-[280px] rounded-r-none border border-gray-200 px-[16px] min-h-[40px]"
                     :style="{'border-color': config.border_color,color: config.text_color, 'background-color': config.background_color}"
                     placeholder="Enter or generate new password">
              <div class="input__reliability-status pointer-events-none absolute left-0 bottom-0 h-[3px]"
                   :style="{width:  reliabilityPercent+ '%','background-color':config.password_strength_progress_bar_color}"/>
              <transition-group name="slide-fade">
                <vue-feather
                    v-if="!isCopied"
                    @click="handleCopyPassword"
                    type="copy"
                    size="18"
                    :style="{color: config.text_color}"
                    class="absolute position-v-center right-[16px] cursor-pointer transition active:scale-[0.9] active:translate-y-[-50%]"/>
                <vue-feather v-if="isCopied" type="check"
                             class="absolute text-green-600 position-v-center right-[16px] cursor-pointer transition active:scale-[0.9] active:translate-y-[-50%]"/>
              </transition-group>
            </div>
            <button @click="handleGeneratePassword"
                    class="text-[14px] rounded-lg rounded-l-none border border-l-0 border-gray-200 px-[16px] min-h-[40px]"
                    :style="{'border-color': config.border_color, color: config.text_color, 'background-color': config.background_color }"
            >
              Generate
            </button>
          </div>
        </div>
        <div v-if="config.is_show_settings" class="password-generator__row border border-gray-200 rounded-lg p-4 mt-2"
             :style="{'border-color': config.border_color,color: config.text_color, 'background-color': config.background_color}">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-7">
              <div class="password-generator__list-item">
                <div class="list-item__label">
                  Password length
                </div>
                <div class="list-item__slot flex">
                  <input v-model="passwordLength" type="number"
                         class="bg-gray-200 bg-opacity-50 py-1 rounded text-[14px] mr-1 inline-block w-[43px] text-center">
                  <div class="range-slider">
                    <input v-model="passwordLength" type="range" min="0" max="100" class="slider"
                           :style="`--color:${config.input_color};`">
                  </div>
                </div>
              </div>
              <div class="password-generator__list-item">
                <div class="list-item__label">
                  Presets
                </div>
                <div class="list-item__slot">
                  <div class="grid grid-cols-12 gap-1">
                    <div class="col-span-6">
                        <div class="p-1 text-[12px] rounded border border-gray-200 text-center font-semibold cursor-pointer"
                             :style="{'border-color': preset === 'easy_to_read' ? `${config.input_color}`:''}"
                             @click="preset = 'easy_to_read'"
                        >
                          Easy to read
                        </div>
                    </div>
                    <div class="col-span-6">
                      <div class="p-1 text-[12px] rounded border border-gray-200 text-center font-semibold cursor-pointer"
                           :style="{'border-color': preset === 'easy_to_say' ? `${config.input_color}`:''}"
                           @click="preset = 'easy_to_say'"
                      >
                        Easy to say
                      </div>
                    </div>
                    <div class="col-span-12">
                      <div class="p-1 text-[12px] rounded border border-gray-200 text-center font-semibold cursor-pointer"
                           :style="{'border-color': preset === 'my_pref' ? `${config.input_color}`:'', }"
                           @click="preset = 'my_pref'"
                      >
                        My preferences
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-5">
              <div class="password-generator__list-item">
                <div class="list-item__label">
                  Include in password
                </div>
                <div class="list-item__slot flex flex-col">
                  <label :class="`${isPreset ? 'pointer-events-none opacity-50' : ''}`">
                    <input v-model="isAllowUpperCaseAlphabet" type="checkbox" :style="`--color:${config.input_color};`">
                    Uppercase <small class="opacity-50">(ABC...)</small>
                  </label>
                  <label :class="`${isPreset ? 'pointer-events-none opacity-50' : ''}`">
                    <input v-model="isAllowAlphabet" type="checkbox" :style="`--color:${config.input_color};`">
                    Lowercase <small class="opacity-50">(abc...)</small>
                  </label>
                  <label :class="`${isPreset ? 'pointer-events-none opacity-50' : ''}`">
                    <input v-model="isAllowNumbers" type="checkbox" :style="`--color:${config.input_color};`">
                    Numbers <small class="opacity-50">(123...)</small>
                  </label>
                  <label :class="`${isPreset ? 'pointer-events-none opacity-50' : ''}`">
                    <input v-model="isAllowSpecialChars" type="checkbox" :style="`--color:${config.input_color};`">
                    Symbols <small class="opacity-50">(!@#...)</small>
                  </label>
                  <label class="pointer-events-none opacity-50">
                    <input v-model="isPreset" type="checkbox" :style="`--color:${config.input_color};`">
                    Preset
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </resizabale-wrapper>
  </client-only>
</template>

<script>
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";
import VueFeather from "vue-feather";
import copy from 'copy-to-clipboard';
import Popper from "vue3-popper";

export default {
  components: {
    ResizabaleWrapper,
    VueFeather,
    Popper
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    resizable: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: Number,
      default: null,
    },
    maxHeight: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    preset: 'my_pref',
    isCopied: false,
    passwordValue: '',
    reliabilityPercent: 0,
    alphabet: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ],
    upperCaseAlphabet: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    numbers: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ],
    specialChars: ['!', '@', '#', '$', '%', '&', '*', '-', '_', '+', '=', '~'],
    isAllowAlphabet: true,
    isAllowUpperCaseAlphabet: true,
    isAllowNumbers: true,
    isAllowSpecialChars: true,
    passwordLength: 15,
    weaknesses: [],
    timer: null,
    isPreset:false,
    remainingSeconds: 0
  }),
  computed: {
    getReliabilityColor() {
      const value = this.reliabilityPercent / 100
      const hue = (value * 120).toString(10);
      return ["hsl(", hue, ",100%,50%)"].join("");
    },
  },
  mounted() {
    this.handleGeneratePassword()
  },
  watch: {
    passwordValue(password) {
      this.updatePasswordStrength()

      this.stopTimer()

      if (!password) return

      const FIVE_MINUTES = 5 * 60
      this.startTimer(FIVE_MINUTES)
    },
    passwordLength() {
      this.handleGeneratePassword()
    },
    preset(type) {
      if(type === 'my_pref') {
        this.isPreset = false
        this.isAllowUpperCaseAlphabet = true
        this.isAllowAlphabet = true
        this.isAllowNumbers = true
        this.isAllowSpecialChars = true
        return
      }

      if(type === 'easy_to_say' && this.passwordLength > 10) this.passwordLength = 3
      if(type === 'easy_to_read' && this.passwordLength < 13) this.passwordLength = 13

      this.isPreset = true
      this.isAllowUpperCaseAlphabet = false
      this.isAllowAlphabet = false
      this.isAllowNumbers = false
      this.isAllowSpecialChars = false
      this.handleGeneratePassword()
    },
  },
  methods: {
    startTimer(seconds) {
      this.remainingSeconds = seconds;

      this.timer = setInterval(() => {
        if (this.remainingSeconds > 0) {
          this.remainingSeconds--;
        } else {
          this.stopTimer();
          this.passwordValue = ""
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.remainingSeconds = 0;
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      let time = '';

      if (hours > 0) {
        time += this.padNumber(hours) + ':';
      }

      time += this.padNumber(minutes) + ':' + this.padNumber(remainingSeconds);

      return time;
    },
    padNumber(number) {
      return number.toString().padStart(2, '0');
    },
    updatePasswordStrength() {
      if (this.passwordValue.length === 0) return this.reliabilityPercent = 0

      this.weaknesses = this.calculatePasswordStrength(this.passwordValue)

      let strength = 100
      this.weaknesses.forEach(weakness => {
        if (weakness == null) return

        strength -= weakness.deduction
      })

      if (strength < 0) return this.reliabilityPercent = 0

      this.reliabilityPercent = strength
    },
    calculatePasswordStrength(password) {
      const weaknesses = []
      weaknesses.push(this.lengthWeakness(password))
      weaknesses.push(this.lowercaseWeakness(password))
      weaknesses.push(this.uppercaseWeakness(password))
      weaknesses.push(this.numberWeakness(password))
      weaknesses.push(this.specialCharactersWeakness(password))
      weaknesses.push(this.repeatCharactersWeakness(password))
      return weaknesses
    },
    lengthWeakness(password) {
      const length = password.length

      if (length <= 5) {
        return {
          message: 'too short',
          deduction: 40
        }
      }

      if (length <= 10) {
        return {
          message: 'could be longer',
          deduction: 15
        }
      }
    },
    handleCopyPassword() {
      copy(this.passwordValue)
      this.isCopied = true

      setTimeout(() => {
        this.isCopied = false
      }, 1000)
    },
    uppercaseWeakness(password) {
      return this.characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')
    },
    lowercaseWeakness(password) {
      return this.characterTypeWeakness(password, /[a-z]/g, 'lowercase characters')
    },
    numberWeakness(password) {
      return this.characterTypeWeakness(password, /[0-9]/g, 'numbers')
    },
    specialCharactersWeakness(password) {
      return this.characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
    },
    characterTypeWeakness(password, regex, type) {
      const matches = password.match(regex) || []

      if (matches.length === 0) {
        return {
          message: `has no ${type}`,
          deduction: 20
        }
      }

      if (matches.length <= 2) {
        return {
          message: `could use more ${type}`,
          deduction: 5
        }
      }
    },
    repeatCharactersWeakness(password) {
      const matches = password.match(/(.)\1/g) || []
      if (matches.length > 0) {
        return {
          message: 'has repeat characters',
          deduction: matches.length * 10
        }
      }
    },
    generateEasToSayPassword() {
      const words = [
        "special", "go", "pretty", "doggo", "simple",
        "solid", "silver", "happy", "jolly", "lovely",
        "funny", "sunny", "breezy", "cozy", "witty",
        "funky", "groovy", "dandy", "snazzy", "spiffy",
        "awesome", "fantastic", "marvelous", "brilliant", "amazing",
        "excellent", "wonderful", "spectacular", "fabulous", "super",
        "delightful", "charming", "vibrant", "joyful", "radiant",
        "glorious", "magnificent", "beautiful", "elegant", "graceful",
        "serene", "blissful", "tranquil", "harmonious", "whimsical",
        "dazzling", "captivating", "enchanting", "splendid", "alluring",
        "refreshing", "inspiring", "fascinating", "dreamy", "magical",
        "playful", "upbeat", "silly", "lively", "energetic",
        "quirky", "unique", "creative", "imaginative", "colorful",
        "vivid", "bold", "dynamic", "effervescent", "sparkling",
        "cheerful", "buoyant", "optimistic", "bubbly", "merry",
        "zesty", "youthful", "exuberant", "carefree", "free-spirited",
        "spontaneous", "adventurous", "thrilling", "wild", "daring",
        "bold", "brave", "fearless", "courageous", "resilient","dynamic", "innovative", "pioneering", "revolutionary", "cutting-edge",
        "progressive", "trailblazing", "forward-thinking", "modern", "advanced",
        "technological", "smart", "clever", "intelligent", "genius",
        "brilliance", "genius", "ingenious", "savvy", "astute",
        "sharp", "wise", "knowledgeable", "expert", "proficient",
        "skilled", "talented", "gifted", "capable", "competent",
        "resourceful", "versatile", "adaptable", "flexible", "agile",
        "nimble", "quick", "efficient", "effective", "productive",
        "reliable", "dependable", "trustworthy", "steady", "consistent",
        "steady", "calm", "composed", "cool", "collected",
        "poised", "serene", "balanced", "stable", "grounded",
        "confident", "self-assured", "assertive", "determined", "resolute",
        "ambitious", "driven", "motivated", "dedicated", "committed",
        "passionate", "inspired", "enthusiastic", "zealous", "eager",
        "dynamic", "vibrant", "thriving", "prosperous", "successful",
        "abundant", "bountiful", "fruitful", "rewarding", "fulfilling",
        "joyful", "blissful", "grateful", "content", "satisfied",
        "pleased", "delighted", "cheerful", "happy", "smiling","inmost","drachma","proud","fulfill","amidst","wheat","squawk","battery"
      ];

      let password = "";
      let remainingWords = this.passwordLength;

      while (remainingWords > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];

        password += randomWord + "-";
        remainingWords--;
      }

      password = password.slice(0, -1); // Remove the trailing hyphen
      return password;
    },
    generateEasToReadPassword(ucfirst = true, spchar = true) {
      const len = this.passwordLength

      const length = len - 2;
      const conso = [
        'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
        'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'
      ];
      const vowel = ['a', 'e', 'i', 'o', 'u'];
      const spchars = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '?', '=', '~'];
      let password = '';
      const max = length / 2;

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      for (let i = 1; i <= max; i++) {
        password += conso[getRandomInt(0, 19)];
        password += vowel[getRandomInt(0, 4)];
      }
      if (spchar === true) {
        password = password.substring(0, password.length - 1) + spchars[getRandomInt(0, 12)];
      }
      password += getRandomInt(10, 99);
      if (ucfirst === true) {
        password = password.charAt(0).toUpperCase() + password.slice(1);
      }
      return password;
    },
    handleGeneratePassword() {
      let allowedChars = []

      if(this.preset && this.preset === 'easy_to_read') {
         return this.passwordValue = this.generateEasToReadPassword()
      }
      if(this.preset && this.preset === 'easy_to_say') {
         return this.passwordValue = this.generateEasToSayPassword()
      }

      if(!this.isAllowAlphabet && !this.isAllowUpperCaseAlphabet && !this.isAllowNumbers && !this.isAllowSpecialChars) {
        return this.passwordValue = 'The_Worlds_Worst_Password)1)!)'
      }

      if (this.isAllowAlphabet) allowedChars = [...allowedChars, ...this.alphabet]
      if (this.isAllowUpperCaseAlphabet) allowedChars = [...allowedChars, ...this.upperCaseAlphabet]
      if (this.isAllowNumbers) allowedChars = [...allowedChars, ...this.numbers]
      if (this.isAllowSpecialChars) allowedChars = [...allowedChars, ...this.specialChars]

      this.passwordValue = this.generatePassword(allowedChars, this.passwordLength)
    },
    generatePassword(allowedChars, length = 6) {
      let password = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
      }

      return password;
    },
  }
}
</script>

<style lang="scss">
.password-generator {

  &__list-item {
    .list-item {
      &__label {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      &__slot {
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input {
          margin-right: 8px;
        }

        label {
          font-size: 14px;
          display: flex;
          align-items: center;
          margin-bottom: 4px;

          small {
            margin-left: 4px;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    & + & {
      margin-top: 16px;
    }
  }

  .popper {
    min-width: 260px;
  }

  &__countdown-tooltip {
    color: rgba(118, 118, 118, 0.6);
  }

  &__input {
    .input {
      &__reliability-status {
        background-color: #00A878;
      }

      &__slot {
        //
      }
    }

    input {
      &:focus {
        outline: none;
      }
    }
  }

  input[type="checkbox"] {
    accent-color: var(--color);
  }
}

</style>