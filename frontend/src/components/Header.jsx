import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
    <div className='logo'>
        <h1><Link to='/'>DriverLog</Link></h1>
    </div>
    <nav>
        <ul>
            <li>
                <NavLink to='/login' className='active'>
                    <FaSignInAlt /> Login
                </NavLink>
            </li>
            <li>
                <NavLink to='/register' className='active'>
                    <FaUser /> Register
                </NavLink>
            </li>
        </ul>
    </nav>
    </header>
  )
}

export default Header