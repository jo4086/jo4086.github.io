export default function registerMeta() {
    document.title = 'UINAMIC | Home'

    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = '모듈 기반 UI 시스템'
    document.head.appendChild(meta)
}
