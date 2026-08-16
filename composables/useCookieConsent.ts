/**
 * Gestiona el aviso de cookies "simulado" que pide el brief.
 * Importante: este sitio NO usa cookies de rastreo ni analítica externa.
 * Lo único que se guarda es la preferencia de "visto/aceptado" del propio
 * aviso, en localStorage del navegador (nunca se envía a un servidor de
 * terceros). Esto cumple con el requisito de "sin rastreadores externos".
 */
export const useCookieConsent = () => {
  // Estado compartido entre todos los componentes que usen el composable
  const consent = useState<'pending' | 'accepted' | 'rejected'>(
    'cookie-consent',
    () => 'pending'
  )

  const STORAGE_KEY = 'ecoturismo-cr:cookie-consent'

  const loadConsent = () => {
    if (import.meta.server) return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'accepted' || saved === 'rejected') {
      consent.value = saved
    }
  }

  const setConsent = (value: 'accepted' | 'rejected') => {
    consent.value = value
    if (import.meta.client) {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
  }

  return { consent, loadConsent, setConsent }
}
