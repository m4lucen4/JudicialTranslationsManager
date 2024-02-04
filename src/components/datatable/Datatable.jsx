import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { userColumns } from '../../datatablesource'
import ModalForm from '../../pages/newFile/components/modalForm'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'
import { db, auth } from '../../firebase'

const Datatable = () => {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users'),
      (snapShot) => {
        let list = []
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setData(list)
      },
      (error) => {
        console.log(error)
      }
    )

    return () => {
      unsub()
    }
  }, [])

  const handleRecoveryPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      setIsModalOpen(true)
    } catch (err) {
      console.error('Error al enviar el correo de recuperación: ', err)
    }
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/new/${params.row.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">Editar</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleRecoveryPassword(params.row.email)}
            >
              Enviar nueva contraseña
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Usuarios
        <Link to="/users/new" className="link">
          Añadir
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <ModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Correo de recuperación enviado"
      />
    </div>
  )
}

export default Datatable
