import './globals.css'

import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Plataforma Faixa',
  description: 'Sistema Operacional + Gestão',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <div className="flex">
          <Sidebar />

          <main className="flex-1 bg-slate-100 min-h-screen p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}