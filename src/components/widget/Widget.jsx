import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

import './widget.css'

const Widget = ({ type, userData }) => {
  const [subTotal, setSubTotal] = useState(null)
  let data

  switch (type) {
    case 'user':
      data = {
        title: 'Usuarios',
        subtitle: 'Ver todos los usuarios',
        link: '/users',
        query: 'users',
      }
      break
    case 'translations':
      data = {
        title: 'Traducciones',
        subtitle: 'Ver traducciones',
        link: '/files/0',
        filter: 0,
        query: 'files',
      }
      break
    case 'interpretations':
      data = {
        title: 'Interpretaciones',
        subtitle: 'Ver interpretaciones',
        link: '/files/1',
        filter: 1,
        query: 'files',
      }
      break
    case 'ratifications':
      data = {
        title: 'Ratificaciones',
        subtitle: 'Ver ratificaciones',
        link: '/files/2',
        filter: 2,
        query: 'files',
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

      if (userData?.uid && userData?.userType === 'Usuario') {
        queryRef = query(queryRef, where('userUID', '==', userData.uid))
      }

      const querySnapshot = await getDocs(queryRef)

      setSubTotal(querySnapshot.docs.length)
    }
    fetchData()
  }, [data.query, data.filter, data])

  return (
    <div className="container">
      <div className="card">
        <span className="title">{data.title}</span>
        <span className="subtotal">{subTotal}</span>
        <Link to={data.link} style={{ textDecoration: 'none' }}>
          <span className="link">{data.subtitle}</span>
        </Link>
      </div>
    </div>
  )
}

export default Widget
