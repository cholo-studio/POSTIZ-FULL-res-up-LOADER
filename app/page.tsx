'use client'
import { useState } from 'react'
import Uploader from '@/components/Uploader'
import HistoryGallery from '@/components/HistoryGallery'
import { branding, lang } from '@/lib/branding'
import { getStrings } from '@/lib/strings'

const t = getStrings(lang)

export default function Home() {
  const [reloadKey, setReloadKey] = useState(0)
  return (
    <main style={{ maxWidth: 800, margin: '5vh auto', padding: 24 }}>
      <h1 style={{ color: 'var(--primary)' }}>{branding.title}</h1>
      <p>{t.homeSubtitle}</p>
      <Uploader onDone={() => setReloadKey((k) => k + 1)} />
      <HistoryGallery reloadKey={reloadKey} />
    </main>
  )
}
