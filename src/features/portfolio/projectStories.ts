export interface StoryNode {
  label: string
  detail: string
}

export interface StoryStep extends StoryNode {
  state?: '진행 중' | '계획'
}

export interface StoryFact {
  label: string
  detail: string
  state: '확인된 범위' | '진행 중' | '계획' | '미확인'
}

export interface DataStudioStory {
  rationale: string
  siteAdmin: string
  electron: string
  diagramAlt: string
  diagramSummary: string
  result: string
}

export interface ProjectStory {
  slug: string
  title: string
  kicker: string
  lead: string
  situation: string
  decision: string
  audience: string
  ownership: string
  aiWorkflow: string
  connection: string
  connectionSlug: 'maple-insight' | 'codex-workspace'
  connectionTitle: string
  architectureTitle: string
  architectureIntro: string
  architecture: StoryNode[]
  architectureNote: string
  sharedLayer?: StoryNode
  dataStudio?: DataStudioStory
  flowTitle: string
  flowIntro: string
  flow: StoryStep[]
  flowNote: string
  facts: StoryFact[]
  sourceTitle: string
  sourceUrl: string
  extraTitle: string
  extraUrl: string
}

export const projectStories: Record<string, ProjectStory> = {
  'maple-insight': {
    slug: 'maple-insight',
    title: 'Maple Insight',
    kicker: 'GAME DATA · DATA STUDIO',
    lead: '게임 정보를 보여주는 화면 뒤에서, 데이터의 출처와 변경 과정을 확인할 수 있게 만드는 프로젝트입니다.',
    situation:
      '메이플스토리 캐릭터 정보는 외부 API에서 오고, 게임의 원본 데이터는 버전마다 달라집니다. 두 종류의 데이터를 한 번에 다루면 어떤 값이 어디서 왔고 무엇이 바뀌었는지 알기 어려워집니다.',
    decision:
      '웹 관리자는 사이트 운영에 집중하고, 게임 원본 파일과 버전 차이는 별도 Electron 도구에서 다루도록 책임을 나눴습니다. 도구에서는 원본을 남긴 채 가져오기·검증·비교를 순서대로 수행합니다.',
    audience: '캐릭터를 찾는 사용자와 버전별 게임 데이터를 관리하는 사람',
    ownership:
      'AI를 적극 활용한 개인 프로젝트입니다. 패키지 경계와 백엔드·프런트엔드 구조를 직접 설계하고, 공통 타입을 어디에 둘지 판단했습니다.',
    aiWorkflow:
      '초기에는 기능마다 Codex와 대화하며 채팅 기록을 이정표로 삼았습니다. 직접 예시 코드를 써서 원하는 방향을 제시했고, 이후 README와 AGENTS 문서로 작업 규칙을 관리했습니다.',
    connection:
      '프로젝트가 커지자 frontend·back·electron처럼 역할이 다른 앱에서도 일관된 구조와 지침이 필요해졌습니다. 루트에서 각 역할의 설명을 쉽게 찾아가고, 반복 규칙은 Skill과 Hook으로 관리하려는 경험이 Codex Workspace로 이어졌습니다.',
    connectionSlug: 'codex-workspace',
    connectionTitle: '이 경험에서 이어진 Codex Workspace',
    architectureTitle: '두 가지 일을 다른 경로로 나눴습니다',
    architectureIntro:
      '아래 지도는 캐릭터를 조회하는 경로입니다. 데이터 관리자는 별도의 Electron 도구에서 원본 파일과 작업본을 살펴봅니다.',
    architecture: [
      { label: '사용자 화면', detail: '닉네임을 입력하고 결과를 봅니다' },
      { label: '조회 서버', detail: '요청을 정리하고 결과 형태를 맞춥니다' },
      { label: '게임 정보 제공처', detail: 'Nexon API에서 캐릭터 원본 정보를 받습니다' },
    ],
    architectureNote:
      '관리 화면(Electron)은 조회 화면과 다른 경로입니다. 화면이 파일이나 데이터베이스를 직접 다루지 않고, 제한된 연결 통로를 통해 관리 기능을 요청합니다.',
    sharedLayer: {
      label: '앱들이 함께 쓰는 데이터 약속',
      detail:
        '프런트엔드·백엔드·데이터베이스·Electron이 같은 데이터 형식을 이해하도록 연결합니다. 이 약속은 공통 타입·계약 패키지에 두고, 외부 API 형식과 화면에만 필요한 형식은 따로 나눴습니다.',
    },
    dataStudio: {
      rationale:
        '웹 관리자 화면에 원본 파일 변환과 버전 비교까지 넣으면 사이트 운영과 게임 데이터 관리의 책임이 한곳에 섞입니다. 그래서 이용 추이·사이트 운영은 웹 관리자의 역할로 두고, 로컬 파일과 게임 데이터 처리는 Electron Data Studio로 분리했습니다.',
      siteAdmin:
        '이용 추이와 사이트 운영을 위한 영역으로 구상했습니다. 현재 프런트엔드의 admin import 화면은 제출 동작이 연결되지 않은 초안입니다.',
      electron:
        '준비한 CSV를 버전별 JSON으로 변환하고, 내부 데이터 규칙에 대조하며 이전 버전의 차이를 살펴보는 로컬 도구입니다. 필요한 게임 데이터·DB 패키지를 사용하지만 모든 데이터의 승인 반영은 아직 끝나지 않았습니다.',
      diagramAlt:
        '웹 관리자는 사이트 운영을 맡도록 구상했고 Electron은 게임 데이터 관리용이다. WzComparerR2로 준비한 CSV는 Electron에서 JSON으로 변환·검증·비교한 뒤 일부 편집 작업본으로 이어진다. dry-run과 DB 승인 반영은 계획이다. 별도 C# 추출기는 WZ에서 스킬 아이콘 PNG를 만들고 Electron 목록에 연결한다.',
      diagramSummary:
        '위쪽은 웹 운영과 로컬 데이터 관리의 책임 구분입니다. 아래 두 줄은 CSV 데이터와 스킬 아이콘의 서로 다른 입력 경로입니다. CSV 경로의 편집 작업본은 진행 중이고, dry-run·승인 뒤 DB 반영은 계획 단계입니다.',
      result:
        'C# 추출기는 AI를 활용해 만들었습니다. 2026-11-14 검증에서 전직 112의 스킬 22개에 대해 아이콘 PNG 66개를 생성했고, Electron 스킬 목록에서도 추출한 이미지를 표시했습니다. 모든 새 직업을 자동 순회하거나 이미지 바이트를 DB에 저장하는 기능은 아직 없습니다.',
    },
    flowTitle: '원본에서 검증된 작업본까지',
    flowIntro:
      '데이터를 곧바로 덮어쓰지 않고 단계마다 확인합니다. 실선에 해당하는 앞의 세 단계는 완료 기록이 있으며, 뒤의 두 단계는 상태가 다릅니다.',
    flow: [
      { label: '원본 가져오기', detail: '버전별 파일을 보존하고 읽어 들입니다' },
      { label: '검증', detail: '형식과 내용의 문제를 작업본에서 확인합니다' },
      { label: '버전 비교', detail: '이전 버전과 달라진 부분을 살펴봅니다' },
      { label: '편집 작업본', detail: '변경을 준비하고 다시 확인합니다', state: '진행 중' },
      {
        label: '승인 후 반영',
        detail: '검토한 변경만 데이터베이스에 적용할 예정입니다',
        state: '계획',
      },
    ],
    flowNote:
      '“가져오기·검증·비교 완료”는 Electron 앱 문서의 단계별 검증 기록을 뜻합니다. 전체 조회 서비스나 자동 반영이 완성됐다는 의미는 아닙니다.',
    facts: [
      {
        label: '가져오기·검증·버전 비교',
        detail: 'Electron Phase 00~03의 완료 기록',
        state: '확인된 범위',
      },
      { label: '편집 작업본', detail: '일부 직업 정보 편집과 재열기 구현', state: '진행 중' },
      {
        label: '스킬 아이콘 추출·표시',
        detail: 'C# 추출기 PNG 생성과 Electron 목록의 로컬 이미지 연결 검증',
        state: '확인된 범위',
      },
      { label: '승인 반영·생성 자동화', detail: '후속 Phase로 남아 있음', state: '계획' },
    ],
    sourceTitle: '프로젝트 분석 문서',
    sourceUrl: 'https://github.com/jo4086/maple-insight/blob/main/docs/portfolio/README.md',
    extraTitle: '구현 상태와 한계',
    extraUrl: 'https://github.com/jo4086/maple-insight/blob/main/docs/portfolio/status-and-gaps.md',
  },
  'codex-workspace': {
    slug: 'codex-workspace',
    title: 'Codex Workspace',
    kicker: 'DEVELOPER WORKFLOW · AUTOMATION',
    lead: '개발 작업에 필요한 지침을 쉽게 찾고, 명확한 형식 규칙은 실행 시점에 검사하는 작업 공간입니다.',
    situation:
      '개발 지침이 한 파일에 계속 쌓이면 작업과 관계없는 내용을 읽게 되고, 필요한 규칙을 놓치기 쉽습니다. 커밋 제목처럼 형식이 분명한 규칙은 글로만 적어 두면 실수를 막기 어렵습니다.',
    decision:
      '작업 종류에 따라 관련 Skill을 찾는 지도를 만들고, 커밋 제목 형식은 Git Hook으로 검사하도록 분리했습니다.',
    audience: '반복적인 개발 작업을 수행하는 개발자와 코딩 에이전트',
    ownership:
      'AI를 적극 활용해 만든 개인 프로젝트입니다. 필요한 개발 지침을 선택하고 형식 규칙을 검사하는 작업 공간의 방향과 구성을 정했습니다.',
    aiWorkflow:
      'Maple Insight를 오래 개발하며 README와 AGENTS 문서만으로는 역할별 지침을 일관되게 찾기 어렵다고 느꼈습니다. 작업별 Skill 지도와 Git Hook을 AI와 함께 발전시켰습니다.',
    connection:
      'Codex Workspace는 Maple Insight에서 겪은 협업·구조 관리 문제를 일반적인 개발 작업에도 적용하려고 만든 개인 작업 공간입니다. 프로젝트마다 앱의 역할을 분명히 하고, 루트에서 필요한 지침으로 이동하기 쉽게 만드는 데 집중했습니다.',
    connectionSlug: 'maple-insight',
    connectionTitle: '출발점이 된 Maple Insight',
    architectureTitle: '지침 선택과 형식 검사를 분리했습니다',
    architectureIntro:
      'Skill은 작업에 필요한 설명을 고르는 문서입니다. Hook은 정해진 시점에 실행되는 검사 도구입니다. 두 경로는 역할이 다릅니다.',
    architecture: [
      { label: '작업 요청', detail: '어떤 일을 해야 하는지 파악합니다' },
      { label: 'Skill 지도', detail: '작업에 맞는 지침을 고릅니다' },
      { label: '관련 지침', detail: '필요한 설명만 읽고 적용합니다' },
    ],
    architectureNote:
      '커밋을 만들 때는 별도 경로가 작동합니다. 연결 도구가 Git의 메시지 검사를 호출하고, Hook이 제목 형식을 허용·거절·경고로 판단합니다.',
    flowTitle: '커밋 제목은 실제 파일을 보고 검사합니다',
    flowIntro:
      '사람이나 에이전트가 커밋 명령을 실행하면 Git이 최종 메시지 파일을 검사합니다. 아래 흐름은 지원되는 직접 명령 형태의 소스 구현입니다.',
    flow: [
      { label: '커밋 명령', detail: '변경 내용을 기록하려고 요청합니다' },
      { label: '연결 도구', detail: '지원되는 명령에 검사 경로를 붙입니다' },
      { label: 'Git Hook', detail: '커밋 메시지 첫 줄을 읽습니다' },
      { label: '검사 결과', detail: '형식에 따라 허용·거절·경고합니다' },
    ],
    flowNote:
      'Skill 선택은 에이전트가 지침을 따르는 과정이므로 자동 정확도가 측정된 것은 아닙니다. Hook 테스트는 소스 동작을 확인하며 실제 설치 상태를 증명하지 않습니다.',
    facts: [
      {
        label: 'Skill 책임 지도',
        detail: '작업별 지침 선택 절차와 문서 구조',
        state: '확인된 범위',
      },
      {
        label: '커밋 Hook 소스 테스트',
        detail: '등록·연결·메시지 형식 검사',
        state: '확인된 범위',
      },
      { label: '실제 사용자 환경 설치', detail: '이 분석에서 확인하지 않음', state: '미확인' },
    ],
    sourceTitle: '프로젝트 분석 문서',
    sourceUrl: 'https://github.com/jo4086/codex-workspace/blob/main/docs/portfolio/README.md',
    extraTitle: '구현 사례와 검증 범위',
    extraUrl:
      'https://github.com/jo4086/codex-workspace/blob/main/docs/portfolio/engineering-case-studies.md',
  },
}
