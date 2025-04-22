export function toggleClassById(id, toggleClass) {
    const el = document.getElementById(id)
    if (!el) return
    el.className = el.className === toggleClass ? id : toggleClass
}
