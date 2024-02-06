import './navbar.scss'

const Navbar = ({ userDisplay }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">USUARIO CONECTADO: {userDisplay}</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
