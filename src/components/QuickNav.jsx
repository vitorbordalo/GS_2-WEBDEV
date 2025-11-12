export default function QuickNav({ sections }){
  return (
    <div className="container mt-4">
      <div className="flex flex-wrap gap-2">
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`} className="rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1 text-sm hover:shadow-soft">
            {s.title}
          </a>
        ))}
      </div>
    </div>
  )
}
