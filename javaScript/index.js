// 1. 스크롤 로직
const navbar = document.getElementById('navbar')
const main = document.getElementById('main')
let lastScrollY = window.scrollY

const sidebar = document.getElementById('leftSidebar')
const stopTop = 70 // 고정될 위치
let lastTop = 100

// 새로고침시 스크롤 업데이트 함수
function updateScrollState() {
    const isScrolled = window.scrollY > 70
    navbar.classList.toggle('scrolled', isScrolled)
    main.classList.toggle('scrolled', isScrolled)
}

function handleNavbarScroll(currentY) {
    const isScrollingDown = currentY > lastScrollY

    if (isScrollingDown && currentY > 0) {
        navbar.classList.add('scrolled')
        main.classList.add('scrolled')
    } else if (!isScrollingDown && currentY < 30) {
        main.classList.remove('scrolled')
        navbar.classList.remove('scrolled')
    }
}

function handleSidebarScroll(currentY) {
    const targetTop = currentY < stopTop ? Math.max(100 - currentY, stopTop) : stopTop

    if (targetTop !== lastTop) {
        sidebar.style.top = `${targetTop}px`
        lastTop = targetTop
    }
}

document.addEventListener('DOMContentLoaded', updateScrollState)
window.addEventListener('scroll', () => {
    const currentY = window.scrollY
    handleNavbarScroll(currentY)
    handleSidebarScroll(currentY)
    lastScrollY = currentY
})

// 2. 인풋 포커스시 네비바 스타일
const searchInput = document.querySelector('.search-input')

searchInput.addEventListener('focus', () => {
    navbar.classList.add('search-focused')
})

searchInput.addEventListener('blur', () => {
    navbar.classList.remove('search-focused')
})
