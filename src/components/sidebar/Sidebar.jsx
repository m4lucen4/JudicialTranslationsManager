import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext'
import { useContext } from 'react'

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext)
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src="/logo.jpg" alt="Logo" className="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">PRINCIPAL</p>
          <li>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <DashboardIcon className="icon" />
              <span>Inicio</span>
            </Link>
          </li>
          <p className="title">RECURSOS</p>
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>
          <li>
            <InsertChartIcon className="icon" />
            <span>Estadísticas</span>
          </li>
          <p className="title">EXPEDIENTES</p>
          <Link to="/files/0" style={{ textDecoration: 'none' }}>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>Traducción</span>
            </li>
          </Link>
          <Link to="/files/1" style={{ textDecoration: 'none' }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Interpretación</span>
            </li>
          </Link>
          <Link to="/files/2" style={{ textDecoration: 'none' }}>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Ratificación</span>
            </li>
          </Link>
          <p className="title">USUARIO</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Perfil</span>
          </li>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Salir</span>
            </li>
          </Link>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  )
}

export default Sidebar
