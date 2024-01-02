/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_LOCAL_STORAGE_KEY: string;
  readonly VITE_APP_WILAYAH_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
