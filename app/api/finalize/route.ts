import { kv } from '@vercel/kv'
import { del } from '@vercel/blob'
import { requireSession } from '@/lib/auth-guard'
import { finalizeUpload, FinalizeInput } from '@/lib/finalize'
import { uploadFromUrl } from '@/lib/postiz'

export async function POST(request: Request): Promise<Response> {
  if (!(await requireSession(request))) {
    return Response.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  const apiKey = process.env.POSTIZ_API_KEY
  if (!apiKey) return Response.json({ error: 'Server nicht konfiguriert' }, { status: 500 })

  const body = (await request.json()) as Partial<FinalizeInput>
  if (!body.originalBlobUrl || !body.thumbnailBlobUrl || !body.filename || !body.type || typeof body.sizeBytes !== 'number') {
    return Response.json({ error: 'Unvollständige Anfrage' }, { status: 400 })
  }
  try {
    const entry = await finalizeUpload(body as FinalizeInput, {
      apiKey,
      apiBase: process.env.POSTIZ_API_URL,
      kv,
      deleteBlob: async (url) => { await del(url) },
      uploadFromUrl,
      now: () => new Date().toISOString(),
      newId: () => crypto.randomUUID(),
    })
    return Response.json({ entry })
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 502 })
  }
}
