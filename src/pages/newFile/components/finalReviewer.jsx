import React from 'react'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'

import '../newFile.scss'

const FinalReviewerForm = ({
  data,
  userData,
  setData,
  setFinalTranslationFile,
  setReceiptFile,
}) => {
  const handleInput = (e) => {
    const { id, value } = e.target
    setData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleFinalTranslationFileChange = (e) => {
    setFinalTranslationFile(e.target.files[0])
  }

  const handleReceiptFileChange = (e) => {
    setReceiptFile(e.target.files[0])
  }

  const isDisabled = userData?.userType === 'Usuario'

  return (
    <>
      <h1>Información Revisión</h1>
      <div className="formInput">
        <label htmlFor="finalReviewer">Revisor</label>
        <input
          id="finalReviewer"
          type="text"
          value={data.finalReviewer || ''}
          onChange={handleInput}
          disabled={isDisabled}
        />
      </div>
      <div className="formInput">
        <label htmlFor="reviewerDate">Fecha revisión</label>
        <input
          id="reviewerDate"
          type="date"
          value={data.reviewerDate || ''}
          onChange={handleInput}
          disabled={isDisabled}
        />
      </div>
      <div className="formInput">
        <label htmlFor="finalDate">Fecha de entrega</label>
        <input
          id="finalDate"
          type="date"
          value={data.finalDate || ''}
          onChange={handleInput}
          disabled={isDisabled}
        />
      </div>
      <div className="formInput">
        <label htmlFor="finalTranslationFile">
          Traducción final: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="finalTranslationFile"
          onChange={handleFinalTranslationFileChange}
          style={{ display: 'none' }}
          disabled={isDisabled}
        />
        {data.finalTranslationFileURL && (
          <div className="left">
            <a
              href={data.finalTranslationFileURL}
              target="_blank"
              download="Traducción final"
              rel="noreferrer"
            >
              Descargar traducción final
            </a>
          </div>
        )}
      </div>
      <div className="formInput">
        <label htmlFor="receiptFile">
          Acuse de recibo: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="receiptFile"
          onChange={handleReceiptFileChange}
          style={{ display: 'none' }}
        />
        {data.receiptFileURL && (
          <div className="left">
            <a
              href={data.receiptFileURL}
              target="_blank"
              download="Acuse de recibo"
              rel="noreferrer"
            >
              Descargar acuse de recibo
            </a>
          </div>
        )}
      </div>
      <div className="formInput">
        <label htmlFor="totalPages">Número de páginas</label>
        <input
          id="totalPages"
          type="number"
          value={data.totalPages || ''}
          onChange={handleInput}
          disabled={isDisabled}
        />
      </div>
    </>
  )
}

export default FinalReviewerForm
