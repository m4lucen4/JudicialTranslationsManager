import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { languages } from '../data/languages'

import { format } from 'date-fns'

const stateMap = {
  0: 'Pendiente',
  1: 'En curso',
  2: 'Pendiente de facturar',
  3: 'Suspendido',
  4: 'Facturado',
}

const typeMap = {
  0: 'Traducción',
  1: 'Interpretación',
  2: 'Ratificación',
}

const useGetFiles = (filter) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getLanguageLabel = (value) => {
    const language = languages.find((language) => language.value === value)
    return language ? language.label : value
  }

  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(
      collection(db, 'files'),
      (snapShot) => {
        let list = snapShot.docs.map((doc) => {
          const data = doc.data()
          console.log('Los datos son: ', data)
          const createdAtFormatted = data.createdAt
            ? format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm')
            : 'Fecha no disponible'
          return {
            ...data,
            id: doc.id,
            state: stateMap[data.state] || data.state,
            type: typeMap[data.type] || data.type,
            originlanguage: getLanguageLabel(data.originlanguage),
            destinylanguage: getLanguageLabel(data.destinylanguage),
            createdAt: createdAtFormatted,
          }
        })
        if (filter) {
          const filterValue = typeMap[filter]
          const filteredList = list.filter((item) => item.type === filterValue)
          setData(filteredList)
        } else {
          setData(list)
        }
        setLoading(false)
      },
      (error) => {
        console.error(error)
        setError(error)
        setLoading(false)
      }
    )

    return () => {
      unsub()
    }
  }, [filter])

  return { data, loading, error }
}

export default useGetFiles
