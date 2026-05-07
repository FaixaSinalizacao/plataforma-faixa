'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-400 mb-10">
        Plataforma Faixa
      </h1>

      <nav className="space-y-3">
        <Link href="/" className="block p-3 rounded-xl hover:bg-slate-800">
          Dashboard
        </Link>

        <Link href="/obras" className="block p-3 rounded-xl hover:bg-slate-800">
          Obras
        </Link>

        <Link href="/medicoes" className="block p-3 rounded-xl hover:bg-slate-800">
          Medições
        </Link>

        <Link href="/equipamentos" className="block p-3 rounded-xl hover:bg-slate-800">
          Equipamentos
        </Link>

        <Link href="/licitacoes" className="block p-3 rounded-xl hover:bg-slate-800">
          Licitações
        </Link>

        <Link href="/rh" className="block p-3 rounded-xl hover:bg-slate-800">
          RH
        </Link>

        <Link href="/viagens" className="block p-3 rounded-xl hover:bg-slate-800">
          Viagens
        </Link>
      </nav>
    </aside>
  )
}