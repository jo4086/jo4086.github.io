import fs from 'fs'

const colorHSLMap = {
    red: [0, 100, 50],
    blue: [240, 100, 50],
    yellow: [60, 100, 50],
    orange: [39, 100, 50],
    springgreen: [150, 100, 50],
    pink: [350, 100, 88],
    greenyellow: [80, 61, 50],
    salmon: [6, 93, 71],
    lightblue: [195, 53, 79],
    gray: [0, 0, 50],
    tan: [34, 44, 69],
    cyan: [180, 100, 50],
    purple: [300, 100, 25],
    violet: [300, 76, 72],
}

function getFullSpectrumFromCenter(l) {
    const base = l >= 70 ? 100 - l : l <= 30 ? l : null

    if (l <= 30 || l >= 70) {
        return logic(base, l)
    } else {
        const delta = 100 - l
        const limit = 100 - Math.floor(delta / 3)
        const usable = limit - l
        const step = usable - (usable % 4)
        const stepSize = step / 4

        return Array.from({ length: 9 }, (_, i) => +(l + (i - 4) * stepSize).toFixed(1))
    }

    function logic(base, centerL) {
        const usable = base * (2 / 3)
        const evenUsable = Math.floor(usable)
        const step = evenUsable - (evenUsable % 4)
        const stepSize = step / 4

        return Array.from({ length: 9 }, (_, i) => +(centerL + (i - 4) * stepSize).toFixed(1))
    }
}

function generateColorTokens(map) {
    const lines = []

    lines.push(`  --color-black: hsl(0, 0%, 0%);`)
    lines.push(`  --color-white: hsl(0, 0%, 100%);`)

    for (const [name, [h, s, l]] of Object.entries(map)) {
        const ramp = getFullSpectrumFromCenter(l)

        // 컬러별 주석
        lines.push(`\n  /*------------------*/`)
        lines.push(`  /*  ${name}  */`)
        lines.push(`  /*------------------*/`)

        ramp.forEach((lightness, i) => {
            const level = (i + 1) * 100
            lines.push(`  --color-${name}-${level}: hsl(${h}, ${s}%, ${lightness}%);`)
        })
    }

    return `:root {\n${lines.join('\n')}\n}`
}

const cssContent = generateColorTokens(colorHSLMap)
fs.writeFileSync('./color.css', cssContent, 'utf-8')
console.log('color.css 생성 성공')
