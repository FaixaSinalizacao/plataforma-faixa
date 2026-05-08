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

  const [contrato, setContrato] = useState('')
  const [numeroObra, setNumeroObra] = useState('')
  const [nome, setNome] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [orgao, setOrgao] = useState('')
  const [tipo, setTipo] = useState('Sinalização')
  const [valor, setValor] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')

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
    await supabase.from('obras').insert([
      {
        contrato,
        numero_obra: numeroObra,
        nome,
        estado,
        cidade,
        orgao,
        tipo,
        valor,
        data_inicio: dataInicio,
        data_fim: dataFim,
        status: 'Em andamento',
      },
    ])

    setContrato('')
    setNumeroObra('')
    setNome('')
    setEstado('')
    setCidade('')
    setOrgao('')
    setTipo('Sinalização')
    setValor('')
    setDataInicio('')
    setDataFim('')

    carregarObras()
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
            Gestão operacional da Plataforma Faixa
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-10">

        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Cadastro de Obra
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          <input
            placeholder="Contrato"
            value={contrato}
            onChange={(e) => setContrato(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <input
            placeholder="Número da obra"
            value={numeroObra}
            onChange={(e) => setNumeroObra(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <input
            placeholder="Nome da obra"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <input
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <input
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <input
            placeholder="Órgão"
            value={orgao}
            onChange={(e) => setOrgao(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          >
            <option>Sinalização</option>
            <option>Pesagem</option>
          </select>

          <input
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="p-4 rounded-2xl border border-slate-300"
          />

        </div>

        <button
          onClick={criarObra}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold"
        >
          Salvar obra
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

        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Obras Recentes
        </h3>

        <div className="space-y-4">

          {obras.map((obra) => (
            <div
              key={obra.id}
              className="border border-slate-200 rounded-2xl p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h4 className="font-bold text-xl text-slate-800">
                    {obra.nome}
                  </h4>

                  <p className="text-slate-500">
                    {obra.cidade} - {obra.estado}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Contrato: {obra.contrato}
                  </p>

                  <p className="text-sm text-slate-500">
                    Nº Obra: {obra.numero_obra}
                  </p>

                  <p className="text-sm text-slate-500">
                    Órgão: {obra.orgao}
                  </p>

                  <p className="text-sm text-slate-500">
                    Tipo: {obra.tipo}
                  </p>

                </div>

                <div className="text-right">

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
                    {obra.status}
                  </span>

                  <p className="mt-4 font-bold text-slate-700 text-lg">
                    R$ {obra.valor}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    {obra.data_inicio}
                  </p>

                  <p className="text-sm text-slate-400">
                    {obra.data_fim}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}