'use client'

import { useEffect, useState } from 'react'

import {
  Building2,
  ClipboardList,
  Truck,
  FileText,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

const cards = [
  {
    title: 'Obras Ativas',
    value: '12',
    icon: Building2,
    color: 'bg-blue-500',
  },
  {
    title: 'Medições',
    value: '28',
    icon: ClipboardList,
    color: 'bg-green-500',
  },
  {
    title: 'Equipamentos',
    value: '47',
    icon: Truck,
    color: 'bg-orange-500',
  },
  {
    title: 'Licitações',
    value: '9',
    icon: FileText,
    color: 'bg-purple-500',
  },
]

export default function DashboardPage() {
  const [obras, setObras] = useState<any[]>([])

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
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-bold text-slate-800">
            Dashboard Executivo
          </h2>

          <p className="text-slate-500 mt-2">
            Visão geral operacional da Plataforma Faixa
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
          Nova Obra
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => {
          const Icon = card.icon

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500 text-sm">
                    {card.title}
                  </p>

                  <h3 className="text-4xl font-bold text-slate-800 mt-2">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`${card.color} p-4 rounded-2xl text-white`}
                >
                  <Icon size={28} />
                </div>

              </div>
            </div>
          )
        })}

      </div>

      {/* OBRAS */}
      <div className="bg-white rounded-3xl p-8 mt-10 shadow-sm border border-slate-200">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800">
            Obras Recentes
          </h3>

          <button className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl">
            Ver todas
          </button>
        </div>

        <div className="space-y-4">

          {obras.map((obra) => (
            <ObraCard
              key={obra.id}
              obra={obra.nome}
              cidade={obra.cidade || 'Sem cidade'}
              status={obra.status}
              valor={`R$ ${obra.valor || 0}`}
            />
          ))}

        </div>

      </div>

    </div>
  )
}

function ObraCard({
  obra,
  cidade,
  status,
  valor,
}: any) {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

      <div className="flex justify-between items-center">

        <div>
          <h4 className="font-bold text-lg text-slate-800">
            {obra}
          </h4>

          <p className="text-slate-500">
            {cidade}
          </p>
        </div>

        <div className="text-right">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
            {status}
          </span>

          <p className="mt-3 font-bold text-slate-700">
            {valor}
          </p>

        </div>

      </div>

    </div>
  )
}