import './navbar.css'

const Navbar = ({ userData }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            USUARIO CONECTADO: {userData?.displayName} ({userData?.county})
          </div>
          <div className="item">
            Servicios de Interpretación y Traducción OOJJ Málaga
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
