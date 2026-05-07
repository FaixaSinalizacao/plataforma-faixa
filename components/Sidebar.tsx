'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Sidebar() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  useEffect(() => {
    async function carregarUsuario() {
      const { data } = await supabase.auth.getUser()

      if (data.user?.email) {
        setEmail(data.user.email)
      }
    }

    carregarUsuario()
  }, [])

  async function sair() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-72 bg-slate-900 text-white p-6 min-h-screen flex flex-col">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-400">
          Plataforma Faixa
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Sistema Operacional + Gestão
        </p>
      </div>

      <nav className="space-y-3 flex-1">
        <MenuItem href="/" title="Dashboard" />
        <MenuItem href="/obras" title="Obras" />
        <MenuItem href="/medicoes" title="Medições" />
        <MenuItem href="/equipamentos" title="Equipamentos" />
        <MenuItem href="/licitacoes" title="Licitações" />
        <MenuItem href="/rh" title="RH" />
        <MenuItem href="/viagens" title="Viagens" />
      </nav>

      <div className="border-t border-slate-700 pt-5">
        <p className="text-xs text-slate-400 mb-2">
          Usuário logado
        </p>

        <p className="text-sm text-white break-all mb-4">
          {email}
        </p>

        <button
          onClick={sair}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl p-3 font-semibold"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}

function MenuItem({
  href,
  title,
}: {
  href: string
  title: string
}) {
  return (
    <Link
      href={href}
      className="block p-3 rounded-xl hover:bg-slate-800 transition"
    >
      {title}
    </Link>
  )
}