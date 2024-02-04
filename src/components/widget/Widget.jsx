import './widget.scss'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null)
  let data

  switch (type) {
    case 'user':
      data = {
        title: 'Usuarios',
        isMoney: false,
        subtitle: 'Ver todos los usuarios',
        link: '/users',
        query: 'users',
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      }
      break
    case 'translations':
      data = {
        title: 'Traducciones',
        isMoney: false,
        subtitle: 'Ver traducciones',
        link: '/files/0',
        filter: 0,
        query: 'files',
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      }
      break
    case 'interpretations':
      data = {
        title: 'Interpretaciones',
        isMoney: false,
        subtitle: 'Ver interpretaciones',
        link: '/files/1',
        filter: 1,
        query: 'files',
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      }
      break
    case 'ratifications':
      data = {
        title: 'Ratificaciones',
        isMoney: false,
        subtitle: 'Ver ratificaciones',
        link: '/files/2',
        filter: 2,
        query: 'files',
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      }
      break
    default:
      break
  }

  useEffect(() => {
    const fetchData = async () => {
      let queryRef = collection(db, data.query)

      if (data.hasOwnProperty('filter')) {
        queryRef = query(queryRef, where('type', '==', data.filter.toString()))
      }

      const querySnapshot = await getDocs(queryRef)

      setAmount(querySnapshot.docs.length)
    }
    fetchData()
  }, [data.query, data.filter, data])

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{amount}</span>
        <Link to={data.link} style={{ textDecoration: 'none' }}>
          <span className="link">{data.subtitle}</span>
        </Link>
      </div>
    </div>
  )
}

export default Widget
