/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_DASHBOARD_URL?: string
  readonly VITE_PADDLE_CLIENT_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** YYYY-MM-DD the site was built (vite.config.ts). */
declare const __BUILD_DATE__: string
