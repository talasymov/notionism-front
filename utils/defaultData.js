export const PRIMARY_COLOR = '#E11D48'

export const TIMEZONES = {
    'UTC-9': 'America/Anchorage',
    'UTC-7': 'America/Los_Angeles',
    'UTC-6': 'America/Denver',
    'UTC-5': 'America/Chicago',
    'UTC-4': 'America/New_York',
    'UTC-3': 'America/Sao_Paulo',
    'UTC+0': 'Europe/London',
    'UTC+1': 'Europe/Berlin',
    'UTC+2': 'Africa/Cairo',
    'UTC+3': 'Europe/Moscow',
    'UTC+7': 'Asia/Bangkok',
    'UTC+8': 'Asia/Singapore',
    'UTC+9': 'Asia/Tokyo',
    'UTC+10': 'Australia/Sydney',
    'UTC+12': 'Pacific/Auckland'
};

export const WMO_CODES = {
    "0": "Clear sky",
    "1": "Mainly clear",
    "2": "Mainly clear",
    "3": "Mainly clear",
    "45": "Fog",
    "48": "Fog",
    "51": "Drizzle",
    "53": "Drizzle",
    "55": "Drizzle",
    "56": "Freezing Drizzle",
    "57": "Freezing Drizzle",
    "61": "Rain",
    "63": "Rain",
    "65": "Rain",
    "66": "Freezing Rain",
    "67": "Freezing Rain",
    "71": "Snow fall",
    "73": "Snow fall",
    "75": "Snow fall",
    "77": "Snow grains",
    "80": "Rain showers",
    "81": "Rain showers",
    "82": "Rain showers",
    "85": "Snow showers",
    "86": "Snow showers",
    "95": "Thunderstorm",
    "96": "Thunderstorm",
    "99": "Thunderstorm",
}

export const BASE_BREADCRUMBS = [
    {
        id: 0,
        test: 1,
        html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9036 4.85667C12.7971 3.94825 11.2029 3.94825 10.0964 4.85667L4.73093 9.26165C4.2682 9.64155 4 10.2087 4 10.8074V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.8074C20 10.2087 19.7318 9.64155 19.2691 9.26165L13.9036 4.85667ZM8.82732 3.31089C10.6715 1.79684 13.3285 1.79684 15.1727 3.31089L20.5381 7.71587C21.4636 8.47565 22 9.61006 22 10.8074V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V10.8074C2 9.61006 2.53641 8.47565 3.46186 7.71587L8.82732 3.31089Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C8 14.3431 9.34315 13 11 13H13C14.6569 13 16 14.3431 16 16V21H14V16C14 15.4477 13.5523 15 13 15H11C10.4477 15 10 15.4477 10 16V21H8V16Z" fill="black"/>
  </svg> Home`,
        path: '/'
    },
]

export const TEMPLATE_LIBRARY_BREADCRUMBS = [
    ...BASE_BREADCRUMBS,
    {
        id: 1,
        html: 'Template Library',
        disabled: true,
    }
]

export const WIDGET_LIBRARY_BREADCRUMBS = [
    ...BASE_BREADCRUMBS,
    {
        id: 1,
        html: 'Widget Library',
        disabled: true,
    }
]

export const DASHBOARD_BREADCRUMBS = [
    ...BASE_BREADCRUMBS,
    {
        id: 1,
        html: 'Dashboard',
        disabled: true,
    }
]

export const USER_PROFILE_BREADCRUMBS = [
    ...BASE_BREADCRUMBS,
    {
        id: 1,
        html: 'User Profile',
        disabled: true
    }
]