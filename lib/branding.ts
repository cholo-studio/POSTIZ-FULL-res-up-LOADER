// Branding + language config, read from NEXT_PUBLIC_* env (inlined at build; safe in client + server).
export type Lang = 'de' | 'en'

export const branding = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || 'Postiz Full-Res Uploader',
  primary: process.env.NEXT_PUBLIC_BRAND_PRIMARY || '#2563eb',
  accent: process.env.NEXT_PUBLIC_BRAND_ACCENT || '#f59e0b',
}

export const lang: Lang = process.env.NEXT_PUBLIC_APP_LANG === 'en' ? 'en' : 'de'
