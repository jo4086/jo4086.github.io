import { ArrowRight } from 'lucide-react'
import { type ReactNode } from 'react'
import { Link } from 'react-router'

type DiagramStep = {
  label: string
  detail: string
}

const apiFiles: DiagramStep[] = [
  { label: 'contract.ts', detail: '주소와 필수·선택 파라미터' },
  { label: 'params.ts', detail: '요청에 넣는 값의 타입' },
  { label: 'raw.ts', detail: '외부 API 응답의 원본 타입' },
  { label: 'index.ts', detail: '세 정의를 내보내는 입구' },
]

const databaseFlow: DiagramStep[] = [
  { label: '@maple/data-admin', detail: '시드·내보내기 명령 실행' },
  { label: '@maple/db', detail: 'Prisma 모델·조회·관리 API' },
  { label: 'PostgreSQL', detail: '역할별 스키마에 데이터 저장' },
]

const electronFlow: DiagramStep[] = [
  { label: 'Renderer', detail: '화면과 사용자 입력' },
  { label: 'Preload', detail: '허용된 API 노출' },
  { label: 'Main · IPC', detail: '요청 검증과 서비스 호출' },
  { label: '서비스', detail: '데이터·파일 작업 조정' },
]

function StepCard({ step, index }: { step: DiagramStep; index?: number }) {
  return (
    <li className="min-w-0 rounded-xl border border-[#cbdbe7] bg-white p-4">
      {index !== undefined && (
        <span className="mb-2 block text-[10px] font-extrabold tracking-[.12em] text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <strong className="block break-words text-[13px] font-extrabold text-accent-deep">
        {step.label}
      </strong>
      <span className="mt-1 block text-[12px] leading-5 text-muted">{step.detail}</span>
    </li>
  )
}

function StepFlow({ steps }: { steps: DiagramStep[] }) {
  return (
    <ol className={`grid gap-2 ${steps.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
      {steps.map((step, index) => (
        <StepCard key={step.label} step={step} index={index} />
      ))}
    </ol>
  )
}

function CaseCard({
  number,
  title,
  summary,
  children,
  note,
  to,
}: {
  number: string
  title: string
  summary: string
  children: ReactNode
  note: string
  to: string
}) {
  return (
    <article className="rounded-[20px] border border-line bg-[#f4f8fc] p-5 sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
        <span className="shrink-0 text-[11px] font-extrabold tracking-[.12em] text-accent">
          {number}
        </span>
        <div>
          <h4 className="text-lg font-extrabold tracking-[-.03em]">{title}</h4>
          <p className="mt-2 max-w-[700px] text-[13px] leading-6 text-muted">{summary}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
      <p className="mt-4 text-[12px] leading-6 text-muted">{note}</p>
      <Link
        className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold text-accent-deep hover:underline"
        to={to}
      >
        사례 자세히 읽기 <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  )
}

export function TechnicalCaseOverview() {
  return (
    <div className="mt-10 border-t border-line pt-10">
      <h3 className="text-[23px] font-extrabold tracking-[-.04em]">기술 사례 한눈에 보기</h3>
      <p className="mt-4 max-w-[720px] text-[15px] leading-[1.9] text-muted">
        준비한 코드 화면과 구조 이미지에서 핵심 책임만 골랐습니다. 아래 도식은 실제 구현의 경계를
        요약하며, 각 기능의 완료 여부는 현재 결과에서 구분합니다.
      </p>
      <div className="mt-7 grid gap-4">
        <CaseCard
          number="01 / API TYPES"
          title="외부 API 하나를 추가하는 파일 규칙"
          summary="ability처럼 API 종류마다 네 파일을 둡니다. 공식 명세를 확인한 뒤 사람이 추가 작업을 시작하는 구조입니다."
          note="Raw 응답을 화면용 데이터로 바꾸는 작업은 별도 백엔드 매퍼와 내부 계약에서 맡습니다. 자동 명세 동기화는 구현되어 있지 않습니다."
          to="/blog/maple-insight-api-types"
        >
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {apiFiles.map((file) => (
              <StepCard key={file.label} step={file} />
            ))}
          </ul>
        </CaseCard>
        <CaseCard
          number="02 / DATABASE"
          title="관리 명령과 저장 책임 분리"
          summary="관리 명령은 data-admin에서 시작하고, 데이터 접근은 db 패키지를 거쳐 PostgreSQL로 이어집니다."
          note="DB 그림의 트랜잭션 표현은 전체 관리 흐름의 완료를 뜻하지 않습니다. Electron 승인 반영은 계획 단계입니다."
          to="/blog/maple-insight-database"
        >
          <StepFlow steps={databaseFlow} />
          <p className="mt-3 text-[12px] leading-6 text-muted">
            스키마: app · ranking · game_data · equipment
          </p>
        </CaseCard>
        <CaseCard
          number="03 / ELECTRON"
          title="화면에서 파일·DB 작업까지의 경계"
          summary="화면은 파일이나 DB에 직접 접근하지 않고 Preload가 노출한 API로 Main에 요청합니다."
          note="서비스 뒤의 저장 경로는 작업에 따라 DB 또는 로컬 파일로 갈라집니다. 개별 화면의 완료 범위는 검증 기록에 맞춰 설명합니다."
          to="/blog/maple-insight-electron-data-studio"
        >
          <StepFlow steps={electronFlow} />
          <div className="mt-3 grid gap-2 text-center text-[12px] font-bold text-accent-deep sm:grid-cols-2">
            <span className="rounded-lg border border-[#cbdbe7] bg-white px-3 py-2">DB</span>
            <span className="rounded-lg border border-[#cbdbe7] bg-white px-3 py-2">로컬 파일</span>
          </div>
        </CaseCard>
      </div>
    </div>
  )
}
