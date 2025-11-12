export default function ProfileCard({ p, onOpen, recs }) {
  return (
    <button
      onClick={() => onOpen(p)}
      className="group text-left rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-soft hover:shadow-xl transition-all overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={p.foto}
              alt={p.nome}
              className="size-14 rounded-full object-cover ring-4 ring-white dark:ring-gray-900"
            />
            <div>
              <h3 className="font-semibold leading-tight">{p.nome}</h3>
              <p className="text-xs text-gray-500">{p.localizacao} • {p.area}</p>
            </div>
          </div>
          <span className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full px-2 py-0.5">
            {p.senioridade}
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          {p.cargo} — {p.resumo}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {(p.habilidadesTecnicas || []).slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-2 py-0.5 text-[11px]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {(p.experiencias?.[0]?.inicio) ?? ''} — {(p.experiencias?.[0]?.fim) ?? ''}
          </span>
          <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-0.5 transition">
            Ver perfil →
          </span>
        </div>

        {(recs[p.id] ?? 0) > 0 && (
          <div className="mt-2 text-[11px] inline-block bg-emerald-600 text-white rounded-full px-2 py-0.5">
            {recs[p.id]} 👍
          </div>
        )}
      </div>
    </button>
  )
}
