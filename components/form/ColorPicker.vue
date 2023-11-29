<template>
  <div class="relative">
    <label class="block mb-1 text-base font-medium text-gray-900">{{ label }}</label>
    <div class="flex gap-x-2">
      <div class="flex my-2" v-for="color in colors">
        <div
            class="w-6 h-6 rounded-full cursor-pointer"
            :style="`background-color: ${color.items[4].color}`"
            @click="color.expand = !color.expand"
        ></div>

        <div class="absolute bg-gray-50 w-full left-0 z-10" v-if="color.expand">
          <div class="flex gap-x-2">
            <div
                class="w-6 h-6 cursor-pointer rounded-full hover:scale-110"
                :style="`background-color: ${item.color}`"
                @click="pickColor(color, item)"
                v-for="item in color.items"
            ></div>
            <div
                class="w-6 h-6 cursor-pointer rounded-full hover:scale-110"
                @click="color.expand = false"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" fill="black"/>
              </svg>

            </div>
          </div>
        </div>
      </div>
      <div class="flex my-2">
        <div
            class="w-6 h-6 rounded-full cursor-pointer border-red-500 border-2"
            :style="`background-color: white`"
            @click="pickColor({},{color: '#ffffff'})"
        ></div>
      </div>
      <div class="flex my-2">
        <label
            class="w-6 h-6 rounded-full cursor-pointer bg-rainbow"
        >

          <input style="visibility: hidden" type="color" name="color" :value="modelValue" @input="handleChangeColor">
        </label>
      </div>
    </div>
  </div>
</template>

<script setup type="ts">
defineProps({
  modelValue: null,
  label: null
})

const emit = defineEmits(['update:modelValue'])

const pickColor = function (color, item) {
  emit('update:modelValue', item.color)
  color.expand = false
}

function handleChangeColor({target}) {
  emit('update:modelValue', target.value)
}

