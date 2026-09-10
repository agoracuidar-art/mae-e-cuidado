import './globals.css';

export const metadata = {
  title: 'Mãe & Cuidado',
  description: 'Aplicativo PWA Mãe & Cuidado',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#FFFDF9] text-slate-800 antialiased selection:bg-pink-100">
        {children}
      </body>
    </html>
  )
}



