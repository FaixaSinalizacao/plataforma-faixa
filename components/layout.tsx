import './globals.css'
import AuthGuard from '@/components/AuthGuard'

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
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  )
}