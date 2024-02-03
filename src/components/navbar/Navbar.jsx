import './navbar.scss'

import useGetUser from '../../hooks/useGetUser'

const Navbar = () => {
  const { userData } = useGetUser()
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">USUARIO CONECTADO: {userData?.displayName}</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
