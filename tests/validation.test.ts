import { expect, test } from 'vitest'
import { isAllowedType, mediaKind, lowercaseExtension } from '@/lib/validation'

test('accepts a jpeg image', () => {
  expect(isAllowedType('image/jpeg')).toBe(true)
  expect(mediaKind('image/jpeg')).toBe('image')
})

test('accepts an mp4 video', () => {
  expect(isAllowedType('video/mp4')).toBe(true)
  expect(mediaKind('video/mp4')).toBe('video')
})

test('rejects an unsupported type', () => {
  expect(isAllowedType('application/pdf')).toBe(false)
  expect(mediaKind('application/pdf')).toBeNull()
})

test('lowercases an uppercase extension (Postiz rejects .JPG)', () => {
  expect(lowercaseExtension('DSC05031.JPG')).toBe('DSC05031.jpg')
})

test('lowercases only the extension, keeps the stem casing', () => {
  expect(lowercaseExtension('MyPhoto.JPEG')).toBe('MyPhoto.jpeg')
})

test('already-lowercase extension is unchanged', () => {
  expect(lowercaseExtension('clip.mp4')).toBe('clip.mp4')
})

test('handles multiple dots — only the last segment is the extension', () => {
  expect(lowercaseExtension('my.holiday.PNG')).toBe('my.holiday.png')
})

test('returns the name unchanged when there is no extension', () => {
  expect(lowercaseExtension('README')).toBe('README')
})

test('leaves dotfiles without an extension unchanged', () => {
  expect(lowercaseExtension('.gitignore')).toBe('.gitignore')
})
