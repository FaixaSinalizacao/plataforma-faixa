'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Obra = {
  id: string
  nome: string
  cliente: string
  status: string
}

export default function Home() {
  const [obras, setObras] = useState<Obra[]>([])
  const [nome, setNome] = useState('')
  const [cliente, setCliente] = useState('')

  async function carregarObras() {
    const { data } = await supabase
      .from('obras')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setObras(data)
    }
  }

  async function criarObra() {
    if (!nome) return

    await supabase.from('obras').insert([
      {
        nome,
        cliente,
        status: 'Em andamento',
      },
    ])

    setNome('')
    setCliente('')

    carregarObras()
  }

  useEffect(() => {
    carregarObras()
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Plataforma Faixa
        </h1>

        <p className="text-slate-600 mb-8">
          Sistema Operacional + Gestão
        </p>

        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Nova Obra
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="border rounded-2xl p-3"
              placeholder="Nome da obra"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              className="border rounded-2xl p-3"
              placeholder="Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />

            <button
              onClick={criarObra}
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-3 font-semibold"
            >
              Salvar obra
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Obras cadastradas
          </h2>

          <div className="space-y-4">
            {obras.map((obra) => (
              <div
                key={obra.id}
                className="border rounded-2xl p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {obra.nome}
                  </h3>

                  <p className="text-slate-500">
                    {obra.cliente}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                  {obra.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}