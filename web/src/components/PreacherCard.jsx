import { Link } from 'react-router-dom'

function getInitials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export default function PreacherCard({ preacher }) {
  const href = `/preacher/${preacher.slug}`

  return (
    <Link className="preacher-card" to={href}>
      <div className="preacher-card__top">
        <div className="preacher-avatar">
          {preacher.image ? (
            <img
              className="preacher-avatar__img"
              src={preacher.image}
              alt={preacher.name}
            />
          ) : (
            <div className="preacher-avatar__initials">{getInitials(preacher.name)}</div>
          )}
        </div>
      </div>

      <div className="preacher-card__body">
        <h3 className="preacher-card__name">{preacher.name}</h3>
        <p className="preacher-card__bio">{preacher.bio}</p>
      </div>

      <div className="preacher-card__footer">
        <span className="preacher-card__cta">Ask AI</span>
        <span className="preacher-card__arrow">→</span>
      </div>
    </Link>
  )
}
