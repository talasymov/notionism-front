<template>
    <client-only>
        <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
            <div class="col-span-12 mb-8">
                <div class="breadcrumbs">
                    <my-breadcrumbs :breadcrumbs="breadcrumbs"/>
                </div>
            </div>
            <div class="col-span-12 mb-8">
                <div class="grid grid-cols-12">
                    <div class="col-span-6">
                        <div class="h-[550px]" ref="widgetWrapper">
                            <pomodoro
                                    v-if="widget.codename === 'pomodoro'"
                                    :config="config"
                                    :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                    :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                    :resizable="true"
                            />
                            <analog-clock
                                    v-else-if="widget.codename === 'analog_clock'"
                                    :config="config"
                                    :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                    :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                    :resizable="true"
                            />
                            <digital-clock
                                    v-else-if="widget.codename === 'digital_clock'"
                                    :config="config"
                                    :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                    :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                    :resizable="true"
                            />
                            <weather-widget
                                    v-else-if="widget.codename === 'weather'"
                                    :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                    :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                    :config="config"
                                    :resizable="true"
                            />
                            <calendar-widget
                                    v-else-if="widget.codename === 'calendar'"
                                    :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                    :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                    :config="config"
                                    :resizable="true"
                            />
                            <quotes-widget
                                    v-else-if="widget.codename === 'quotes'"
                                    :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                    :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                    :config="config"
                                    :data="widget_data"
                                    :resizable="true"
                            />
                            <life-progress-bar-widget
                                    v-else-if="widget.codename === 'life_progress_bar'"
                                    :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                    :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                    :config="config"
                                    :data="widget_data"
                                    :resizable="true"
                            />
                            <countdown-widget
                                v-else-if="widget.codename === 'countdown'"
                                :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                :config="config"
                                :data="widget_data"
                                :resizable="true"
                            />
                            <retro-clock-widget
                                v-else-if="widget.codename === 'retro_clock'"
                                :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                :config="config"
                                :data="widget_data"
                                :resizable="true"
                            />
                            <widgets-password-generator
                                v-else-if="widget.codename === 'password_generator'"
                                :max-width="widgetWrapper && widgetWrapper.offsetWidth"
                                :max-height="widgetWrapper && widgetWrapper.offsetHeight"
                                :config="config"
                                :data="widget_data"
                                :resizable="true"
                            />
                            <div v-else>
                                <div class="flex justify-center">
                                    Unsupported type of widget
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 my-5">
                            <div
                                    class="whitespace-nowrap overflow-scroll hide-scroll bg-gray-100 p-3 rounded-lg text-gray-400 text-base">
                                {{ `https://notionism.org/widgets/embed/${id}` }}
                            </div>
                            <popper content="Click to copy embed-URL" hover>
                                <div
                                        class="my-button cursor-pointer min-w-[44px] justify-center h-[44px] my-button--md my-button--bordered"
                                        @click="handleCopy(`https://notionism.org/widgets/embed/${id}`)">
                                    <copy-icon/>
                                </div>
                            </popper>
                        </div>
                    </div>
                    <div class="col-span-6">
                        <div class="px-4 py-4 md:py-0 bg-white sm:rounded-lg">
                            <section>
                                <form @submit.prevent="save">
                                    <div class="px-2 font-semibold text-base mb-2">Configuration Sections</div>
                                    <div class="flex flex-wrap gap-2 justify-center px-2">
                                        <div v-for="(group_item, i) in widget.data.ui"
                                             :class="['cursor-pointer py-1 rounded-lg border-2 border-gray-200 flex-1 basis-[20%] text-center flex justify-center items-center h-full', {'bg-rose-500 text-white border-rose-500': i === active_group_id}]"
                                             @click="select_group(i, group_item)"
                                             style="transition: 150ms ease-in-out;"
                                        >
                                            {{ group_item.name }}
                                        </div>
                                    </div>

                                    <div v-if="active_group" class="space-y-2 p-4 rounded-lg">
                                        <div v-show="active_group_id === 0">
                                            <TextInput v-model="widget.name" label="Name" type="text"/>
                                        </div>
                                        <div v-for="item in active_group.types">
                                            <text-input v-if="item.type === 'Text'" v-model="config[item.key]"
                                                        :label="item.name"
                                                        type="text"/>
                                            <text-input v-if="item.type === 'Number'" v-model="config[item.key]"
                                                        :label="item.name"
                                                        type="number"/>
                                            <my-autocomplete
                                                    v-if="item.type === 'Select'"
                                                    v-model="config[item.key]" :placeholder="`Select ${item.name}`"
                                                    :label="item.name" :options="item.config.items || []"
                                                    value-name="id"/>
                                            <color-picker v-if="item.type === 'Color'" v-model="config[item.key]"
                                                          :label="item.name"/>
                                            <checkbox v-if="item.type === 'Boolean'" v-model="config[item.key]"
                                                      :label="item.name"/>
                                            <my-location-select v-if="item.type === 'Location'"
                                                                v-model="config[item.key]"
                                                                placeholder="Type to find" label="City"/>
                                            <pure-color-selector v-if="item.type === 'PureColor'"
                                                                 v-model="config[item.key]"
                                                                 :label="item.name"/>
                                            <DatePicker v-if="item.type === 'DatePicker'" v-model="config[item.key]"
                                                        :masks="{
                                                input: 'YYYY-MM-DD'
                                            }">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <label
                                                            class="my-input__label block mb-2 text-base font-medium text-gray-900"
                                                    >
                                                        {{ item.name }}
                                                    </label>
                                                    <input
                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                            :value="inputValue"
                                                            v-on="inputEvents"
                                                    />
                                                </template>
                                            </DatePicker>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-4 mt-4">
                                        <button
                                                :class="`my-button bg-green-500 my-button--block text-white my-button--md ${saveLoading ? 'loading' : ''}`">
                                            <span class="mr-2">Save</span>
                                            <check-box-icon dark/>
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script setup>
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";
import Pomodoro from "~/components/widgets/Pomodoro.vue";
import TextInput from "~/components/form/TextInput.vue";
import ColorPicker from "~/components/form/ColorPicker.vue";
import {BASE_BREADCRUMBS} from "~/utils/defaultData";
import AnalogClock from "~/components/widgets/AnalogClock.vue";
import DigitalClock from "~/components/widgets/DigitalClock";
import Checkbox from "~/components/form/Checkbox.vue";
import WeatherWidget from "~/components/widgets/weather/WeatherWidget.vue";
import CheckBoxIcon from "~/components/icons/CheckBoxIcon.vue";
import {useNotification} from "~/composables/useNotifications";
import MyAutocomplete from "~/components/UI/MyAutocomplete.vue";
import MyLocationSelect from "~/components/UI/MyLocationSelect.vue";
import CopyIcon from "~/components/icons/CopyIcon.vue";
import copy from "copy-to-clipboard";
import CalendarWidget from "~/components/widgets/calendar/CalendarWidget.vue";
import QuotesWidget from "~/components/widgets/quotes/QuotesWidget.vue";
import PureColorSelector from "~/components/UI/PureColorSelector.vue";
import LifeProgressBarWidget from "~/components/widgets/LifeProgressBar/LifeProgressBarWidget.vue";
import {DatePicker} from "v-calendar";
import CountdownWidget from "~/components/widgets/Countdown/CountdownWidget.vue";
import RetroClockWidget from "~/components/widgets/RetroClock/RetroClockWidget.vue";
import Popper from "vue3-popper";

