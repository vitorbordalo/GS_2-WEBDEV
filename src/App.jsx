import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SectionHeading from './components/SectionHeading.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import ProfileModal from './components/ProfileModal.jsx'
import QuickNav from './components/QuickNav.jsx'
import useDarkMode from './hooks/useDarkMode.js'
import { matchFilters, matchSearch } from './utils/filters.js'

const ORDER = ['Estagiário', 'Trainee', 'Júnior', 'Pleno', 'Sênior', 'Analista']

export default function App(){
  const [isDark, setIsDark] = useDarkMode()
  const [profiles, setProfiles] = useState([])
  const [selected, setSelected] = useState(null)

  const [search, setSearch] = useState('')
  const [area, setArea] = useState('Todas')
  const [cidade, setCidade] = useState('Todas')
  const [tecnologia, setTecnologia] = useState('Todas')
  const [senioridade, setSenioridade] = useState('Todas')
  const [recs, setRecs] = useState(()=> JSON.parse(localStorage.getItem('recomendacoes') || '{}'))

  useEffect(() => {
    fetch('/data/profiles.json')
      .then(r => r.json())
      .then(list => {
        const fixed = list.map(p => {
          const cargoLower = (p.cargo || '').toLowerCase()
          let senior = p.senioridade || 'Júnior'
          if (cargoLower.includes('analista')) senior = 'Analista'
          else if (senior === 'Analista') senior = 'Júnior'
          return { ...p, senioridade: senior }
        })
        setProfiles(fixed)
      })
  }, [])

  const areas = useMemo(()=> Array.from(new Set(profiles.map(p=>p.area))).sort(), [profiles])
  const cidades = useMemo(()=> Array.from(new Set(profiles.map(p=>p.localizacao.split('/')[0]))).sort(), [profiles])
  const tecnologias = useMemo(()=> Array.from(new Set(profiles.flatMap(p=>p.habilidadesTecnicas || []))).sort(), [profiles])
  const senioridades = useMemo(()=> Array.from(new Set(profiles.map(p=>p.senioridade))).sort((a,b)=> ORDER.indexOf(a)-ORDER.indexOf(b)), [profiles])

  const filtered = useMemo(()=> profiles
    .filter(p => matchSearch(p, search))
    .filter(p => matchFilters(p, { area, cidade, tecnologia, senioridade }))
  , [profiles, search, area, cidade, tecnologia, senioridade])

  const groups = useMemo(()=> {
    const map = {}; ORDER.forEach(k => map[k] = [])
    for (const p of filtered) if (map[p.senioridade]) map[p.senioridade].push(p)
    return map
  }, [filtered])

  function onRecommend(p){
    const current = { ...recs }
    current[p.id] = (current[p.id] || 0) + 1
    setRecs(current)
    localStorage.setItem('recomendacoes', JSON.stringify(current))
  }

  const sections = ORDER.filter(k => (groups[k]?.length || 0) > 0).map(k => ({ id: k.toLowerCase(), title: k }))

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar
        isDark={isDark} setIsDark={setIsDark}
        total={profiles.length}
        filtros={{
          search, setSearch,
          area, setArea,
          cidade, setCidade,
          tecnologia, setTecnologia,
          senioridade, setSenioridade,
          areas, cidades, tecnologias, senioridades
        }}
      />

      <QuickNav sections={sections} />

      <main className="container py-6 flex-1 space-y-6">
        {ORDER.map(key => {
          const list = groups[key] || []
          if (!list.length) return null
          return (
            <section key={key}>
              <SectionHeading id={key.toLowerCase()} title={key} count={`${list.length} perfil(is)`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 md:mt-6">
                {list.map(p => (
                  <ProfileCard key={p.id} p={p} onOpen={setSelected} recs={recs} />
                ))}
              </div>
            </section>
          )
        })}
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="container py-6 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Futuro do Trabalho — Projeto Acadêmico</p>
          <p><strong>SPA</strong> • React + Tailwind • JSON local • Dark Mode • Busca & Filtros • Modais • Grupos por senioridade</p>
        </div>
      </footer>

      <ProfileModal profile={selected} onClose={()=>setSelected(null)} onRecommend={onRecommend} />
    </div>
  )
}