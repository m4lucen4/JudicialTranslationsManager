import { DataGrid } from '@mui/x-data-grid'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import {
  filesColumns,
  filesTranslateColumns,
  filesRatificationColumns,
  filesInterpretationColumns,
} from '../../../datatablesource'
import { Link, useParams } from 'react-router-dom'
import useGetFiles from '../../../hooks/useGetFiles'
import { useState } from 'react'

import './filetable.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

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
  const [selectedFileData, setSelectedFileData] = useState(null)
  const { data, loading, error } = useGetFiles(filter)
  const [open, setOpen] = useState(false)
  const handleOpen = (fileData) => {
    setSelectedFileData(fileData)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => handleOpen(params.row)}
              className="viewButton"
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              Ver detalles
            </div>
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
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
        rows={filteredData}
        columns={currentColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedFileData ? (
            <>
              <h2 id="modal-modal-title">
                Detalles del Expediente - {selectedFileData.type}
              </h2>
              <hr />
              <br />
              <p>Nombre: {selectedFileData.oojjName}</p>
              <p>Fecha de registro: {selectedFileData.createdAt}</p>
              <p>Estado: {selectedFileData.state}</p>
              <p>
                Descripción: {selectedFileData.description} -{' '}
                {selectedFileData.number}
              </p>
              <p>Traductor/Interprete: {selectedFileData.worker}</p>
              {selectedFileData.type === 'Traducción' && (
                <>
                  <p>Idioma documento: {selectedFileData.originlanguage}</p>
                  <p>Fecha de entrega: {selectedFileData.deliveryDate}</p>
                  <p>Número de páginas: {selectedFileData.totalPages}</p>
                </>
              )}
              <p>Idioma: {selectedFileData.destinylanguage}</p>
            </>
          ) : (
            <p>Cargando datos...</p>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default FileTable
