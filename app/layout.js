export const metadata = {
  title: 'Mãe & Cuidado',
  description: 'Aplicativo Mãe & Cuidado',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  )
}


