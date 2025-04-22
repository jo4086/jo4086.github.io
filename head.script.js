import eventRegistry from './src/head.event.js'
import registerMeta from './src/head.meta.js'

registerMeta()

Object.entries(eventRegistry).forEach(([key, fn]) => {
    window[key] = fn
})
