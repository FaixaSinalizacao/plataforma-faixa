'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  async function entrar() {
    setErro('')
    setCarregando(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    setCarregando(false)

    if (error) {
      setErro('E-mail ou senha inválidos.')
      return
    }

    router.push('/')
  }

  async function cadastrar() {
    setErro('')
    setCarregando(true)

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    })

    setCarregando(false)

    if (error) {
      setErro(error.message)
      return
    }

    alert('Usuário criado. Agora faça login.')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700">
          Plataforma Faixa
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Acesse o sistema operacional
        </p>

        <div className="space-y-4">
          <input
            className="w-full border rounded-2xl p-3"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border rounded-2xl p-3"
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && (
            <p className="text-red-600 text-sm">
              {erro}
            </p>
          )}

          <button
            onClick={entrar}
            disabled={carregando}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-3 font-semibold"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <button
            onClick={cadastrar}
            disabled={carregando}
            className="w-full border border-slate-300 rounded-2xl p-3 font-semibold text-slate-700"
          >
            Criar usuário
          </button>
        </div>
      </div>
    </div>
  )
}