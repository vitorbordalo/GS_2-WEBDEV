export default function Navbar({ isDark, setIsDark, total, filtros }) {
  return (
    <header className="relative border-b border-white/10 dark:border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-600"></div>
      <div className="relative">
        <div className="container py-6 flex items-center justify-between text-white">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Futuro do Trabalho</h1>
            <p className="text-white/80">Rede Profissional • {total} perfis</p>
          </div>
          <button
            onClick={()=>setIsDark(!isDark)}
            className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 text-sm border border-white/20"
          >
            {isDark ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div className="container pb-6 -mt-2">
          <div className="rounded-2xl bg-white/10 backdrop-blur text-white p-4 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input
                value={filtros.search} onChange={e=>filtros.setSearch(e.target.value)}
                placeholder="Buscar por nome, cargo, resumo..."
                className="rounded-xl border border-white/20 bg-white/10 placeholder-white/60 px-4 py-2"
              />
              <select value={filtros.area} onChange={e=>filtros.setArea(e.target.value)} className="rounded-xl border border-white/20 bg-white/10 px-4 py-2">
                {['Todas', ...filtros.areas].map(a=> <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={filtros.cidade} onChange={e=>filtros.setCidade(e.target.value)} className="rounded-xl border border-white/20 bg-white/10 px-4 py-2">
                {['Todas', ...filtros.cidades].map(a=> <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={filtros.tecnologia} onChange={e=>filtros.setTecnologia(e.target.value)} className="rounded-xl border border-white/20 bg-white/10 px-4 py-2">
                {['Todas', ...filtros.tecnologias].map(a=> <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={filtros.senioridade} onChange={e=>filtros.setSenioridade(e.target.value)} className="rounded-xl border border-white/20 bg-white/10 px-4 py-2">
                {['Todas', ...filtros.senioridades].map(a=> <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
