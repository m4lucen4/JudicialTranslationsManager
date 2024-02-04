import './filetable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { filesColumns } from '../../../datatablesource'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'

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

const FileTable = () => {
  const [data, setData] = useState([])
  const { filter } = useParams()

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'files'),
      (snapShot) => {
        let list = snapShot.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id,
            state: stateMap[data.state] || data.state,
            type: typeMap[data.type] || data.type,
          }
        })
        if (filter) {
          const filterValue = typeMap[filter]
          const filteredList = list.filter((item) => item.type === filterValue)
          setData(filteredList)
        } else {
          setData(list)
        }
      },
      (error) => {
        console.log(error)
      }
    )

    return () => {
      unsub()
    }
  }, [filter])

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/files/newFile/${params.row.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">Editar</div>
            </Link>
          </div>
        )
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Expedientes
        <Link to="/files/newFile" className="link">
          Añadir
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={filesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default FileTable
