import { expect, test, vi } from 'vitest'
import { finalizeUpload, FinalizeInput } from '@/lib/finalize'
import { KvLike } from '@/lib/history'

function deps(overrides: Partial<Parameters<typeof finalizeUpload>[1]> = {}) {
  const pushed: string[] = []
  const kv: KvLike = {
    async lpush(_k, v) { pushed.push(v); return 1 },
    async ltrim() { return 'OK' },
    async lrange() { return pushed },
  }
  const deleted: string[] = []
  return {
    pushed, deleted,
    d: {
      apiKey: 'KEY', kv,
      deleteBlob: async (url: string) => { deleted.push(url) },
      uploadFromUrl: vi.fn(async () => ({ id: 'p1', path: 'https://cdn/x.jpg', name: 'x.jpg' })),
      now: () => '2026-07-02T10:00:00.000Z',
      newId: () => 'id-1',
      ...overrides,
    },
  }
}

const input: FinalizeInput = {
  originalBlobUrl: 'https://blob/orig.jpg', thumbnailBlobUrl: 'https://blob/thumb.jpg',
  filename: 'ceviche.jpg', type: 'image', sizeBytes: 999,
}

test('ingests to Postiz, stores history, deletes only the original blob', async () => {
  const { d, deleted } = deps()
  const entry = await finalizeUpload(input, d)
  expect(d.uploadFromUrl).toHaveBeenCalledWith(
    expect.objectContaining({ apiKey: 'KEY', url: 'https://blob/orig.jpg' }),
  )
  expect(entry).toEqual({
    id: 'id-1', filename: 'ceviche.jpg', type: 'image', sizeBytes: 999,
    thumbnailUrl: 'https://blob/thumb.jpg', postizPath: 'https://cdn/x.jpg',
    postizId: 'p1', uploadedAt: '2026-07-02T10:00:00.000Z',
  })
  expect(deleted).toEqual(['https://blob/orig.jpg'])
})

test('does not delete the original blob if Postiz ingest fails', async () => {
  const { d, deleted } = deps({ uploadFromUrl: vi.fn(async () => { throw new Error('Postiz-Upload fehlgeschlagen (500):') }) })
  await expect(finalizeUpload(input, d)).rejects.toThrow(/Postiz-Upload fehlgeschlagen/)
  expect(deleted).toEqual([])
})
