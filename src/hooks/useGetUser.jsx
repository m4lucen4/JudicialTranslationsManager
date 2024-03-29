import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const useGetUser = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid)
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserData({
                ...docSnap.data(),
                uid: user.uid,
              })
            } else {
              console.log('No se encontraron datos adicionales del usuario')
              setUserData(null)
            }
          })
          .catch((error) => {
            console.error('Error al obtener los datos del usuario:', error)
            setError(error)
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        console.log('Usuario no autenticado')
        navigate('/login')
        setUserData(null)
        setLoading(false)
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { userData, loading, error }
}

export default useGetUser
