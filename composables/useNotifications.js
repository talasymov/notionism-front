import {createApp} from 'vue'
import './useNotifications/index.scss'

const ICONS = {
    'success': `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="#3FB75A" stroke-width="2"/>
                    <path d="M16 9L11 15L8 12.2727" stroke="#3FB75A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `,
    'warning': `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z" stroke="#E88A1B" stroke-width="2"/>
                    <path d="M12.01 8V12M12.01 16H12" stroke="#E88A1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `,
    'error': `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z" stroke="#D63C3C" stroke-width="2"/>
                    <path d="M9 9L15 15M15 9L9 15" stroke="#D63C3C" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `,
}

class NotificationConstructor {
    type;
    title;
    content;
    duration;
    props;
    icon;
    customClass;
    className;
    $instance;
    $removeTimeout;
    $freezedHideTimer;
    $dateWhenItemRemoved;

    constructor(opts, className) {
        this.type = opts.type || 'default'
        this.title = opts.title || 'Notification'
        this.content = opts.content || {}
        this.duration = opts.duration || 2000
        this.className = className
        this.$endless = opts.duration === 'none'
        this.props = opts.props || {}
        this.icon = opts.icon
        this.customClass = opts.customClass
        this.isPrompt = opts.prompt

        // CONTAINER ==============
        const instance = document.createElement('div')
        instance.className = `${this.className}`
        instance.classList.add(`${this.className}--${this.type}`)
        if(this.customClass) instance.classList.add(this.customClass)
        instance.addEventListener('mouseenter', () => {this.freezeHide()})
        instance.addEventListener('mouseleave', () => {this.resumeHide()})

        // BODY ==============
        const body = document.createElement('div')
        body.className = `${this.className}__body`

        // TITLE ==============
        const title = document.createElement('div')
        title.className = `${this.className}__title`
        title.innerHTML = this.title

        // CONTENT ==============
        const content = document.createElement('div')
        content.className = `${this.className}__content`

        // is Vue component
        if(this.content.__hmrId !== undefined) {
            createApp(this.content, this.props).mount(content)
        } else {
            content.innerHTML = this.content
        }

        // CLOSE BUTTON ==============
        const closeBtn = document.createElement('div')
        closeBtn.className = `${this.className}__close-btn`
        closeBtn.textContent = 'close'
        closeBtn.onclick = this.remove.bind(this)

        // ICON ==============
        const icon = document.createElement('div')
        icon.className = `${this.className}__icon`

        if((this.type !== 'default' || this.icon) && this.isPrompt) {
            icon.classList.add(`icon--is-prompt`)
        }

        if(this.type !== 'default' && !this.icon) {
            icon.innerHTML = this.getIconOfType(this.type)
            instance.appendChild(icon)
        }

        if(this.icon) {
            if(this.icon.__hmrId !== undefined) {
                createApp(this.icon, {}).mount(icon)
            } else {
                icon.innerHTML = opts.icon
            }
            instance.classList.add(`${this.className}--has-icon`)
            instance.appendChild(icon)
        }

        // APPENDING ==============
        body.appendChild(title)
        body.appendChild(content)
        body.appendChild(closeBtn)

        instance.appendChild(body)

        this.$instance = instance

        this.setRemoveTimeout()
    }

    get instance() {
        return this.$instance
    }

    remove() {
        this.$instance.classList.add(`${this.className}--removing`)

        this.$instance.onanimationend = () => this.$instance.remove()
    }

    appear() {
        this.$instance.classList.add(`${this.className}--appear`)

        this.$instance.onanimationend =() => {
            this.$instance.classList.remove(`${this.className}--appear`)
            this.$instance.onanimationend = null
        }
    }

    freezeHide() {
        this.$freezedHideTimer = this.$dateWhenItemRemoved - new Date().getTime()

        clearTimeout(this.$removeTimeout)
    }

    resumeHide() {
        if(this.$endless) return

        this.setRemoveTimeout(this.$freezedHideTimer)
    }

    setRemoveTimeout(duration) {
        if(this.$endless) return

        this.$dateWhenItemRemoved = new Date().getTime() + (duration || this.duration)

        this.$removeTimeout = setTimeout(() => {
            this.remove()
        }, duration || this.duration)
    }

    getIconOfType(type) {
        return ICONS[type]
    }
}

class Notification {
    className = 'r-notify';
    intervals = {}


    notify(opts) {
        if(!opts.position) opts.position = 'rt'

        const existingParent = document.querySelector(`.${this.className}__wrapper.${this.className}--${opts.position}`)

        const parent = existingParent || document.createElement('div')
        const notification = new NotificationConstructor(opts, this.className)

        if(!existingParent) {
            parent.className = `${this.className}__wrapper`
            parent.classList.add(`${this.className}--${opts.position}`)
        }

        if(opts.position === 'rt' || opts.position === 'lt') {
            parent.prepend(notification.instance)
        } else {
            parent.append(notification.instance)
        }

        document.body.appendChild(parent)

        notification.appear()

        if(this.intervals[opts.position]) return

        this.intervals[opts.position] = setInterval(()=> {
            if(Array.from(parent.children).length !== 0) return

            parent.remove()
            clearInterval(this.intervals[opts.position])
        },1000)
    }
}

export const useNotification = () => {
    return new Notification()
}