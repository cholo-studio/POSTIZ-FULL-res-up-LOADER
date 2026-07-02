import './globals.css'
import { branding, lang } from '@/lib/branding'

export const metadata = { title: branding.title }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <body style={{ ['--primary' as string]: branding.primary, ['--accent' as string]: branding.accent } as React.CSSProperties}>
        {children}
      </body>
    </html>
  )
}
