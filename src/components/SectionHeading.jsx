export default function SectionHeading({ id, title, count }){
  return (
    <div id={id} className="-mx-2 relative h-12">
      <div className="sticky top-16 z-30 px-2">
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-soft px-4 py-2 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <span className="text-xs text-gray-500">{count}</span>
        </div>
      </div>
    </div>
  )
}
