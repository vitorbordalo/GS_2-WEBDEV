import { useEffect, useState } from 'react'

export default function ProfileModal({ profile, onClose, onRecommend }) {
  const [tab, setTab] = useState('sobre')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!profile) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="absolute inset-x-0 top-8 mx-auto w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={profile.foto} alt={profile.nome} className="size-14 rounded-full ring-4 ring-white dark:ring-gray-900 object-cover" />
            <div>
              <h3 className="font-semibold text-xl">{profile.nome}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {profile.cargo} • {profile.localizacao}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] rounded-full px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              {profile.senioridade}
            </span>
            <button
              onClick={onClose}
              className="rounded-full px-3 py-1 text-sm border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="px-5 pt-3 flex items-center gap-2">
          {['sobre','experiencias','formacao','projetos','idiomas'].map(k => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-3 py-1 rounded-full text-sm border ${
                tab === k
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
          <div className="ml-auto">
            <button
              onClick={() => onRecommend(profile)}
              className="rounded-full px-3 py-1 text-sm bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Recomendar
            </button>
            <a
              href={`mailto:${(profile.email||'contato@example.com')}?subject=Contato%20via%20Futuro%20do%20Trabalho&body=Olá%20${encodeURIComponent(profile.nome)}%2C%20vi%20seu%20perfil...`}
              className="ml-2 rounded-full px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              Enviar e-mail
            </a>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {tab === 'sobre' && (
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">{profile.resumo}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <h4 className="font-medium mb-2">Soft skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(profile.softSkills||[]).map((s, i) => (
                      <span key={i} className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-2 py-0.5 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Hard skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(profile.habilidadesTecnicas||[]).map((s, i) => (
                      <span key={i} className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-2 py-0.5 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Interesses</h4>
                  <div className="flex flex-wrap gap-2">
                    {(profile.areaInteresses||[]).map((s, i) => (
                      <span key={i} className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-2 py-0.5 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'experiencias' && (
            <div className="space-y-3">
              {(profile.experiencias||[]).map((e, i) => (
                <div key={i} className="p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{e.empresa} • {e.cargo}</div>
                    <div className="text-xs text-gray-500">{e.inicio} — {e.fim}</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{e.descricao}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'formacao' && (
            <div className="space-y-3">
              {(profile.formacao||[]).map((f, i) => (
                <div key={i} className="p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="font-medium">{f.curso} — {f.instituicao}</div>
                  <div className="text-xs text-gray-500">{f.ano}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'projetos' && (
            <div className="space-y-3">
              {(profile.projetos||[]).map((f, i) => (
                <div key={i} className="p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="font-medium">{f.titulo}</div>
                  <div className="text-xs text-gray-500">
                    <a className="underline" href={f.link} target="_blank" rel="noreferrer">{f.link}</a>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{f.descricao}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'idiomas' && (
            <div className="flex flex-wrap gap-2">
              {(profile.idiomas||[]).map((f, i) => (
                <span key={i} className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-2 py-0.5 text-xs">
                  {f.idioma} — {f.nivel}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
