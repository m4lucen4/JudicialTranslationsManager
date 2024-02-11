import React from 'react'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'

const InterpreterForm = ({ data, setData, setCertFile, userData }) => {
  const handleInput = (e) => {
    const { id, value } = e.target
    setData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleCertFileChange = (e) => {
    setCertFile(e.target.files[0])
  }

  const isDisabled = userData?.userType === 'Usuario'

  return (
    <>
      <h1>Información Intérprete</h1>
      <div className="formInput">
        <label htmlFor="worker">Intérprete</label>
        <input
          id="worker"
          type="text"
          value={data.worker || ''}
          onChange={handleInput}
          disabled={isDisabled}
        />
      </div>
      <div className="formInput">
        <label htmlFor="rate">Tarifa</label>
        <input
          id="rate"
          type="number"
          value={data.rate || ''}
          onChange={handleInput}
          disabled={isDisabled}
        />
      </div>
      <div className="formInput">
        <label htmlFor="time">Tiempo (en horas)</label>
        <input
          id="time"
          type="number"
          value={data.time || ''}
          onChange={handleInput}
          disabled={isDisabled}
        />
      </div>
      <div className="formInput">
        <label htmlFor="certificate">
          Certificado: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="certificate"
          onChange={handleCertFileChange}
          style={{ display: 'none' }}
          disabled={isDisabled}
        />
        {data.certURL && (
          <div className="left">
            <a
              href={data.certURL}
              target="_blank"
              download="Certificado"
              rel="noreferrer"
            >
              Descargar certificado
            </a>
          </div>
        )}
      </div>
    </>
  )
}

export default InterpreterForm
