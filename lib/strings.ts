import { Lang } from '@/lib/branding'

const STRINGS = {
  de: {
    loginPrompt: 'Bitte Team-Passwort eingeben.',
    passwordPlaceholder: 'Passwort',
    signIn: 'Anmelden',
    wrongPassword: 'Falsches Passwort',
    homeSubtitle: 'Bilder & Videos in voller Auflösung in die Postiz-Mediathek laden.',
    dropzone: 'Bilder oder Videos hierher ziehen oder klicken zum Auswählen',
    typeNotAllowed: 'Dateityp nicht erlaubt',
    genericError: 'Fehler',
    recentlyUploaded: 'Zuletzt hochgeladen',
    copyPostizLink: 'Postiz-Link kopieren',
    videoReadError: 'Video konnte nicht gelesen werden',
  },
  en: {
    loginPrompt: 'Please enter the team password.',
    passwordPlaceholder: 'Password',
    signIn: 'Sign in',
    wrongPassword: 'Wrong password',
    homeSubtitle: 'Upload images & videos to your Postiz media library at full resolution.',
    dropzone: 'Drag images or videos here, or click to select',
    typeNotAllowed: 'File type not allowed',
    genericError: 'Error',
    recentlyUploaded: 'Recently uploaded',
    copyPostizLink: 'Copy Postiz link',
    videoReadError: 'Could not read the video',
  },
} as const

export function getStrings(l: Lang) {
  return STRINGS[l]
}
