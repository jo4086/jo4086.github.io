import { toggleClassById } from './fn/eventToggle.js'

const eventRegistry = {
    toggleEventTest: () => toggleClassById('이벤트테스트', '이벤트테스트-토글'),
    // add more here...
}

export default eventRegistry
