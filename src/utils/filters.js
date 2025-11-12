export function normalize(str='') {
  return str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}
export function matchSearch(p, q) {
  const s = normalize(q)
  if (!s) return true
  const fields = [p.nome, p.cargo, p.resumo, p.localizacao, p.senioridade].map(normalize).join(' ')
  return fields.includes(s)
}
export function matchFilters(p, { area, cidade, tecnologia, senioridade }) {
  if (area && area !== 'Todas' && p.area !== area) return false
  if (cidade && cidade !== 'Todas' && !p.localizacao.startsWith(cidade)) return false
  if (tecnologia && tecnologia !== 'Todas' && !(p.habilidadesTecnicas || []).includes(tecnologia)) return false
  if (senioridade && senioridade !== 'Todas' && p.senioridade !== senioridade) return false
  return true
}
