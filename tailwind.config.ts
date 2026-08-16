import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Distribución 60 / 30 / 10 solicitada en el brief
        arena: {
          DEFAULT: '#fffdf9', // 60% — fondo principal
          50: '#fbf8ef',
          100: '#f7f1e4',
          200: '#e7d6a8'
        },
        selva: {
          DEFAULT: '#386641', // 30% — marca / texto / navegación
          50: '#e8f0e9',
          600: '#386641',
          700: '#2c5133',
          800: '#213d26'
        },
        tucan: {
          // 10% — acentos y llamadas a la acción.
          // 600 es el tono de marca (#bc4749) tal como lo pide el brief y se
          // usa en elementos decorativos/no textuales (ilustraciones, bordes).
          // Para TEXTO y fondos de botones se usan 700/800: el mismo tono,
          // oscurecido lo justo para cumplir el contraste AA de WCAG 2.1
          // (#bc4749 sobre #f2e8cf da ~4.16:1, insuficiente para texto normal;
          // #9c3739 da ~5.7:1). Ver README → Accesibilidad.
          DEFAULT: '#bc4749',
          600: '#bc4749',
          700: '#9c3739',
          800: '#7f2d2f'
        }
      },
      fontFamily: {
        // Solo fuentes del sistema: cero peticiones de red, coherente con
        // el requisito de sostenibilidad digital.
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        serif: [
          'ui-serif',
          'Georgia',
          'Iowan Old Style',
          'Times New Roman',
          'serif'
        ]
      },
      maxWidth: {
        prose: '68ch'
      }
    }
  },
  plugins: []
}
