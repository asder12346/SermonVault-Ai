import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { PREACHERS } from '../data/preachers.js'

export default function Preacher() {
  const { slug } = useParams()

  const preacher = useMemo(
    () => PREACHERS.find((p) => p.slug === slug),
    [slug],
  )

  useEffect(() => {
    if (!preacher?.externalUrl) return
    window.location.replace(preacher.externalUrl)
  }, [preacher])

  if (!preacher) {
    return (
      <div className="app-shell">
        <Header />
        <main className="page">
          <div className="stack">
            <h1 className="page__title">Preacher not found</h1>
            <p className="page__subtitle">
              The preacher you selected doesn’t exist yet.
            </p>
            <Link className="link" to="/dashboard">
              Back to dashboard
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="page">
        <div className="stack">
          <div>
            <h1 className="page__title">{preacher.name}</h1>
            <p className="page__subtitle">{preacher.bio}</p>
          </div>

          <div className="panel">
            <div className="panel__title">Opening {preacher.name}…</div>
            <div className="panel__text">
              Redirecting you to their personal AI.
            </div>
          </div>

          <Link className="link" to="/dashboard">
            ← Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
