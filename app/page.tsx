'use client'

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
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        
        {/* SIDEBAR */}
        <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">
          <h1 className="text-3xl font-bold text-blue-400">
            Plataforma Faixa
          </h1>

          <p className="text-slate-400 mt-2">
            Sistema Operacional + Gestão
          </p>

          <nav className="mt-10 space-y-3">

            <MenuItem
              icon={Building2}
              title="Obras"
            />

            <MenuItem
              icon={ClipboardList}
              title="Medições"
            />

            <MenuItem
              icon={Truck}
              title="Equipamentos"
            />

            <MenuItem
              icon={FileText}
              title="Licitações"
            />

            <MenuItem
              icon={Users}
              title="RH"
            />

            <MenuItem
              icon={Plane}
              title="Viagens"
            />

            <MenuItem
              icon={BarChart3}
              title="Dashboard"
            />

          </nav>
        </aside>

        {/* CONTEÚDO */}
        <main className="flex-1 p-10">

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

          {/* TABELA */}
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

              <ObraCard
                obra="Duplicação BR-101"
                cidade="Recife - PE"
                status="Em andamento"
                valor="R$ 2.400.000"
              />

              <ObraCard
                obra="Sinalização Urbana"
                cidade="Maceió - AL"
                status="Finalizada"
                valor="R$ 890.000"
              />

              <ObraCard
                obra="Recapeamento Rodoviário"
                cidade="Salvador - BA"
                status="Medição"
                valor="R$ 1.200.000"
              />

            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

function MenuItem({
  icon: Icon,
  title,
}: any) {
  return (
    <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-800 transition">
      <Icon size={22} />
      <span className="font-medium">
        {title}
      </span>
    </button>
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