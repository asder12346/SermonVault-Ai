import { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import PreacherCard from '../components/PreacherCard.jsx'
import { PREACHERS } from '../data/preachers.js'

export default function Dashboard() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PREACHERS

    return PREACHERS.filter((p) => {
      const haystack = `${p.name} ${p.bio}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  return (
    <div className="app-shell">
      <Header />

      <main className="page">
        <div className="page__header">
          <h1 className="page__title">Explore AI Preachers</h1>
          <p className="page__subtitle">
            Ask questions grounded in verified sermon teachings.
          </p>
        </div>

        <div className="page__controls">
          <input
            className="search"
            type="search"
            placeholder="Search preachers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <section className="grid">
          {filtered.map((preacher) => (
            <PreacherCard key={preacher.id} preacher={preacher} />
          ))}
        </section>
      </main>
    </div>
  )
}
