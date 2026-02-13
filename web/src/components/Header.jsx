import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__left">
          <NavLink className="app-brand" to="/dashboard">
            SermonVault AI
          </NavLink>
        </div>

        <nav className="app-nav">
          <NavLink className="app-nav__link" to="/dashboard">
            Archive
          </NavLink>
          <NavLink className="app-nav__link" to="/admin">
            Admin
          </NavLink>
          <NavLink className="app-nav__link" to="/profile">
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
