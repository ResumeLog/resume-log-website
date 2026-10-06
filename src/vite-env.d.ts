/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DASHBOARD_URL?: string
  readonly VITE_PADDLE_CLIENT_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
