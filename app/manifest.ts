import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ServiStudy',
    short_name: 'ServiStudy',
    description: 'Conectando talento estudiantil con empleadores',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a', // green-600
    icons: [
      {
        src: '/logo.png', // Converted to PNG for PWA support
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png', // Converted to PNG for PWA support
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