const colors = ref([
  {
    expand: false,
    color_name: 'gray',
    items: [
      {
        name: '100',
        color: '#f7fafc'
      },
      {
        name: '200',
        color: '#edf2f7'
      },
      {
        name: '300',
        color: '#e2e8f0'
      },
      {
        name: '400',
        color: '#cbd5e0'
      },
      {
        name: '500',
        color: '#a0aec0'
      },
      {
        name: '600',
        color: '#718096'
      },
      {
        name: '700',
        color: '#4a5568'
      },
      {
        name: '800',
        color: '#2d3748'
      },
      {
        name: '900',
        color: '#1a202c'
      }
    ]
  },
  {
    expand: false,
    color_name: 'red',
    items: [
      {
        name: '100',
        color: '#fff5f5'
      },
      {
        name: '200',
        color: '#fed7d7'
      },
      {
        name: '300',
        color: '#feb2b2'
      },
      {
        name: '400',
        color: '#fc8181'
      },
      {
        name: '500',
        color: '#f56565'
      },
      {
        name: '600',
        color: '#e53e3e'
      },
      {
        name: '700',
        color: '#c53030'
      },
      {
        name: '800',
        color: '#9b2c2c'
      },
      {
        name: '900',
        color: '#742a2a'
      }
    ]
  },
  {
    expand: false,
    color_name: 'orange',
    items: [
      {
        name: '100',
        color: '#fffaf0'
      },
      {
        name: '200',
        color: '#feebc8'
      },
      {
        name: '300',
        color: '#fbd38d'
      },
      {
        name: '400',
        color: '#f6ad55'
      },
      {
        name: '500',
        color: '#ed8936'
      },
      {
        name: '600',
        color: '#dd6b20'
      },
      {
        name: '700',
        color: '#c05621'
      },
      {
        name: '800',
        color: '#9c4221'
      },
      {
        name: '900',
        color: '#7b341e'
      }
    ]
  },
  {
    expand: false,
    color_name: 'yellow',
    items: [
      {
        name: '100',
        color: '#fffff0'
      },
      {
        name: '200',
        color: '#fefcbf'
      },
      {
        name: '300',
        color: '#faf089'
      },
      {
        name: '400',
        color: '#f6e05e'
      },
      {
        name: '500',
        color: '#ecc94b'
      },
      {
        name: '600',
        color: '#d69e2e'
      },
      {
        name: '700',
        color: '#b7791f'
      },
      {
        name: '800',
        color: '#975a16'
      },
      {
        name: '900',
        color: '#744210'
      }
    ]
  },
  {
    expand: false,
    color_name: 'green',
    items: [
      {
        name: '100',
        color: '#f0fff4'
      },
      {
        name: '200',
        color: '#c6f6d5'
      },
      {
        name: '300',
        color: '#9ae6b4'
      },
      {
        name: '400',
        color: '#68d391'
      },
      {
        name: '500',
        color: '#48bb78'
      },
      {
        name: '600',
        color: '#38a169'
      },
      {
        name: '700',
        color: '#2f855a'
      },
      {
        name: '800',
        color: '#276749'
      },
      {
        name: '900',
        color: '#22543d'
      }
    ]
  },
  {
    expand: false,
    color_name: 'teal',
    items: [
      {
        name: '100',
        color: '#e6fffa'
      },
      {
        name: '200',
        color: '#b2f5ea'
      },
      {
        name: '300',
        color: '#81e6d9'
      },
      {
        name: '400',
        color: '#4fd1c5'
      },
      {
        name: '500',
        color: '#38b2ac'
      },
      {
        name: '600',
        color: '#319795'
      },
      {
        name: '700',
        color: '#2c7a7b'
      },
      {
        name: '800',
        color: '#285e61'
      },
      {
        name: '900',
        color: '#234e52'
      }
    ]
  },
  {
    expand: false,
    color_name: 'blue',
    items: [
      {
        name: '100',
        color: '#ebf8ff'
      },
      {
        name: '200',
        color: '#bee3f8'
      },
      {
        name: '300',
        color: '#90cdf4'
      },
      {
        name: '400',
        color: '#63b3ed'
      },
      {
        name: '500',
        color: '#4299e1'
      },
      {
        name: '600',
        color: '#3182ce'
      },
      {
        name: '700',
        color: '#2b6cb0'
      },
      {
        name: '800',
        color: '#2c5282'
      },
      {
        name: '900',
        color: '#2a4365'
      }
    ]
  },
  {
    expand: false,
    color_name: 'indigo',
    items: [
      {
        name: '100',
        color: '#ebf4ff'
      },
      {
        name: '200',
        color: '#c3dafe'
      },
      {
        name: '300',
        color: '#a3bffa'
      },
      {
        name: '400',
        color: '#7f9cf5'
      },
      {
        name: '500',
        color: '#667eea'
      },
      {
        name: '600',
        color: '#5a67d8'
      },
      {
        name: '700',
        color: '#4c51bf'
      },
      {
        name: '800',
        color: '#434190'
      },
      {
        name: '900',
        color: '#3c366b'
      }
    ]
  },
  {
    expand: false,
    color_name: 'purple',
    items: [
      {
        name: '100',
        color: '#faf5ff'
      },
      {
        name: '200',
        color: '#e9d8fd'
      },
      {
        name: '300',
        color: '#d6bcfa'
      },
      {
        name: '400',
        color: '#b794f4'
      },
      {
        name: '500',
        color: '#9f7aea'
      },
      {
        name: '600',
        color: '#805ad5'
      },
      {
        name: '700',
        color: '#6b46c1'
      },
      {
        name: '800',
        color: '#553c9a'
      },
      {
        name: '900',
        color: '#44337a'
      }
    ]
  },
  {
    expand: false,
    color_name: 'pink',
    items: [
      {
        name: '100',
        color: '#fff5f7'
      },
      {
        name: '200',
        color: '#fed7e2'
      },
      {
        name: '300',
        color: '#fbb6ce'
      },
      {
        name: '400',
        color: '#f687b3'
      },
      {
        name: '500',
        color: '#ed64a6'
      },
      {
        name: '600',
        color: '#d53f8c'
      },
      {
        name: '700',
        color: '#b83280'
      },
      {
        name: '800',
        color: '#97266d'
      },
      {
        name: '900',
        color: '#702459'
      }
    ]
  }
])
</script>