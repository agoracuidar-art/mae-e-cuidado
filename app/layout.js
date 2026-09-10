import './globals.css';

export const metadata = {
  title: 'Mãe & Cuidado',
  description: 'Rotina e leveza para o seu dia a dia',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="theme-color" content="#F0657D" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="bg-[#FDFBFB] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}




