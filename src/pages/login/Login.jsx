import { useContext, useState } from 'react'
import './login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        dispatch({ type: 'LOGIN', payload: user })
        navigate('/')
      })
      .catch((error) => {
        setError(true)
      })
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <p className="title">Servicio de Interpretación y Traducción</p>
        <img src="/logo.jpg" alt="Logo" className="logo" />
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          {error && <span>Error en el email o contraseña</span>}
        </form>
      </div>
    </div>
  )
}

export default Login
