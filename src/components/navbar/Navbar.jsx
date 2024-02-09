import './navbar.css'

const Navbar = ({ userDisplay }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">USUARIO CONECTADO: {userDisplay}</div>
          <div className="item">
            Servicios de Interpretación y Traducción OOJJ Málaga
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