definePageMeta({
    middleware: ['auth'],
    layout: 'user'
})

const notification = useNotification()

const route = useRoute()
const id = route.params.id

const widgetWrapper = ref(null)

const widget = ref({data: {ui: []}})
const config = ref({})
const widget_data = ref({})

const saveLoading = ref(false)
const loadingWidgetData = ref(false)
const handleCopy = (data) => {
    copy(data)
    notification.notify({
        title: "Copied",
        content: `URL successfully coppied to clipboard.`,
        type: "success",
        duration: 10000,
    })
}

const active_group = ref({})
const active_group_id = ref(0)

const breadcrumbs = [...BASE_BREADCRUMBS,
    {
        id: 1,
        html: 'Dashboard',
        path: '/dashboard'
    },
    {
        id: 2,
        html: 'Builder',
        disabled: true,
    },
]
const getWidgetDataFromApi = async () => await useAsyncData(`/dashboard/user-widgets/${route.params.id}/edit`, () => useBaseFetch(`dashboard/user-widgets/${route.params.id}/edit`))

const fetchWidgetData = async () => {
    try {
        loadingWidgetData.value = true

        const widgetData = await getWidgetDataFromApi()

        if (widgetData.data.value) {
            widget.value = widgetData.data.value
            config.value = widgetData.data.value.config
            widget_data.value = widgetData.data.value.widget_data

            select_group(0, widget.value.data.ui[0])
        }
    } catch (e) {
        notification.notify({
            title: 'Something wrong',
            content: "Some error, please write for us",
            type: 'error',
        })
    } finally {
        loadingWidgetData.value = false
    }
}

const save = async () => {
    saveLoading.value = true
    try {
        await useBaseFetch(`dashboard/user-widgets/${id}`, {
            method: 'PUT',
            body: {
                'name': widget.value.name,
                'config': widget.value.config
            }
        })
        notification.notify({
            title: 'Successfully saved',
            content: 'All changes made have been successfully saved.',
            type: 'success'
        })
    } catch (error) {
        notification.notify({title: 'Something wrong', content: 'Some error, please write for us.', type: 'error'})
    } finally {
        saveLoading.value = false
    }
}

const select_group = (id, item) => {
    active_group_id.value = id
    active_group.value = item
}

fetchWidgetData()

</script>