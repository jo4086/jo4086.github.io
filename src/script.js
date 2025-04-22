import linkMap from './maps/linkMap.js'

// 링크맵으로 클래스네임과 일치하는것에 href를 추가 후 data-link에 메타정보 기록, class에서 삭제
document.addEventListener('DOMContentLoaded', () => {
    Object.entries(linkMap).forEach(([cls, url]) => {
        const element = document.querySelectorAll(`a.${cls}`)
        element.forEach((el) => {
            if (!el.hasAttribute('href')) {
                el.setAttribute('href', url)
                el.dataset.link = cls
                el.classList.remove(cls)
            }
        })
    })
})
