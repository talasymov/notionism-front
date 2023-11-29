<template>
  <div>
    <div class="grid grid-cols-3">
      <div v-for="service in services" class="flex flex-col">
        {{ service.name }}

        <div v-if="service.tokens.length !== 0">
          <span class="text-green-400">Connected</span><br>
          <span>{{ moment(service.tokens[0].created_at).fromNow() }}</span><br>
          <button class="my-button bg-primary text-white" @click="disconnect(service)">Disconnect</button>
        </div>
        <div v-else>
          <button class="my-button bg-blue-500 text-white" @click="connect(service.codename)">Connect</button>
        </div>
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div>
        <div class="py-10">
          Select Calendar
          <button @click="fetchCalendarList">Load</button>
        </div>
        <div>
          <div v-for="calendar in calendar_list">
            {{ calendar.summary }}
            <button @click="selectCalendar(calendar)">Select</button>
          </div>
        </div>
<!--        <div class="py-10">-->
<!--          2 Step. Select Events-->
<!--        </div>-->
<!--        <div>-->
<!--          <div v-for="event in events">-->
<!--            {{ event.summary }}-->
<!--            <button @click="selectEvent(event)">Select</button>-->
<!--          </div>-->
<!--        </div>-->
        <div class="py-10">
          Select Notion DB
        </div>
        <div>
          <TextInput v-model="sync_settings.database_url" type="text" label="Notion Events DB"/>
<!--          <TextInput v-model="sync_settings.notion_attendees_db" type="text" label="Notion Attendees DB"/>-->
          <button @click="fetchNotionProps">Test & Fetch props</button>
        </div>
        <div>
          <h3>Events Mapping</h3>
          <div v-for="prop in page_props_events">
            <div>
              {{ prop.name }}
            </div>
            <div>
              <Select v-model="sync_settings.mapping.events[prop.name]" :options="calendar_props_events"
                      label="Choose association"/>
            </div>
          </div>
<!--          <h3>Attendees Mapping</h3>-->
<!--          <div v-for="prop in page_props_attendees">-->
<!--            <div>-->
<!--              {{ prop.name }}-->
<!--            </div>-->
<!--            <div>-->
<!--              <Select v-model="sync_settings.mapping_attendees[prop.name]" :options="calendar_props_attendees"-->
<!--                      label="Choose association"/>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div class="py-10">
          Select Notion DB
        </div>
        <div class="py-10">
          <button @click="testAutomation">Test Automation</button>
        </div>
        <div class="py-10">
          <button @click="createAutomation">Create Automation</button>
        </div>
      </div>
      <div>
        <div>Sync Settings</div>
        {{ sync_settings }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {useAuthStore} from "~/store/auth";
import TextInput from "~/components/form/TextInput.vue";
import Select from "~/components/form/Select.vue";

const config = useRuntimeConfig()
const sync_settings = ref({
  calendar_name: '',
  // events: <any>[],
  database_url: '',
  mapping: {
    events: {}
  },
})
const authStore = useAuthStore()

const calendar_props_events = [
  {id: 'summary', name: 'Summary'},
  {id: 'creator', name: 'Creator'},
  {id: 'date', name: 'Date'},
  {id: 'description', name: 'Description'},
  {id: 'location', name: 'Location'},
  {id: 'hangoutLink', name: 'Meet link'},
  {id: 'attendees', name: 'Guests'},
  {id: 'reminders', name: 'Reminders'},
]

const calendar_props_attendees = [
  {id: 'email', name: 'Email'},
]

const {data: {value: {services: services}}} = await useAsyncData('integrations/manager', () => useBaseFetch('integrations/manager'))
const connect = (codename: string) => window.location.href = `${config.public.apiBase}auth/${codename}/redirect?token=${authStore.token}`
const disconnect = async (service: any) => await useAsyncData('integrations/manager/delete', () => useBaseFetch(`integrations/manager/${service.codename}`, {
  method: 'DELETE'
})).then(() => {
  useNotify({
    message: 'Disconnected',
    type: 'info'
  })

  service.tokens = []
})

const fetchEvents = async (calendar_id: any) => {
  events.value = (await useBaseFetch(`integrations/google/calendar/events/list?id=${calendar_id}`)).items
}

const events = ref([])

const selectCalendar = async (calendar: any) => {
  sync_settings.value.calendar_name = calendar.id
  // await fetchEvents(calendar.id)
}

const selectEvent = (event: any) => {
  sync_settings.value.events.push(event.id)
}

const calendar_list = ref([])

const fetchCalendarList = async () => {
  await useBaseFetch('integrations/google/calendar/calendar-list/list')
      .then((r: any) => calendar_list.value = r.items)
      .catch(() => useNotify({message: 'Error, check form', type: 'error'}))
}

const page_props_events = ref([])
const page_props_attendees = ref([])

const fetchNotionProps = async () => {
  page_props_events.value = (await useBaseFetch(`integrations/notion/database/view?id=${sync_settings.value.database_url}`)).properties
  // page_props_attendees.value = (await useBaseFetch(`integrations/notion/database/view?id=${sync_settings.value.notion_attendees_db}`)).properties
}

const testAutomation = async () => await useAsyncData(`integrations/automation/test`, () => {
      useBaseFetch(`integrations/automation/test`, {
        method: 'POST',
        body: {
          type: 'google_calendar',
          config: sync_settings.value
        }
      })
          .then(() => useNotify({message: 'Successfully Tested', type: 'success'}))
          .catch(() => useNotify({message: 'Error, check form', type: 'error'}))
    }
)

const createAutomation = async () => await useAsyncData(`integrations/automation`, () => {
      useBaseFetch(`integrations/automation`, {
        method: 'POST',
        body: {
          type: 'google_calendar',
          config: sync_settings.value
        }
      })
          .then(() => useNotify({message: 'Successfully Created', type: 'success'}))
          .catch(() => useNotify({message: 'Error, check form', type: 'error'}))
    }
)

</script>