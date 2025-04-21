// function generateHSLRampPreserveIdentity(l) {
//     if (l >= 70) {
//         const base = 100 - l
//         // const limit = Math.floor(base / 3)
//         const limitCeil = Math.ceil(base / 3)
//         const limitFloor = Math.floor(base / 3)
//         const colorCeil = base - limitCeil
//         const colorFloor = base - limitFloor

//         // const a = color / 4

//         console.log(base)
//         console.log('limitCeil:', limitCeil)
//         console.log('limitFloor:', limitFloor)
//         console.log(colorCeil)
//         console.log(colorFloor)
//         // console.log(a)
//     }
// }

// generateHSLRampPreserveIdentity(80)

function generateHSLRampPreserveIdentity(l) {
    if (l >= 70) {
        const base = 100 - l
        const limitCeil = Math.ceil(base / 3)
        const limitFloor = Math.floor(base / 3)
        const colorCeil = base - limitCeil
        const colorFloor = base - limitFloor

        const evenColor = colorCeil % 2 === 0 ? colorCeil : colorFloor % 2 === 0 ? colorFloor : null

        const divideColor = evenColor / 4
        const selected = base - evenColor

        console.log('input l:', l)
        console.log('🎨 선택된 짝수 색상 기준값:', evenColor)
        console.log('🎨 선택된 짝수 색상 Ramp값:', divideColor)
        console.log('selected:', selected)
        console.log(selected + evenColor - base + 100)

        return divideColor
    }
}

generateHSLRampPreserveIdentity(75)

function getFullSpectrumFromCenter(l) {
    const base = l >= 70 ? 100 - l : l <= 30 ? l : null

    if (l <= 30 || l >= 70) {
        return logic(base, l)
    } else {
        // ✅ 중간 영역용 동적 상/하한선
        const delta = 100 - l // 밝기 여유
        const limit = 100 - Math.floor(delta / 3) // 최대 밝기 제한선 (ex: 87)
        const usable = limit - l // l ~ 제한선 거리
        const step = usable - (usable % 4) // 4로 나누어떨어지게 정리
        const stepSize = step / 4

        const spectrum = Array.from({ length: 9 }, (_, i) => {
            const offset = (i - 4) * stepSize // 기준 중심 l
            return +(l + offset).toFixed(1)
        })

        console.log(`[Dynamic Range for ${l}]`, spectrum)
        return spectrum
    }

    function logic(base, centerL) {
        const usable = base * (2 / 3)
        const evenUsable = Math.floor(usable)
        const step = evenUsable - (evenUsable % 4)
        const stepSize = step / 4

        const spectrum = Array.from({ length: 9 }, (_, i) => {
            const offset = (i - 4) * stepSize
            return +(centerL + offset).toFixed(1)
        })

        console.log(`[Bound Range for ${centerL}]`, spectrum)
        return spectrum
    }
}

getFullSpectrumFromCenter(88)
