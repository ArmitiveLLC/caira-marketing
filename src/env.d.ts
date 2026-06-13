/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_PILOT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
