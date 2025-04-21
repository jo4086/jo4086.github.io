import fs from 'fs'
import { generateColorTokens } from '@uinamic/colors'

// 사용자 정의 색상맵
const myColorMap = {
    mint: [160, 100, 50],
    coral: [16, 100, 60],
}

// CSS 변수 문자열 생성
const css = generateColorTokens(myColorMap)

// 파일로 저장
fs.writeFileSync('custom.css', css, 'utf-8')
