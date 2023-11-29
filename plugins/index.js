import {createApp} from 'vue'
import App from '~/app.vue'
import VueKinesis from "vue-kinesis";

import 'v-calendar/style.css';

const app = createApp(App)

import { setupCalendar } from 'v-calendar';

// Use calendar defaults (optional)
app.use(setupCalendar, {})

app.use(VueKinesis);

export default app
