'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

import {
  Building2,
  ClipboardList,
  Truck,
  FileText,
  Users,
  Plane,
  BarChart3,
  DollarSign,
} from 'lucide-react'

type Obra = {
  id: string
  nome: string
  cliente: string
  status: string
}

export default function Home() {
  const [obras, setObras] = useState<Obra[]>([])

  async function carregarObras() {
    const { data } = await supabase
      .from('obras')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setObras(data)
    }
  }

  useEffect(() => {
    carregarObras()
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-10">
        <h2 className="text-4xl font-bold text-slate-800">
          Dashboard Executivo
        </h2>

        <p className="text-slate-500 mt-2 mb-10">
          Visão geral operacional da Plataforma Faixa
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <CardKPI title="Obras Ativas" value={obras.length} icon={<Building2 />} />
          <CardKPI title="Medições" value="12" icon={<ClipboardList />} />
          <CardKPI title="Equipamentos" value="38" icon={<Truck />} />
          <CardKPI title="Faturamento" value="R$ 2.4M" icon={<DollarSign />} />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Obras Recentes
          </h3>

          <div className="space-y-4">
            {obras.map((obra) => (
              <div
                key={obra.id}
                className="border border-slate-200 rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-lg text-slate-800">
                    {obra.nome}
                  </h4>

                  <p className="text-slate-500">
                    {obra.cliente}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {obra.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-400">
          Plataforma Faixa
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Sistema Operacional + Gestão
        </p>
      </div>

      <nav className="space-y-3">
        <MenuItem icon={<BarChart3 size={20} />} title="Dashboard" href="/" />
        <MenuItem icon={<Building2 size={20} />} title="Obras" href="/obras" />
        <MenuItem icon={<ClipboardList size={20} />} title="Medições" href="/medicoes" />
        <MenuItem icon={<Truck size={20} />} title="Equipamentos" href="/equipamentos" />
        <MenuItem icon={<FileText size={20} />} title="Licitações" href="/licitacoes" />
        <MenuItem icon={<Users size={20} />} title="RH" href="/rh" />
        <MenuItem icon={<Plane size={20} />} title="Viagens" href="/viagens" />
      </nav>
    </aside>
  )
}

function MenuItem({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode
  title: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-800 transition"
    >
      {icon}
      <span className="font-medium">{title}</span>
    </Link>
  )
}

function CardKPI({
  title,
  value,
  icon,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-500">{title}</div>
        <div className="text-blue-600">{icon}</div>
      </div>

      <div className="text-4xl font-bold text-slate-800">
        {value}
      </div>
    </div>
  )
}