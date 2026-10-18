/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_CC_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
