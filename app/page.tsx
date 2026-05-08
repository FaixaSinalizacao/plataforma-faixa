'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Building2,
  ClipboardList,
  Truck,
  FileText,
  ChevronDown,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const estadosBrasil = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO'
]

type Obra = {
  contrato: string
  numero: string
  nome: string
  estados: string[]
  cidade: string
  orgao: string
  tipo: string
  valor: string
  inicio: string
  fim: string
}

export default function DashboardPage() {
  const [dropdownAberto, setDropdownAberto] = useState(false)
  const [obras, setObras] = useState<any[]>([])
  const [salvando, setSalvando] = useState(false)

  const [obra, setObra] = useState<Obra>({
    contrato: '',
    numero: '',
    nome: '',
    estados: [],
    cidade: '',
    orgao: '',
    tipo: 'Sinalização',
    valor: '',
    inicio: '',
    fim: '',
  })

  const dropdownRef = useRef<HTMLDivElement>(null)

  async function carregarObras() {
    const { data } = await supabase
      .from('obras')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setObras(data)
  }

  useEffect(() => {
    carregarObras()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownAberto(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function toggleEstado(estado: string) {
    setObra((prev) => ({
      ...prev,
      estados: prev.estados.includes(estado)
        ? prev.estados.filter((e) => e !== estado)
        : [...prev.estados, estado],
    }))
  }

  function formatarMoeda(valor: string) {
    const numero = valor.replace(/\D/g, '')

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(numero) / 100)
  }

  function moedaParaNumero(valor: string) {
    return Number(
      valor
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim()
    )
  }

  async function salvarObra() {
    if (!obra.nome) {
      alert('Preencha o nome da obra.')
      return
    }

    setSalvando(true)

    const { error } = await supabase.from('obras').insert([
      {
        contrato: obra.contrato,
        numero_obra: obra.numero,
        nome: obra.nome,
        estado: obra.estados.join(', '),
        cidade: obra.cidade,
        orgao: obra.orgao,
        tipo: obra.tipo,
        valor: moedaParaNumero(obra.valor),
        data_inicio: obra.inicio || null,
        data_fim: obra.fim || null,
        status: 'Em andamento',
      },
    ])

    setSalvando(false)

    if (error) {
      alert('Erro ao salvar obra: ' + error.message)
      return
    }

    setObra({
      contrato: '',
      numero: '',
      nome: '',
      estados: [],
      cidade: '',
      orgao: '',
      tipo: 'Sinalização',
      valor: '',
      inicio: '',
      fim: '',
    })

    await carregarObras()
    alert('Obra salva com sucesso!')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-slate-800">
          Dashboard Executivo
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Gestão operacional da Plataforma Faixa
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">
          Cadastro de Obra
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <input
            placeholder="Contrato"
            value={obra.contrato}
            onChange={(e) => setObra({ ...obra, contrato: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />

          <input
            placeholder="Número da obra"
            value={obra.numero}
            onChange={(e) => setObra({ ...obra, numero: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />

          <input
            placeholder="Nome da obra"
            value={obra.nome}
            onChange={(e) => setObra({ ...obra, nome: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownAberto(!dropdownAberto)}
              className="w-full p-5 rounded-2xl border border-slate-300 bg-white text-left flex items-center justify-between text-lg"
            >
              <span>
                {obra.estados.length > 0
                  ? obra.estados.join(', ')
                  : 'Selecionar estados'}
              </span>

              <ChevronDown size={22} />
            </button>

            {dropdownAberto && (
              <div className="absolute z-50 mt-2 w-full bg-white border border-slate-300 rounded-2xl shadow-xl p-4 max-h-72 overflow-y-auto">
                <div className="grid grid-cols-4 gap-3">
                  {estadosBrasil.map((estado) => (
                    <label
                      key={estado}
                      className="flex items-center gap-2 text-lg"
                    >
                      <input
                        type="checkbox"
                        checked={obra.estados.includes(estado)}
                        onChange={() => toggleEstado(estado)}
                      />

                      {estado}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <input
            placeholder="Cidade"
            value={obra.cidade}
            onChange={(e) => setObra({ ...obra, cidade: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />

          <input
            placeholder="Órgão"
            value={obra.orgao}
            onChange={(e) => setObra({ ...obra, orgao: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />

          <select
            value={obra.tipo}
            onChange={(e) => setObra({ ...obra, tipo: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          >
            <option>Sinalização</option>
            <option>Pesagem</option>
          </select>

          <input
            placeholder="R$ 0,00"
            value={obra.valor}
            onChange={(e) =>
              setObra({
                ...obra,
                valor: formatarMoeda(e.target.value),
              })
            }
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />

          <input
            type="date"
            value={obra.inicio}
            onChange={(e) => setObra({ ...obra, inicio: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />

          <input
            type="date"
            value={obra.fim}
            onChange={(e) => setObra({ ...obra, fim: e.target.value })}
            className="p-5 rounded-2xl border border-slate-300 text-lg"
          />
        </div>

        <button
          onClick={salvarObra}
          disabled={salvando}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-semibold transition disabled:opacity-60"
        >
          {salvando ? 'Salvando...' : 'Salvar obra'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Obras Ativas" value={obras.length.toString()} icon={<Building2 size={30} />} color="bg-blue-500" />
        <Card title="Medições" value="28" icon={<ClipboardList size={30} />} color="bg-green-500" />
        <Card title="Equipamentos" value="47" icon={<Truck size={30} />} color="bg-orange-500" />
        <Card title="Licitações" value="9" icon={<FileText size={30} />} color="bg-purple-500" />
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Obras Recentes
        </h2>

        <div className="space-y-4">
          {obras.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 rounded-2xl p-5 flex justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {item.nome}
                </h3>

                <p className="text-slate-500">
                  {item.cidade} - {item.estado}
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Contrato: {item.contrato}
                </p>

                <p className="text-sm text-slate-500">
                  Nº Obra: {item.numero_obra}
                </p>

                <p className="text-sm text-slate-500">
                  Órgão: {item.orgao}
                </p>
              </div>

              <div className="text-right">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
                  {item.status}
                </span>

                <p className="mt-4 font-bold text-slate-700">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(item.valor || 0))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-lg">{title}</p>

        <h3 className="text-5xl font-bold text-slate-800 mt-2">
          {value}
        </h3>
      </div>

      <div className={`${color} text-white p-5 rounded-2xl shadow-lg`}>
        {icon}
      </div>
    </div>
  )
}