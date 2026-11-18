```
Electron Renderer (React)
    │
    │ window.api.listJobData(version)
    ▼
Preload (contextBridge)
    │
    │ ipcRenderer.invoke('job-data:list', version)
    ▼
Main Process
    │
    ├─ registerIpcHandlers()
    │    └─ registerJobDataHandlers()
    │
    └─ IPC Handler
         ├─ 요청 파라미터 검증
         ├─ Runtime에서 버전 환경 확인
         └─ listJobData()
              │
              ├─ @maple/db
              │    ├─ findGameJobsByVersion()
              │    └─ findGlobalWeaponTypes()
              │         │
              │         ▼
              │      PostgreSQL
              │
              └─ Edit Workbench
                   └─ 로컬 편집 기록
```
