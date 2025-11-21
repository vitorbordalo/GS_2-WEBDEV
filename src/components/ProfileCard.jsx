// src/components/ProfileCard.jsx

// Card de perfil usado na listagem principal
export default function ProfileCard({ p, onOpen, recs }) {
  // 1) Descobrir se é mulher ou homem
  const generoRaw = (p.genero || "").toLowerCase();

  let isFemale = false;

  if (generoRaw) {
    // se o JSON tiver "F", "Feminino" etc.
    isFemale = generoRaw.startsWith("f");
  } else {
    // se não tiver genero, inferir pelo primeiro nome
    const firstName = (p.nome || "").split(" ")[0].toLowerCase();

    const commonFemaleNames = [
      "ana",
      "maria",
      "juliana",
      "camila",
      "talita",
      "ingrid",
      "yasmin",
      "yasmim",
      "beatriz",
      "larissa",
      "fernanda",
      "amanda",
      "patricia",
      "carla",
      "bruna",
      "aline",
      "luana",
      "carolina",
      "caroline",
      "andressa",
      "bianca",
    ];

    if (
      commonFemaleNames.includes(firstName) ||
      firstName.endsWith("a") ||
      firstName.endsWith("e")
    ) {
      isFemale = true;
    }
  }

  const folder = isFemale ? "women" : "men";

  // 2) Gera um número pseudo-aleatório estável baseado no nome
  const base = [...(p.nome || "")].reduce(
    (acc, ch) => acc + ch.charCodeAt(0),
    0
  );
  // faixa 20–79 (adultos)
  const num = 20 + (base % 60);

  const avatarUrl = `https://randomuser.me/api/portraits/${folder}/${num}.jpg`;

  return (
    <button
      onClick={() => onOpen(p)}
      className="group text-left rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-soft hover:shadow-xl transition-all overflow-hidden"
    >
      {/* micro-capa discreta */}
      <div className="h-16 w-full bg-gradient-to-r from-indigo-500 to-blue-600 opacity-20" />

      <div className="p-4 -mt-8">
        {/* header com avatar redondo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={p.nome}
              className="size-14 rounded-full object-cover ring-4 ring-white dark:ring-gray-900"
            />
            <div>
              <h3 className="font-semibold leading-tight">{p.nome}</h3>
              <p className="text-xs text-gray-500">
                {p.localizacao} • {p.area}
              </p>
            </div>
          </div>

          <span className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full px-2 py-0.5">
            {p.senioridade}
          </span>
        </div>

        {/* resumo */}
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          {p.cargo} — {p.resumo}
        </p>

        {/* skills técnicas */}
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

        {/* período + link ver perfil */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {p.experiencias?.[0]?.inicio ?? ""} —{" "}
            {p.experiencias?.[0]?.fim ?? ""}
          </span>
          <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-0.5 transition">
            Ver perfil →
          </span>
        </div>

        {/* selo de recomendações */}
        {(recs?.[p.id] ?? 0) > 0 && (
          <div className="mt-2 text-[11px] inline-block bg-emerald-600 text-white rounded-full px-2 py-0.5">
            {recs[p.id]} 👍
          </div>
        )}
      </div>
    </button>
  );
}