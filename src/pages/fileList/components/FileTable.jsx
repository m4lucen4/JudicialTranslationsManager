import { DataGrid } from '@mui/x-data-grid'
import {
  filesColumns,
  filesTranslateColumns,
  filesRatificationColumns,
  filesInterpretationColumns,
} from '../../../datatablesource'
import { Link, useParams } from 'react-router-dom'
import useGetFiles from '../../../hooks/useGetFiles'

import './filetable.scss'

const typeMap = {
  0: 'Traducción',
  1: 'Interpretación',
  2: 'Ratificación',
}

const columnsMap = {
  undefined: filesColumns,
  0: filesTranslateColumns,
  1: filesInterpretationColumns,
  2: filesRatificationColumns,
}

const FileTable = ({ userData }) => {
  const { filter } = useParams()
  const { data, loading, error } = useGetFiles(filter)

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
              <div className="viewButton">Ver detalles</div>
            </Link>
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

  const currentColumns = columnsMap[filter]
    ? columnsMap[filter].concat(actionColumn)
    : filesColumns.concat(actionColumn)

  const titleSuffix = filter !== undefined ? ` - ${typeMap[filter]}` : ''
  const title = `Expedientes${titleSuffix}`

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  const filteredData =
    userData?.userType === 'Usuario'
      ? data.filter((file) => file.userUID === userData.uid)
      : data

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {userData?.userType === 'Usuario' && (
          <Link to="/files/newFile" className="link">
            Añadir
          </Link>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={currentColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default FileTable
